import random from "lodash.random";
import noop from "lodash.noop";

import PubSub from "./PubSub";

export function ParticlesManager({ createTimer, renderer }) {
    let __id = 0;
    const queue = {};
    const timer = createTimer();

    const loop = (dt, gt, timer) => {
        if (Object.keys(queue).length === 0) {
            renderer.clear();
            return;
        }

        renderer.clear();

        Object.keys(queue).forEach(id => {
            const emitter = queue[id];
            emitter.update({ dt, gt });

            if (emitter.isDone()) {
                delete queue[id];
                console.warn("removing...", id);

                if (Object.keys(queue).length === 0) {
                    timer.stop();
                    console.warn("stopping...");
                }
            }
        });
    };

    timer.subscribe(loop);

    return {
        schedule(emitter) {
            if (!Object.keys(queue).length) {
                console.warn("starting...");
                timer.start();
            }

            const id = __id++;
            console.warn("scheduling...", id);
            queue[id] = emitter;
        },

        stop() {
            timer.reset();
        }
    };
}

export function ParticlesEmitter({ createProjectileSolver }, generator) {
    let particles = [];
    let allEmitted = false;

    const progress = PubSub();
    const done = PubSub();

    return {
        progress,
        done,

        isDone: () => allEmitted,

        emit(x, y, v) {
            particles = generator();

            particles.forEach(p => {
                p.solver = createProjectileSolver({
                    v: v + p.v,
                    angle: p.angle,
                    x0: x + p.x,
                    y0: y + p.y
                });
            });

            allEmitted = false;
        },

        update({ dt }) {
            let anyActive = false;

            for (let i = 0, len = particles.length; i < len; ++i) {
                const p = particles[i];
                p.t += dt * 0.08 * 60 / 1000;

                if (!p.active) {
                    continue;
                }

                if (p.t < 0) {
                    anyActive = true;
                    continue;
                }

                const { x, y } = p.solver.solve(p.t);
                const opacity = Math.max(0, 1.0 - p.t / p.shutdownDuration);

                p.x = x;
                p.y = y;
                p.opacity = opacity;

                progress.publish(p);

                anyActive = p.active || anyActive;
            }

            allEmitted = !anyActive;

            if (allEmitted) {
                done.publish();
            }
        }
    };
}

export function radialGenerator(options = {}) {
    const { count = 1000, emissionDuration = 5, shutdownDuration = 5, angle = 45, spread = 30, radius = 0 } = options;
    const particles = new Array(count);

    for (let i = 0; i < count; i++) {
        const _angle = random(angle - spread / 2, angle + spread / 2, true);

        particles[i] = {
            shutdownDuration,
            v: random(0, 25, true),
            t: random(-emissionDuration, 0, true),
            x: radius * Math.cos(rad(_angle)),
            y: radius * Math.sin(rad(_angle)),
            angle: _angle,
            active: true
        };
    }

    return () => particles;
}

const rad = deg => deg * Math.PI / 180;
