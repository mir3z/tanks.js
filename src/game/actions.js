export const CREATE_TERRAIN = "create-terrain";
export const ADD_PLAYER = "add-player";
export const NEXT_PLAYER = "next-player";
export const NEXT_ROUND = "next-round";
export const GROUND_EXPLODED = "ground-exploded";
export const TURRET_ROTATE = "turret-rotate";
export const FIRING_END = "firing-end";
export const FIRING_START = "firing-start";
export const ASSIGN_DAMAGE = "assign-damage";
export const CHANGE_POWER = "change-power";
export const ROUND_END = "round-end";
export const NEXT_WEAPON = "next-weapon";

export const createTerrain = terrain => ({ type: CREATE_TERRAIN, terrain });

export const addPlayer = player => ({ type: ADD_PLAYER, player });

export const nextPlayer = (wind) => ({ type: NEXT_PLAYER, wind });

export const groundExploded = (x) => ({ type: GROUND_EXPLODED, x });

export const turretRotate = (by = 1) => ({ type: TURRET_ROTATE, by });

export const changePower = (by = 1) => ({ type: CHANGE_POWER, by });

export const firingEnd = () => ({ type: FIRING_END });
export const firingStart = () => ({ type: FIRING_START });

export const assignDamage = ({ x, y, player, damage }) => ({ type: ASSIGN_DAMAGE, player, damage });

export const nextRound = () => ({ type: NEXT_ROUND });
export const roundEnd = () => ({ type: ROUND_END });

export const nextWeapon = () => ({ type: NEXT_WEAPON });