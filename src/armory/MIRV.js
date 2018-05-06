export default function MIRV(context) {
    const {
        createTimer,
        getTerrain,
        getPlayersInRange,
        renderer,
        createProjectileSolver,
        createCollisionDetector,
        explosion,
        burn,
        firingStart,
        firingEnd,
        assignDamage,
        groundExploded
    } = context;

    const FLYING_SPEED = 0.08 * 60 / 1000;
    const SEPARATION_FACTOR = 0.08;

    const mainLoop = (solver, collisionDetector) => {
        const ascentPhase = ascentPhaseLoop(collisionDetector);
        const separationPhase = separationPhaseLoop(collisionDetector);

        let _y = 0;

        return (dt, gt, timer) => {
            const { x, y } = solver.solve(gt * FLYING_SPEED);

            if (y < _y) {
                separationPhase(x, y, dt, timer)
            } else {
                ascentPhase(x, y, timer);
            }

            _y = y;
        };
    };

    const ascentPhaseLoop = (collisionDetector) => (x, y, timer) => {
        renderer.clear();

        if (collisionDetector.withBoundary(x)) {
            timer.reset();
            firingEnd();
            return;
        }

        if (collisionDetector.withTerrain(x, y)) {
            timer.reset();
            onTerrainCollision(x, y).then(() => firingEnd());
            return;
        }

        const players = collisionDetector.withPlayer(x, y);

        if (players.length) {
            timer.reset();
            onPlayerCollision(players, x, y).then(() => firingEnd());
            return;
        }

        renderer.renderMissile(x, y);
    };

    const separationPhaseLoop = (collisionDetector, warheadsCount = 3) => {
        const warheads = new Array(warheadsCount)
            .fill(null)
            .map(() => ({ active: true, exploded: false }));

        let separationFactor = 0;

        return (x, y, dt, timer) => {
            separationFactor += dt * SEPARATION_FACTOR;

            renderer.clear();

            warheads.forEach((w, i) => {
                let wx = x + (i - ~~(warheadsCount / 2)) * separationFactor;

                if (!w.active) {
                    return;
                }

                if (collisionDetector.withBoundary(wx)) {
                    w.active = false;
                    w.exploded = true;
                    return;
                }

                if (collisionDetector.withTerrain(wx, y)) {
                    w.active = false;
                    onTerrainCollision(wx, y).then(() => w.exploded = true);
                    return;
                }

                const players = collisionDetector.withPlayer(wx, y);

                if (players.length) {
                    w.active = false;
                    onPlayerCollision(players, wx, y).then(() => w.exploded = true);
                    return;
                }

                renderer.renderMissile(wx, y);
            });

            if (warheads.every(w => w.exploded)) {
                timer.reset();
                firingEnd();
            }
        };
    };

    const onTerrainCollision = (x, y) => {
        groundExploded(x);

        const effects = [];
        effects.push(explosion(x, getTerrain().at(x)));

        const range = 30;
        const damage = 30;
        getPlayersInRange(x, y, range).forEach(player => {
            assignDamage({ player, damage });

            if (!player.canTake(damage)) {
                effects.push(burn(player));
            }
        });

        return Promise.all(effects);
    };

    const onPlayerCollision = players => {
        const effects = [];
        players.forEach(player => {
            assignDamage({ player, damage: 100 });
            effects.push(burn(player));
        });

        return Promise.all(effects);
    };

    return {
        name: "MIRV",
        icon: "mirv.png",

        fire({ x0, y0, v, angle }) {
            const solver = createProjectileSolver({ x0, y0, v, angle });
            const collisionDetector = createCollisionDetector();

            firingStart();
            createTimer().immediate(mainLoop(solver, collisionDetector));
        }
    };
}
