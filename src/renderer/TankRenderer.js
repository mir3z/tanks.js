const rad = deg => deg * Math.PI / 180;

export default function TankRenderer(canvasRenderer) {
    const { clear, draw } = canvasRenderer;
    
    function roundRect(x, y, w, h, radius, color) {
        draw(({ ctx, height }) => {
            const _y = height - y;
            const r = x + w;
            const b = _y + h;

            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = "5";
            ctx.moveTo(x + radius, _y);
            ctx.lineTo(r - radius, _y);
            ctx.quadraticCurveTo(r, _y, r, _y + radius);
            ctx.lineTo(r, _y + h - radius);
            ctx.quadraticCurveTo(r, b, r - radius, b);
            ctx.lineTo(x + radius, b);
            ctx.quadraticCurveTo(x, b, x, b - radius);
            ctx.lineTo(x, _y + radius);
            ctx.quadraticCurveTo(x, _y, x + radius, _y);
            ctx.stroke(); 
        });
    }

    function cannon(x, y, angle, color, r = 11) {
        draw(({ ctx, height }) => {
            const x0 = x;
            const y0 = height - y;
            const x1 = x0 + r * Math.cos(rad(angle));
            const y1 = y0 - r * Math.sin(rad(angle));

            ctx.beginPath();
            ctx.lineWidth = "1.5";
            ctx.strokeStyle = color;
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.stroke();
        });
    }

    function render({ x, y, tank, dead }) {
        const w = tank.size;
        const h = 4;
        const w4 = w / 4;
        const d = 0;
        const _x = x - w / 2;
        const _y = y + h;
        const color = dead ? "#333" : tank.color;

        cannon(x + d, y + h * 2, tank.angle, color);

        roundRect(_x, _y, w, h / 2, 1, color);
        roundRect(_x + (w - w4) / 2 + d, _y + h, w4, h, 1, color);
    }
    
    return {
        clear,

        render,

        updateAll(players) {
            clear();
            players.forEach(render);
        }
    };
}