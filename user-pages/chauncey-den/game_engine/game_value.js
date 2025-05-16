import { GameEvent } from "./game_event.js";

export class GameValue {
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
