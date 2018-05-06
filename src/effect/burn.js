export default function createBurnEffect(context) {
    const {
        createParticlesEmitter,
        scheduleParticlesEmission,
        particlesRenderer,
        radialGenerator
    } = context;

    return ({ x, y }) => new Promise(resolve => {
        const gen = radialGenerator({ angle: 90, radius: 30, spread: 40, emissionDuration: 10, shutdownDuration: 1 });
        const pe = createParticlesEmitter(gen);
        pe.progress.subscribe(p => {
            if (p.opacity <= 0) {
                p.active = false;
            }

            particlesRenderer.fire(p, { size: 3 });
        });
        pe.done.subscribe(resolve);

        pe.emit(x - 2, y - 20, 0);
        scheduleParticlesEmission(pe);
    });
}