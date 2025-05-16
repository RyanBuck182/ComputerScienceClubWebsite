export class GameEvent {
    constructor() {
        this._callbacks = [];
        this._tempCallbacks = [];
    }

    // Call all callbacks
    fireEvent(data) {
        for (const callback of this._callbacks)
            callback(data);

        for (const callback of this._tempCallbacks)
            callback(data);
        this._tempCallbacks = []
    }

    // Add a callback for the every time the event fires
    onEachEventFired(callback) {
        this._callbacks.push(callback);
    }

    // Add a callback for the next time the event fires
    onNextEventFired(callback) {
        this._tempCallbacks.push(callback);
    }

    // Clear callbacks
    clearAllCallbacks() {
        this._callbacks = [];
        this._tempCallbacks = [];
    }
}
