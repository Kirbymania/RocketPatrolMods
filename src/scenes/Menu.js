class Menu extends Phaser.Scene {
   constructor() {
      super("menuScene");
   }
   create (){
      let menuText = this.add.text(20, 20, "Rocket Patrol Menu");
      this.scene.start("playScene");
      menuText.setOrigin(0.5,0.5);
   }
}
