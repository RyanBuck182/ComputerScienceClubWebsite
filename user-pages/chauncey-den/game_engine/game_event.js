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

    // Remove a callback
    removeCallback(callback) {
        this.removeRecurringCallback(callback);
        this.removeTempCallback(callback);
    }

    // Remove a recurring callback
    removeRecurringCallback(callback) {
        index = this._callbacks.indexOf(callback);
        this._callbacks.splice(index, 1);
    }

    // Remove a temporary callback
    removeTempCallback(callback) {
        index = this._tempCallbacks.indexOf(callback);
        this._tempCallbacks.splice(index, 1);
    }

    // Clear all callbacks
    clearAllCallbacks() {
        this._callbacks = [];
        this._tempCallbacks = [];
    }
}
