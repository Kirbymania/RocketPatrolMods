// Em Coo
// Rocket Patrol Mods
// 4/18/2022
// ~11 hours

// Point Breakdown
// Implement the 'FIRE' UI text from the original game (5)
// Add your own (copyright-free) background music to the Play scene (5)
// Randomize each spaceship's movement direction at the start of each play (5)
// Allow the player to control the Rocket after it's fired (5)
// Create a new animated sprite for the Spaceship enemies (10)
// Create a new title screen (e.g., new artwork, typography, layout) (10)
// Implement parallax scrolling (10)
// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
// Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) 
// 

console.log("Hello from main.js");

let config = {
   type: Phaser.AUTO,
   width: 640,
   height : 480,
   scene: [ Menu, Play ]
};

let borderUISize = config.height / 15;
let borderPadding = borderUISize / 3;

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;