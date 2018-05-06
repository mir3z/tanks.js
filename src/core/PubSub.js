export default function PubSub() {
    let __id = 0;
    const subscribers = {};

    return {
        subscribe(fn) {
            const id = __id;
            subscribers[__id++] = fn;
            return id;
        },

        unsubscribe(id) {
            delete subscribers[id];
        },
        
        reset() {
            __id = 0;
            Object.keys(subscribers).forEach(key => {
                delete subscribers[key];               
            });
        },

        publish(...args) {
            Object.keys(subscribers).forEach(key => {
                subscribers[key](...args);
            });
        }
    };
}