import CanvasRenderer from "./renderer/CanvasRenderer";
import BackgroundRenderer from "./renderer/BackgroundRenderer";
import TerrainRenderer from "./renderer/TerrainRenderer";
import ProjectileRenderer from "./renderer/ProjectileRenderer";
import TankRenderer from "./renderer/TankRenderer";
import ParticlesRenderer from "./renderer/ParticlesRenderer";

import gameReducer from "./game/reducer";
import { getPlayers, getActivePlayer, getTerrain, isKeyNavActive, getPlayersInRange, getWind } from "./game/selectors";

import Missile from "./armory/Missile";
import Roller from "./armory/Roller";
import MIRV from "./armory/MIRV";

import ProjectileSolver from "./core/ProjectileSolver";
import Timer from "./core/Timer";
import GameStore from "./core/GameStore";

import Player from "./core/Player";
import Tank from "./core/Tank";
import CollisionDetector from "./core/CollisionDetector";

import createExplosionEffect from "./effect/explosion";
import createBurnEffect from "./effect/burn";

import {
    ParticlesEmitter,
    ParticlesManager,
    radialGenerator
} from "./core/ParticlesSystem";

import {
    createTerrain,
    addPlayer,
    turretRotate,
    changePower,
    groundExploded,
    firingStart,
    firingEnd,
    assignDamage,
    nextRound, nextWeapon
} from "./game/actions";

import bindSideEffects from "./game/sideEffects";

import HTMLRenderer from "./renderer/HTMLRenderer";
import UIRenderer from "./renderer/UIRenderer";
import Random from "./core/Random";
import terrainRandomizer from "./game/terrainRandomizer";

export default function main(seed, layers, raf, keyListener) {
    const bgRenderer = BackgroundRenderer(CanvasRenderer(layers.L0));
    const terrainRenderer = TerrainRenderer(CanvasRenderer(layers.L1));
    const projectileRenderer = ProjectileRenderer(CanvasRenderer(layers.L2));
    const tankRenderer = TankRenderer(CanvasRenderer(layers.L3));
    const particlesRenderer = ParticlesRenderer(CanvasRenderer(layers.L4));
    const uiRenderer = UIRenderer(HTMLRenderer(layers.UI));

    const rand = Random(seed);
    const createRandomTerrain = () => terrainRandomizer(rand, terrainRenderer.width, terrainRenderer.height);

    const store = GameStore(gameReducer, {
        players: [],
        terrain: null,
        playerIdx: 0,
        wind: rand.from(-200, 200),
        blockKeyNav: false,
        roundState: "in-progress",
        round: -1
    });

    bindSideEffects({
        store,
        bgRenderer,
        terrainRenderer,
        tankRenderer,
        statusBarRenderer: uiRenderer.statusBar(),
        uiRenderer,
        createRandomTerrain,
        rand
    });

    const effectsContext = {
        getTerrain: () => getTerrain(store.getState()),
        scheduleParticlesEmission: (emitter) => pm.schedule(emitter),
        createParticlesEmitter: (...args) => ParticlesEmitter(psContext, ...args),
        radialGenerator,
        particlesRenderer
    };

    store.dispatch(createTerrain(createRandomTerrain()));

    const createProjectileSolver = (props) => ProjectileSolver({ wind: getWind(store.getState()) / 100, ...props });

    const psContext = {
        createTimer: () => Timer(raf()),
        createProjectileSolver,
        renderer: particlesRenderer
    };

    const pm = ParticlesManager(psContext);

    const collisionDetectorContext = {
        getTerrain: () => getTerrain(store.getState()),
        getPlayers: () => getPlayers(store.getState())
    };

    const bindAction = (action) => (...args) => store.dispatch(action(...args));
    const bindActions = (...actions) => actions
        .reduce((acc, action) => ({ ...acc, [action.name]: bindAction(action) }), {});

    const weaponContext = {
        createTimer: () => Timer(raf()),
        getTerrain: () => getTerrain(store.getState()),
        getPlayersInRange: (...args) => getPlayersInRange(store.getState(), ...args),
        renderer: projectileRenderer,
        createProjectileSolver,
        dispatch: store.dispatch,
        createCollisionDetector: () => CollisionDetector(collisionDetectorContext),
        explosion: (...args) => createExplosionEffect(effectsContext)(...args),
        burn: (...args) => createBurnEffect(effectsContext)(...args),
        ...bindActions(firingStart, firingEnd, assignDamage, groundExploded)
    };

    function PlayerArmory(armory = [], idx = 0) {
        return {
            armory,
            weapon: () => armory[idx],
            next: () => PlayerArmory(armory, (idx + 1) % armory.length),
            prev: () => PlayerArmory(armory, (idx - 1) % armory.length),
        };
    }

    const w = terrainRenderer.width;
    const px = w / 10;

    const p1 = Player({
        name: "Player1",
        x: px,
        y: getTerrain(store.getState()).at(px),
        armory: PlayerArmory([
            Missile(weaponContext),
            Roller(weaponContext),
            MIRV(weaponContext)
        ]),
        tank: Tank({ power: 400, angle: 43, color: "#498706" })
    });

    const p2 = Player({
        name: "Player2",
        x: w - px,
        y: getTerrain(store.getState()).at(w - px),
        armory: PlayerArmory([
            Missile(weaponContext),
            Roller(weaponContext),
            MIRV(weaponContext)
        ]),
        tank: Tank({ power: 200, angle: 155, color: "#9e0707" })
    });

    store.dispatch(addPlayer(p1));
    store.dispatch(addPlayer(p2));

    store.dispatch(nextRound());

    const ifKeyNavActive = (fn) => () => {
        if (isKeyNavActive(store.getState())) {
            fn();
        }
    };

    keyListener.onKeyLeft(ifKeyNavActive(() => store.dispatch(turretRotate(1))));
    keyListener.onKeyRight(ifKeyNavActive(() => store.dispatch(turretRotate(-1))));
    keyListener.onKeyUp(ifKeyNavActive(() => store.dispatch(changePower(1))));
    keyListener.onKeyDown(ifKeyNavActive(() => store.dispatch(changePower(-1))));
    keyListener.onKeyPageUp(ifKeyNavActive(() => store.dispatch(changePower(10))));
    keyListener.onKeyPageDown(ifKeyNavActive(() => store.dispatch(changePower(-10))));
    keyListener.onKeyEnter(ifKeyNavActive(() => getActivePlayer(store.getState()).fire()));
    keyListener.onKeyTab(ifKeyNavActive(() => store.dispatch(nextWeapon())));
}

