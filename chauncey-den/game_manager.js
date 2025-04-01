export class GameManager {
    constructor() {
        // Flags
        this._firstClick = false;
        this._unlockedResources = false;
        this._unlockedChaunceys = false;

        // Values
        this._chaunceyCount = 0;

        // Events
        this.events = {
            'chaunceyChange': [],
        };
    }

    // Getters and setters

    get chaunceyCount() {
        return this._chaunceyCount;        
    }

    set chaunceyCount(val) {
        this._chaunceyCount = val;

        this._firstClick = true;
        this._unlockedResources = true;
        this._unlockedChaunceys = true;

        this._emitEvent(
            'chaunceyChange',
            this._chaunceyCount
        );
    }

    // Events

    onEvent(ev, callback) {
        this.events[ev].push(callback);
    }

    _emitEvent(ev, data) {
        const callbacks = Object.values(this.events[ev])
        for (const callback of callbacks) {
            callback(data);
        }
    }
}
