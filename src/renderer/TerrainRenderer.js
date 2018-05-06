export default function TerrainRenderer(canvasRenderer) {
    const { update, width, height } = canvasRenderer;
    
    return {
        width,
        height,

        update(terrain) {
            update(({ ctx, height }) => {
                ctx.strokeStyle = "#444";
                ctx.lineWidth = 1;
                ctx.lineCap = "round";
                ctx.beginPath();
                terrain.heightMap.forEach((value, x) => {
                    ctx.moveTo(x, height);
                    ctx.lineTo(x, height - value);
                });
                ctx.stroke();
                ctx.closePath();
            });
        }
    };
}