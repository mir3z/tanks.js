export default function createExplosionEffect(context) {
    const {
        getTerrain,
        createParticlesEmitter,
        scheduleParticlesEmission,
        particlesRenderer,
        radialGenerator
    } = context;

    return (x, y) => new Promise(resolve => {
        let slope = getTerrain().getSlope(x);
        slope = slope > 90 ? 90 - slope : 90 + slope;

        const gen = radialGenerator({ angle: slope, emissionDuration: 0.5, shutdownDuration: 6, spread: 180 });
        const pe = createParticlesEmitter(gen);

        pe.progress.subscribe(p => {
            if (p.y < getTerrain().at(p.x) || p.opacity <= 0) {
                p.active = false;
            }

            if (!getTerrain().isWithin(p.x)) {
                p.active = false;
            }

            particlesRenderer.render(p, { size: 1.6 });
        });

        pe.done.subscribe(resolve);

        pe.emit(x, y, 0);
        scheduleParticlesEmission(pe);
    });
}