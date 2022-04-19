// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
   constructor(scene, x, y, texture, frame, random, pointValue) {
     super(scene, x, y, texture, frame, random);
     // add object to existing scene
     scene.add.existing(this);
     this.points = pointValue;
     this.moveSpeed = game.settings.spaceshipSpeed;
     this.value = random;
   }

   update() {
      if (this.value == 1){
         // move spaceship left
         this.x -= this.moveSpeed;
         // wrap around from left edge to right edge
         if (this.x <= 0 - this.width) {
            this.x = game.config.width;
         }         
      }
      else{
         // move spaceship right
         this.x += this.moveSpeed;
         // wrap around from left edge to right edge
         if (this.x >= game.config.width) {
            this.x = 0-this.width;
         }              
      }

   }

   // position reset
   reset() {
      this.x = game.config.width;
   }
}
