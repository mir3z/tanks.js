import PubSub from "./PubSub";

export default function Timer(raf) {
    const tickEvent = PubSub();

    let lastTimerTime = 0;
    let startTime = 0;

    const start = () => {
        raf.register((now) => {
            tick(now);
            raf.request();
        });
        raf.request();
    };
    const stop = () => {
        raf.cancel();
        startTime = 0;
    };
    const reset = () => {
        stop();
        tickEvent.reset();
    };
    const subscribe = tickEvent.subscribe;
    const unsubscribe = tickEvent.unsubscribe;

    const immediate = (fn) => {
        const id = subscribe(fn);
        start();
        return id;
    };

    const timer = {
        start,
        stop,
        reset,
        immediate,
        subscribe,
        unsubscribe
    };

    const tick = (now) => {
        if (!startTime) {
            startTime = now;
            lastTimerTime = 0;
        }

        const timerTime = now - startTime;
        const frameTime = timerTime - lastTimerTime;

        tickEvent.publish(frameTime, timerTime, timer);
        lastTimerTime = timerTime;
    };

    return timer;
}