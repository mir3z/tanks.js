export default function ProjectileRenderer(canvasRenderer) {
    const { clear, draw } = canvasRenderer;


    const renderPointer = (x) => draw(({ ctx }) => {
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "#000";
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 23);
        ctx.stroke();
    });

    return {
        draw,
        clear,

        renderMissile(x, y, size = 2) {
            draw(({ ctx, height }) => {
                if (y > height) {
                    renderPointer(x);
                }

                ctx.fillStyle = "#f00";
                ctx.fillRect(x - size / 2, height - y - size / 2, size, size);
            });
        },

        renderAtom(x, y, radius) {
            draw(({ ctx }) => {
                const grad = ctx.createRadialGradient(x, y, radius / 6, x, y, radius);

                // Add colors
                grad.addColorStop(0.000, "rgba(255, 0, 0, 1.0)");
                grad.addColorStop(1.000, "rgba(0, 0, 0, 1.0)");

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.fill();
            });
        }
    };
}