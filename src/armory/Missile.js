export default function Missile(context) {
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

    const SPEED_FACTOR = 0.08 * 60 / 1000;

    const mainLoop = (solver, collisionDetector) => (dt, gt, timer) => {
        const { x, y } = solver.solve(gt * SPEED_FACTOR);

        renderer.clear();

        if (collisionDetector.withBoundary(x)) {
            timer.reset();
            firingEnd();
            return;
        }

        if (collisionDetector.withTerrain(x, y)) {
            timer.reset();
            onTerrainCollision(x, y);
            return;
        }

        const players = collisionDetector.withPlayer(x, y);

        if (players.length) {
            timer.reset();
            onPlayerCollision(players, x, y);
            return;
        }

        renderer.renderMissile(x, y);
    };

    const onTerrainCollision = (x, y) => {
        console.warn("TERRAIN COLLISION", x, y);
        groundExploded(x);

        const effects = [];
        effects.push(explosion(x, getTerrain().at(x)));

        const range = 40;
        const damage = 34;
        getPlayersInRange(x, y, range).forEach(player => {
            assignDamage({ player, damage });

            if (!player.canTake(damage)) {
                effects.push(burn(player));
            }
        });

        Promise.all(effects).then(() => firingEnd());
    };

    const onPlayerCollision = players => {
        console.warn("PLAYER COLLISION", players);

        const effects = [];
        players.forEach(player => {
            assignDamage({ player, damage: 100 });
            effects.push(burn(player));
        });

        Promise.all(effects).then(() => firingEnd());
    };

    return {
        name: "Missile",
        icon: "missile.png",

        fire({ x0, y0, v, angle }) {
            const solver = createProjectileSolver({ x0, y0, v, angle });
            const collisionDetector = createCollisionDetector();

            firingStart();
            createTimer().immediate(mainLoop(solver, collisionDetector));
        }
    };
}
