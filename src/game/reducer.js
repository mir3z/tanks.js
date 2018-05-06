import {
    CREATE_TERRAIN,
    ADD_PLAYER,
    NEXT_PLAYER,
    TURRET_ROTATE,
    CHANGE_POWER,
    GROUND_EXPLODED, FIRING_END, FIRING_START, ASSIGN_DAMAGE,
    NEXT_ROUND, ROUND_END, NEXT_WEAPON
} from "./actions";

import { getActivePlayerIdx, getActivePlayer, getPlayers, getTerrain } from "./selectors";

export default function gameReducer(state, action) {

    switch (action.type) {
        case GROUND_EXPLODED:
            const terrain = getTerrain(state).peak(action.x, -10, 15);

            const players = getPlayers(state)
                .map(p => {
                    const terrainLevel = terrain.at(p.x);

                    if (p.y > terrainLevel) {
                        return p.update({ y: terrainLevel });
                    } else {
                        return p;
                    }
                });

            return { ...state, players, terrain };

        case ASSIGN_DAMAGE: return resolveRoundState(assignDamage(state, action));
        case CREATE_TERRAIN: return updateLand(state, action.terrain);
        case ADD_PLAYER: return addPlayer(state, action.player);
        case NEXT_PLAYER: return updateWind(nextPlayer(state), action.wind);
        case NEXT_ROUND: return unblockKeyNav(resolveRoundState(nextRound(state)));
        case TURRET_ROTATE: return updateTurretRotation(state, action.by);
        case CHANGE_POWER: return updateTankPower(state, action.by);
        case ROUND_END:
        case FIRING_START: return blockKeyNav(state);
        case FIRING_END: return unblockKeyNav(state);
        case NEXT_WEAPON: return nextWeapon(state);
    }

    return state;
}


const updateLand = (state, terrain) => ({ ...state, terrain });

const nextPlayer = (state) => {
    const players = getPlayers(state);
    const playerIdx = state.playerIdx;
    const takeNextIdx = (idx) => (idx + 1) % players.length;
    let nextPlayerIdx = playerIdx;

    if (players.length === 1) {
        return state;
    }

    do {
        nextPlayerIdx = takeNextIdx(nextPlayerIdx);
    } while (players[nextPlayerIdx].dead);

    return { ...state, playerIdx: nextPlayerIdx };
};

const updateWind = (state, wind) => ({ ...state, wind });

const nextRound = ({ round = 0, players, terrain, ...state }) => {
    let nextTerrain = terrain;

    players.forEach(p => {
        nextTerrain = nextTerrain.flatten(p.x, p.tank.size);
    });

    const nextPlayers = players
        .map(p => p.spawn().update({ y: nextTerrain.at(p.x) }));

    return {
        ...state,
        playerIdx: 0,
        round: round + 1,
        players: nextPlayers,
        terrain: nextTerrain
    };
};

const addPlayer = (state, player) => {
    const terrain = state.terrain.flatten(player.x, player.tank.size);
    const newPlayer = player.update({ y: terrain.at(player.x) });

    return {
        ...state,
        terrain,
        players: state.players.concat(newPlayer)
    };
};

const updateTankPower = (state, by) => updateActivePlayer(state, p => p.changePower(by));

const updateTurretRotation = (state, by) => updateActivePlayer(state, p => p.rotateTurret(by));

const updateActivePlayer = (state, predicate) => {
    const playerIdx = getActivePlayerIdx(state);

    return {
        ...state,
        players: state.players.map((player, i) => i === playerIdx ? predicate(player) : player)
    };
};

const assignDamage = (state, { player, damage }) => {
    const currentPlayer = getActivePlayer(state);
    const updatedPlayers = getPlayers(state)
        .map(p => p === player ? p.addDamage(damage) : p)
        .map(p => p === currentPlayer && currentPlayer !== player ? p.addScore(damage) : p);

    return { ...state, players: updatedPlayers };
};

const resolveRoundState = state => {
    const players = getPlayers(state);
    const livePlayers = players.filter(p => !p.dead);
    const nextRoundState = livePlayers.length > 1 ? "in-progress" : "finished";

    return { ...state, roundState: nextRoundState };
};

const nextWeapon = state => {
    const activePlayer = getActivePlayer(state);

    return {
        ...state,
        players: state.players.map(p => p === activePlayer ? activePlayer.nextWeapon() : p)
    };
};

const updateBlockKeyNav = blocked => state => ({ ...state, blockKeyNav: blocked });
const blockKeyNav = updateBlockKeyNav(true);
const unblockKeyNav = updateBlockKeyNav(false);
