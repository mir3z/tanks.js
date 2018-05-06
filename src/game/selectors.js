export const getActivePlayer = (state) => {
    const { players, playerIdx } = state;
    return players[playerIdx];
};

export const getActivePlayerIdx = (state) => state.playerIdx;

export const getPlayers = (state) => state.players;

export const getTerrain = (state) => state.terrain;

export const isKeyNavActive = (state) => !state.blockKeyNav;

export const getPlayersInRange = (state, x, y, range) => {
    return getPlayers(state).filter(player => player.distance(x, y) <= range);
};

export const getWind = (state) => state.wind;