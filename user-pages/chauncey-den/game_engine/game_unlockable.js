import { GameEvent } from "./game_event.js";
import { GameFlag } from "./game_flag.js";

export class GameUnlockable {
    constructor() {
        this._gameFlag = new GameFlag(false);
        
        // Event
        this.onUnlocked = new GameEvent();

        // Event Cascade
        this._gameFlag.onEnabled.onNextEventFired(() => {
            this.onUnlocked.fireEvent();
        });
    }

    get isUnlocked() {
        return this._gameFlag.isEnabled;
    }

    // Unlock the unlock
    unlock() {
        this._gameFlag.enable();
        this.onUnlocked 
    }
}
