class GameEvent {
    constructor() {
        this._callbacks = [];
    }

    // Call all callbacks
    fireEvent(data) {
        for (const callback of this._callbacks) {
            callback(data);
        }
    }

    // Add a callback
    onEventFired(callback) {
        this._callbacks.push(callback);
    }
}

class GameValue {
    constructor(initialValue) {
        // Value
        this._value = initialValue;

        // Event
        this.onChanged = new GameEvent();
    }

    get value() {
        return this._value;
    }

    set value(newVal) {
        // If the value hasn't changed, do nothing
        if (newVal === this._value)
            return;

        // Change value and fire events
        this._value = newVal;
        this.onChanged.fireEvent(newVal);
    }

    get() {
        return this.value;
    }

    set(newVal) {
        this.value = newVal;
    }
}

class GameFlag extends GameValue {
    constructor(initialValue) {
        super(initialValue);

        // Events
        this.onEnabled = new GameEvent();
        this.onDisabled = new GameEvent();

        // Event Cascade
        this.onChanged.onEventFired((newVal) => {
            if (newVal)
                this.onEnabled.fireEvent();
            else
                this.onDisabled.fireEvent();
        });
    }

    get isEnabled() {
        return this.value;
    }

    set isEnabled(newVal) {
        this.value = !!newVal;
    }

    // Enable the flag
    enable() {
        this.isEnabled = true;
    }

    // Disable the flag
    disable() {
        this.isEnabled = false;
    }

    // Toggle the flag
    toggle() {
        this.isEnabled = !this.isEnabled;
    }
}

class GameUnlock extends GameFlag {
    constructor() {
        super(false);
        
        // Event
        this.onUnlocked = new GameEvent();

        // Event Cascade
        this.onEnabled.onEventFired(() => {
            this.onUnlocked.fireEvent();
        });
    }

    get isUnlocked() {
        return this.isEnabled;
    }

    // Unlock the unlock
    unlock() {
        this.enable();
    }
}

export class GameManager {
    constructor() {
        // Values
        this.chaunceyCount = new GameValue(0);

        // Unlocks
        this.unlocks = {};
        this.unlocks.firstClick = new GameUnlock();
        this.unlocks.resources = new GameUnlock();
        this.unlocks.chaunceys = new GameUnlock();

        // Unlock resources and chaunceys on first click 
        this.unlocks.firstClick.onUnlocked.onEventFired(() => {
            this.unlocks.resources.onUnlocked.fireEvent();
            this.unlocks.chaunceys.onUnlocked.fireEvent();
        });

        // Unlock first click when chauncey is clicked
        this.chaunceyCount.onChanged.onEventFired(() => {
            this.unlocks.firstClick.unlock();
        });
    }
}
