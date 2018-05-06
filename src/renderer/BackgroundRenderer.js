export default function BackgroundRenderer(canvasRenderer) {
    const { draw } = canvasRenderer;

    return {
        render() {
            draw(({ ctx, width, height }) => {
                const grad = ctx.createLinearGradient(0, 0, 0, height);
                grad.addColorStop(0, "#6dc2f9");
                // grad.addColorStop(0, "#f98814");
                // grad.addColorStop(0, "#f98d76");
                // grad.addColorStop(0, "#050384");
                // grad.addColorStop(0, "#a4aaa4");
                // grad.addColorStop(0, "#ddffa1");
                // grad.addColorStop(0, "#ffee78");
                grad.addColorStop(1, "#fff");

                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, width, height);
            });
        }
    };
}