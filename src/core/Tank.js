import clamp from "lodash.clamp";

export default function Tank({ power, angle, color, stamina = 100, size = 18 }) {
    stamina = clamp(stamina, 0, 100);
    power = clamp(power, 0, stamina * MAX_POWER / 100);
    angle = clamp(angle, 0, 180);

    const update = nextProps => Tank({ power, angle, color, stamina, ...nextProps });

    return {
        power,
        stamina,
        angle,
        color,
        size,
        update,

        spawn: () => update({ stamina: 100, power: MAX_POWER / 2, angle: 90 })
    };
}

const MAX_POWER = 1000;
