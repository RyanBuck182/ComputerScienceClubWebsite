import { GameManager } from "../backend/game_manager.js";

// Global vars
let gameManager = new GameManager();

let chaunceyImage = document.getElementById("chauncey");

// Resources
let resourcesBox = document.getElementById("resources");
let chaunceyCounter = document.getElementById("chauncey-counter");

// Upgrades
let upgradesBox = document.getElementById("upgrades");
let handlerCounter = document.getElementById("handler-counter");

// Run main when the html loads
document.addEventListener('DOMContentLoaded', function() {
    main();
});

function main() {
    // Values
    gameManager.chaunceyCount.onChanged.onEachEventFired(onChaunceyChange);
    
    // Resource Unlocks
    gameManager.unlocks.resources.onUnlocked.onNextEventFired(onUnlockedResources);
    gameManager.unlocks.chaunceys.onUnlocked.onNextEventFired(onUnlockedChaunceys);

    // Upgrade Unlocks
    gameManager.unlocks.upgrades.onUnlocked.onNextEventFired(onUnlockedUpgrades);
    gameManager.unlocks.handlers.onUnlocked.onNextEventFired(onUnlockedHandlers);

    // User Interaction
    chaunceyImage.addEventListener("click", onChaunceyClick);
};

function onChaunceyClick() {
    gameManager.clickCount.value += 1;
}

function onChaunceyChange(newChaunceyCount) {
    chaunceyCounter.textContent = "Chaunceys: " + newChaunceyCount;
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
    handlerCounter.hidden = false;
}
