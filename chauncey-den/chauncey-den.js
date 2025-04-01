import { GameManager } from "./game_manager.js";

// Global vars
let gameManager = new GameManager();

let chaunceyImage = document.getElementById("chauncey");
let chaunceyCounter = document.getElementById("chauncey-counter");

// Run main when the html loads
document.addEventListener('DOMContentLoaded', function() {
    main();
});

function main() {
    addListeners();
};

function addListeners() {
    // Game manager events
    gameManager.onEvent('chaunceyChange', onChaunceyChange);
    
    // DOM events
    chaunceyImage.addEventListener("click", onChaunceyClick);
};

function onChaunceyClick() {
    gameManager.chaunceyCount += 1;
}

function onChaunceyChange(newChaunceyCount) {
    chaunceyCounter.textContent = "Chaunceys: " + newChaunceyCount;
}
