export default function ParticlesRenderer(canvasRenderer) {
    const { clear, draw } = canvasRenderer;

    return {
        clear,
        render({ x, y, opacity }, { size = 1 } = {}) {
            draw(({ ctx, height }) => {
                ctx.fillStyle = `rgba(68, 68, 68, ${ opacity }`;
                ctx.fillRect(x, height - y, size, size);
            });
        },

        fire({ x, y, opacity }, { size = 1 } = {}) {
            draw(({ ctx, height }) => {
                ctx.fillStyle = `rgba(249, 144, 6, ${ opacity }`;
                // ctx.filter = "blur(1px)";
                ctx.globalCompositeOperation = 'lighter';
                ctx.fillRect(x, height - y, size, size);
            });
        }
    };
}