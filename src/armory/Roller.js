export default function Roller(context) {
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
    const ROLLING_SPEED = 0.9 * 60 / 1000;

    const checkCommonCollisions = (collisionDetector, x, y) => {
        if (collisionDetector.withBoundary(x)) {
            firingEnd();
            return true;
        }

        const players = collisionDetector.withPlayer(x, y);

        if (players.length) {
            onPlayerCollision(players, x, y);
            return true;
        }

        return false;
    };

    const onPlayerCollision = players => {
        const effects = [];
        players.forEach(player => {
            assignDamage({ player, damage: 100 });
            effects.push(burn(player));
        });

        Promise.all(effects).then(() => firingEnd());
    };

    const flyingLoop = (solver, collisionDetector) => (dt, gt, timer) => {
        const { x, y } = solver.solve(gt * FLYING_SPEED);

        renderer.clear();

        if (checkCommonCollisions(collisionDetector, x, y)) {
            timer.reset();
            return;
        }

        if (collisionDetector.withTerrain(x, y)) {
            timer.reset();
            startRolling(x, getTerrain().at(x));
            return;
        }

        renderer.renderMissile(x, y);
    };

    const rollingLoop = (dx, x0, collisionDetector) => (dt, gt, timer) => {
        const terrain = getTerrain();
        const x = x0 + dx * gt * ROLLING_SPEED;
        const y = terrain.at(x);
        const y1 = terrain.at(x + dx);

        renderer.clear();

        if (checkCommonCollisions(collisionDetector, x, y)) {
            timer.reset();
            return;
        }

        if (~~y1 > ~~y) {
            timer.reset();
            groundExploded(x);

            const range = 10;
            const damage = 30;
            const effects = [];
            effects.push(explosion(x, getTerrain().at(x)));
            getPlayersInRange(x, y, range).forEach(player => {
                assignDamage({ player, damage });

                if (!player.canTake(damage)) {
                    effects.push(burn(player));
                }
            });
            Promise.all(effects).then(() => firingEnd());

            return;
        }

        renderer.renderMissile(x, terrain.at(x) + 2, 2);
    };

    const startRolling = (x, y) => {
        const dx = getTerrain().getRollDirection(x);
        createTimer().immediate(rollingLoop(dx, x, createCollisionDetector()));
    };

    return {
        name: "Roller",
        icon: "roller.png",

        fire({ x0, y0, v, angle }) {
            const solver = createProjectileSolver({ x0, y0, v, angle });
            const collisionDetector = createCollisionDetector();

            firingStart();
            createTimer().immediate(flyingLoop(solver, collisionDetector));
        }
    };
}
