import { GameValue, GameUnlockable } from "../game_engine/types.js";

export class GameManager {
    constructor() {
        // Values
        this.chaunceyCount = new GameValue(0);

        // Unlocks
        this.unlocks = {};
        this.unlocks.firstClick = new GameUnlockable();
        this.unlocks.resources = new GameUnlockable();
        this.unlocks.chaunceys = new GameUnlockable();

        // Unlock resources and chaunceys on first click 
        this.unlocks.firstClick.onUnlocked.onNextEventFired(() => {
            this.unlocks.resources.onUnlocked.fireEvent();
            this.unlocks.chaunceys.onUnlocked.fireEvent();
        });

        // Unlock first click when chauncey is clicked
        this.chaunceyCount.onChanged.onNextEventFired(() => {
            this.unlocks.firstClick.unlock();
        });
    }
}
