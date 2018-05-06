const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ENTER = 13;
const KEY_PG_UP = 33;
const KEY_PG_DOWN = 34;
const KEY_TAB = 9;

export default function BrowserKeyListener(el) {
    const keyListeners = {};

    const createKeyHandler = () => event => {
        const keyCode = event.keyCode;

        if (keyCode in keyListeners) {
            event.preventDefault();
            event.stopPropagation();
            keyListeners[keyCode].notify(event);
        }
    };

    const register = (keyCode, handler) => {
        keyListeners[keyCode] = keyListeners[keyCode] || Observable();
        keyListeners[keyCode].register(handler);
    };

    const delegate = key => handler => register(key, handler);

    return {
        register,

        init() {
            el.addEventListener("keydown", createKeyHandler(), false);

            return this;
        },

        onKeyLeft: delegate(KEY_LEFT),
        onKeyRight: delegate(KEY_RIGHT),
        onKeyUp: delegate(KEY_UP),
        onKeyDown: delegate(KEY_DOWN),
        onKeyEnter: delegate(KEY_ENTER),
        onKeyPageUp: delegate(KEY_PG_UP),
        onKeyPageDown: delegate(KEY_PG_DOWN),
        onKeyTab: delegate(KEY_TAB)
    };
}

function Observable() {
    const handlers = [];

    return {
        register(fn) {
            handlers.push(fn);
        },

        notify(...args) {
            handlers.forEach(handler => handler(...args));
        }
    };
}
