export default function CanvasRenderer(canvas) {
    const { width, height } = canvas;
    const ctx = canvas.getContext("2d");

    const draw = fn => {
        ctx.save();
        ctx.translate(0.5, 0.5);
        fn({ ctx, width, height });
        ctx.restore();
    };

    const clear = () => {
        draw(({ ctx, width, height }) => {
            ctx.clearRect(0, 0, width, height);
        });
    };

    const update = fn => {
        clear();
        draw(fn);
    };

    return {
        width,
        height,
        draw,
        clear,
        update
    };
}