class Play extends Phaser.Scene {
   constructor() {
      super("play");
   }

   create() {
      this.add.text(20, 20, "welcome to da play scene");

      this.add.rectangle(0, 0, game.config.width, borderUISize, 0xfacade).setOrigin(0,0);
      this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xfacade).setOrigin(0,0);
      this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xfacade).setOrigin(0,0);
      
   }
}