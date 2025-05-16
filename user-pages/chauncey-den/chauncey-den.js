import { GameManager } from "./game_manager.js";

// Global vars
let gameManager = new GameManager();

let chaunceyImage = document.getElementById("chauncey");
let resourcesBox = document.getElementById("resources");
let chaunceyCounter = document.getElementById("chauncey-counter");

// Run main when the html loads
document.addEventListener('DOMContentLoaded', function() {
    main();
});

function main() {
    // Values
    gameManager.chaunceyCount.onChanged.onEachEventFired(onChaunceyChange);
    
    // Unlocks
    gameManager.unlocks.resources.onUnlocked.onNextEventFired(onUnlockedResources)
    gameManager.unlocks.chaunceys.onUnlocked.onNextEventFired(onUnlockedChaunceys)

    // User Interaction
    chaunceyImage.addEventListener("click", onChaunceyClick);
};

function onChaunceyClick() {
    gameManager.chaunceyCount.value += 1;
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
