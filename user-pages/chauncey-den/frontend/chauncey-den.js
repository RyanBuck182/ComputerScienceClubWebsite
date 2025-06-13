import { GameManager } from "../backend/game_manager.js";

// Global vars
let gameManager = new GameManager();

let chaunceyButton = document.getElementById("chauncey");

// Resources
let resourcesBox = document.getElementById("resources");
let chaunceyCounter = document.getElementById("chauncey-counter");

// Upgrades
let upgradesBox = document.getElementById("upgrades");
let handlerBox = document.getElementById("handler-box");
let handlerCounter = document.getElementById("handler-counter");
let handlerButton = document.getElementById("handler-button");

// Run main when the html loads
document.addEventListener('DOMContentLoaded', function() {
    main();
});

function main() {
    // Values
    gameManager.chaunceyCount.onChanged.onEachEventFired(onChaunceyChange);
    gameManager.handlerCount.onChanged.onEachEventFired(onHandlerChange);
    
    // Resource Unlocks
    gameManager.unlocks.resources.onUnlocked.onNextEventFired(onUnlockedResources);
    gameManager.unlocks.chaunceys.onUnlocked.onNextEventFired(onUnlockedChaunceys);

    // Upgrade Unlocks
    gameManager.unlocks.upgrades.onUnlocked.onNextEventFired(onUnlockedUpgrades);
    gameManager.unlocks.handlers.onUnlocked.onNextEventFired(onUnlockedHandlers);

    // User Interaction
    chaunceyButton.addEventListener("click", onChaunceyClick);
    handlerButton.addEventListener("click", onHandlerClick);
};

function onChaunceyClick() {
    gameManager.clickCount.value += 1;
}

function onHandlerClick() {
    gameManager.handlerCount.value += 1;
}

function onChaunceyChange(newChaunceyCount) {
    chaunceyCounter.textContent = "Chaunceys: " + newChaunceyCount;
}

function onHandlerChange(newHandlerCount) {
    handlerCounter.textContent = "Chauncey Handlers: " + newHandlerCount;
}

function onUnlockedResources() {
    resourcesBox.hidden = false;
}

function onUnlockedChaunceys() {
    chaunceyCounter.hidden = false;
}

function onUnlockedUpgrades() {
    upgradesBox.hidden = false;
}

function onUnlockedHandlers() {
    handlerBox.hidden = false;
}
