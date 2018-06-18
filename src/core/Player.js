export default function Player({ name, x, y, armory, tank, score = 0, dead = false } = {}) {
    const props = { name, x, y, dead, armory, tank, score };
    const distanceFromPlayer = (sx, sy) => distance({ x, y }, { x: sx, y: sy });

    const update = (nextProps) => Player({ ...props, ...nextProps });

    return {
        ...props,

        update,

        changePower(by) {
            return update({ tank: tank.update({ power: tank.power + by }) });
        },

        fire() {
            armory.weapon().fire({ x0: x, y0: y + 10, v: tank.power / POWER_REDUCTION_FACTOR, angle: tank.angle });
        },

        nextWeapon() {
            return update({ armory: armory.next() });
        },

        rotateTurret(by) {
            return update({ tank: tank.update({ angle: tank.angle + by }) });
        },

        rotateLeft() {
            return update({ tank: tank.update({ angle: tank.angle + 1 }) });
        },

        rotateRight() {
            return update({ tank: tank.update({ angle: tank.angle - 1 }) });
        },

        spawn() {
            return update({
                dead: false,
                tank: tank.spawn()
            });
        },

        addDamage(damage) {
            const nextStamina = tank.stamina - damage;
            return update({
                dead: nextStamina <= 0,
                tank: tank.update({ stamina: nextStamina })
            });
        },

        addScore(score) {
            return update({ score: props.score + score });
        },

        canTake(damage) {
            return tank.stamina - damage > 0;
        },

        collides(x, y) {
            return distanceFromPlayer(x, y) < 9;
        },

        distance(x, y) {
            return distanceFromPlayer(x, y);
        }
    };
}

const distance = (pt1, pt2) => {
    const a2 = Math.pow(Math.abs(pt1.x - pt2.x), 2);
    const b2 = Math.pow(Math.abs(pt1.y - pt2.y), 2);
    return ~~Math.sqrt(a2 + b2);
};

const POWER_REDUCTION_FACTOR = 5.5;