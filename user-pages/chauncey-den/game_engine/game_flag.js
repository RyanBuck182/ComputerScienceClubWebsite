import { GameEvent } from "./game_event.js";
import { GameValue } from "./game_value.js";

export class GameFlag {
    constructor(initialValue) {
        this._gameValue = new GameValue(!!initialValue);

        // Events
        this.onEnabled = new GameEvent();
        this.onDisabled = new GameEvent();
        this.onChanged = new GameEvent();

        // Event Cascades
        this._gameValue.onChanged.onEachEventFired((newVal) => {
            this.onChanged.fireEvent(newVal);
        });

        this.onChanged.onEachEventFired((newVal) => {
            if (newVal)
                this.onEnabled.fireEvent();
            else
                this.onDisabled.fireEvent();            
        });
    }

    get isEnabled() {
        return this._gameValue.get();
    }

    set isEnabled(newVal) {
        this._gameValue.set(!!newVal);
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
