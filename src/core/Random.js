export default function Random(seed) {
    let state = seed;

    const m = 2147483648;
    const a = 1103515245;
    const c = 12345;

    const current = () => (a * state + c) % m;

    const next = () => {
        state = current();
        return state / m;
    };

    return {
        next,

        from(min, max) {
            return Math.floor(next() * (~~max - ~~min + 1)) + ~~min;
        }
    };
}