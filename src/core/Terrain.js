import random from "lodash.random";
import memoize from "lodash.memoize";

export default function Terrain(width, height, heightMap) {

    const at = x => heightMap[~~x];

    return {
        heightMap,
        at,

        flat(level = height / 5) {
            const flatHeightMap = heightMap.map(h => level);
            return Terrain(width, height, flatHeightMap);
        },

        flatten(x, size) {
            const s = size * 0.8;
            const y0 = at(x - s);
            const y1 = at(x + s);
            const y = Math.min(y0, y1);

            const nextHeightMap = heightMap.map((h, i) => Math.abs(x - i) < s ? y : h);
            return Terrain(width, height, nextHeightMap);
        },

        peak(x, h, slope = 100) {
            const hmap = heightMap.map((value, i) => {
                return value + (h / Math.pow(Math.E, Math.pow((i - x) / slope, 2)));
            });

            return Terrain(width, height, hmap);
        },

        sharpen(n, delta, randFn = random) {
            const rand = memoize(x => randFn(-delta, delta));
            const hmap = [];

            let x0 = 0, x1;
            let y0, y1;

            for (let i = 1; i <= n + 1; i++) {
                x1 = Math.floor(heightMap.length / (n+1) * i - 0.5);
                y0 = at(x0) + rand(x0);
                y1 = at(x1) + rand(x1);

                for (let k = x0; k <= x1; k++) {
                    hmap[k] = (y1 - y0) / (x1 - x0) * (k - x0) + y0;
                }

                x0 = x1;
            }

            return Terrain(width, height, hmap);
        },

        getSlope(x) {
            const _x = ~~x;
            const delta = 15;
            const p0 = { x: _x - delta, y: at(_x - delta) };
            const p1 = { x: _x + delta, y: at(_x + delta) };
            const m = (p0.y - p1.y) / (p0.x - p1.x);
            return Math.atan(m) * 180 / Math.PI;
        },

        getRollDirection(x) {
            if (at(x - 1) < at(x)) {
                return -1;
            } else if (at(x + 1) < at(x)) {
                return 1;
            } else {
                return 0;
            }
        },

        isWithin(x) {
            return x > 0 && x < width;
        }
    };
}

Terrain.ofSize = (width, height) => Terrain(width, height, new Array(width).fill(0));
