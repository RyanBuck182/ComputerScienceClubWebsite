import { GameValue, GameUnlockable } from "../game_engine/types.js";

export class GameManager {
    constructor() {
        // Values
        this.clickCount = new GameValue(0);
        this.clickModifier = new GameValue(1);
        this.chaunceyCount = new GameValue(0);
        this.handlerCount = new GameValue(0);

        // Unlocks
        this.unlocks = {};
        this.unlocks.firstClick = new GameUnlockable();
        this.unlocks.tenthClick = new GameUnlockable();

        // Resource unlocks
        this.unlocks.resources = new GameUnlockable();
        this.unlocks.chaunceys = new GameUnlockable();

        // Upgrade unlocks
        this.unlocks.upgrades = new GameUnlockable();
        this.unlocks.handlers = new GameUnlockable();

        this._connectResourceMilestones();
        this._connectUpgradeMilestones();
        this._connectClickMilestones();
    }

    _connectResourceMilestones() {
        // Unlock resources and chaunceys on first click 
        this.unlocks.firstClick.onUnlocked.onNextEventFired(() => {
            this.unlocks.resources.onUnlocked.fireEvent();
            this.unlocks.chaunceys.onUnlocked.fireEvent();
        });
    }

    _connectUpgradeMilestones() {
        // Unlock upgrades and handlers on tenth click 
        this.unlocks.tenthClick.onUnlocked.onNextEventFired(() => {
            this.unlocks.upgrades.onUnlocked.fireEvent();
            this.unlocks.handlers.onUnlocked.fireEvent();
        });
    }

    _connectClickMilestones() {
        // Increment chaunceys each click
        this.clickCount.onChanged.onEachEventFired(() => {
            this.chaunceyCount.value += this.clickModifier.value;
        });

        // Unlock first click
        this.clickCount.onChanged.onNextEventFired(() => {
            this.unlocks.firstClick.unlock();
        });

        // Unlock tenth click
        let unlockTenthClick = (clicks) => {
            if (clicks >= 10) {
                this.unlocks.tenthClick.unlock();
                this.clickCount.onChanged.removeRecurringCallback(self);
            }
        }
        this.clickCount.onChanged.onEachEventFired(unlockTenthClick);
    }
}
