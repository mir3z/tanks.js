export default class Raf {
    constructor(fn) {
        this.register(fn);
        this._hnd = null;
        this._cancelled = false;
    }

    register(fn) {
        this._cancelled = false;
        this.frame = fn;
    }

    request() {
        if (this.frame) {
            this._hnd = window.requestAnimationFrame((now) => {
                if (this._cancelled) {
                    return;
                }
                
                this.frame(now);
            });
        }
    }

    cancel() {
        this._cancelled = true;
        window.cancelAnimationFrame(this._hnd);
        this.frame = null;
    }
}
