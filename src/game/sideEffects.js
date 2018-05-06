import {
    ADD_PLAYER, CHANGE_POWER, CREATE_TERRAIN, FIRING_END, GROUND_EXPLODED, NEXT_PLAYER, NEXT_ROUND, nextPlayer,
    nextRound,
    ROUND_END,
    roundEnd, createTerrain,
    TURRET_ROTATE, NEXT_WEAPON
} from "./actions";
import { getActivePlayer, getPlayers, getTerrain, getWind } from "./selectors";

export default function bindSideEffects(context) {
    const {
        store,
        bgRenderer,
        terrainRenderer,
        tankRenderer,
        statusBarRenderer,
        uiRenderer,
        createRandomTerrain,
        rand
    } = context;

    const WIND_CHANGE_PROB = 70;

    store.subscribe(action => {
        const state = store.getState();
        
        switch (action.type) {
            case CREATE_TERRAIN:
                bgRenderer.render();
                terrainRenderer.update(getTerrain(state));
                return;

            case GROUND_EXPLODED:
                tankRenderer.updateAll(getPlayers(state));
                terrainRenderer.update(getTerrain(state));
                return;

            case FIRING_END:
                if (state.roundState === "finished") {
                    store.dispatch(roundEnd());
                } else {
                    const wind = getWind(state);
                    const nextWind = rand.from(1, 100) >= WIND_CHANGE_PROB
                        ? wind + rand.from(-100, 100)
                        : wind;

                    store.dispatch(nextPlayer(nextWind));
                }

                return;

            case ADD_PLAYER:
                tankRenderer.render(action.player);
                statusBarRenderer.render({ player: getActivePlayer(state), wind: getWind(state) });
                terrainRenderer.update(getTerrain(state));
                return;

            case TURRET_ROTATE:
            case CHANGE_POWER:
            case NEXT_PLAYER:
                tankRenderer.updateAll(getPlayers(state));
                statusBarRenderer.render({ player: getActivePlayer(state), wind: getWind(state) });

                return;

            case ROUND_END:
                uiRenderer.roundSummaryDialog({
                    players: getPlayers(state),
                    round: state.round,
                    onNextRound: () => {
                        store.dispatch(createTerrain(createRandomTerrain()));
                        store.dispatch(nextRound());
                    }
                });
                return;

            case NEXT_ROUND:
                tankRenderer.updateAll(getPlayers(state));
                statusBarRenderer.render({ player: getActivePlayer(state), wind: getWind(state) });
                terrainRenderer.update(getTerrain(state));
                return;

            case NEXT_WEAPON:
                statusBarRenderer.render({ player: getActivePlayer(state), wind: getWind(state) });
                return;
        }
    });
}