import PubSub from "./PubSub";

export function _CollisionDetector({ getTerrain, getPlayers }) {
    const withTerrain = PubSub();
    const withPlayer = PubSub();

    return {
        withTerrain,
        withPlayer,

        detect(x, y) {
            let collides = false;

            if (y < getTerrain().at(x)) {
                collides = true;
                withTerrain.publish({ x, y });
            }


            const cp = getPlayers().filter(p => p.collides(x, y));

            if (cp.length) {
                collides = true;
                withPlayer.publish(cp, x, y);
            }

            return collides;
        },

        reset() {
            withTerrain.reset();
            withPlayer.reset();
        }
    };
}


export default function CollisionDetector({ getTerrain, getPlayers }) {
    const withTerrain = (x, y) => y < getTerrain().at(x);
    const withPlayer = (x, y) => getPlayers().filter(p => p.collides(x, y));
    const withBoundary = x => !getTerrain().isWithin(x);

    return {
        withTerrain,
        withPlayer,
        withBoundary
    };
}