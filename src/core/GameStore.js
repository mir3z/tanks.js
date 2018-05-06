import PubSub from "./PubSub";

export default function GameStore(reducer, initialState = {}) {
    let state = { ...initialState };

    const dispatcher = PubSub();

    dispatcher.subscribe(action => {
        const nextState = reducer(state, action);

        console.group("action: " + action.type);
        console.log("prev", state);
        console.log("action", action);
        console.log("next", nextState);
        console.groupEnd("action: " + action.type);

        state = nextState;
    });

    return {
        getState() {
            return state;
        },

        dispatch(action) {
            dispatcher.publish(action);
        },

        subscribe(fn) {
            dispatcher.subscribe(fn);
        }
    };
}