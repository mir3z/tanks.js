import Terrain from "../core/Terrain";

export default function terrainRandomizer(rand, w, h) {
    const peaks = new Array(rand.from(1, w / 200))
        .fill(null)
        .map(() => ({
            x: rand.from(0, w - 1),
            h: rand.from(-h / 6, h / 3),
            slope: rand.from(100, 300)
        }));

    let t = Terrain
        .ofSize(w, h)
        .flat(h / 3);

    peaks.forEach(p => {
        t = t.peak(p.x, p.h, p.slope);
    });

    return t.sharpen(100, 4, rand.from);
}