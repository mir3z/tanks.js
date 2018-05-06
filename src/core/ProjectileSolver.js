export default function ProjectileSolver(params = {}) {
    const { v, angle, x0 = 0, y0 = 0, wind = 0, g = 9.81 } = params;
    const radAngle = rad(angle);

    const x = t => x0 + v * Math.cos(radAngle) * t + wind * Math.pow(t, 2);
    const y = t => y0 + v * Math.sin(radAngle) * t - g * Math.pow(t, 2) / 2;

    return {
        solve: (t) => ({ x: x(t), y: y(t) }),
        x,
        y
    };
}

const rad = deg => deg * Math.PI / 180;
