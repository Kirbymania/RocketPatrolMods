class Menu extends Phaser.Scene {
   constructor() {
      super("menuScene");
   }
   preload() {
      this.load.image('title_screen', './assets/title_screen2.png');
      // load audio
      this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
      this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
      this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
   }
   create (){
      this.title_screen = this.add.tileSprite(0, 0, 640, 480, 'title_screen').setOrigin(0, 0).setScrollFactor(0);

      // menu text configuration
      let menuConfig = {
         fontFamily: 'Trebuchet MS',
         fontSize: '28px',
         backgroundColor: '#F3B141',
         color: '#843605',
         align: 'right',
         padding: {
         top: 5,
         bottom: 5,
         },
         fixedWidth: 0
      }
      let menuConfig2 = {
         fontFamily: 'Trebuchet MS',
         fontSize: '35px',
         backgroundColor: '#F3B141',
         color: '#843605',
         align: 'right',
         padding: {
         top: 6,
         bottom: 6,
         },
         fixedWidth: 0
      }

      // show menu text
      this.add.text(game.config.width/2, game.config.height/2 - borderUISize*4 - borderPadding*6, 'ROCKET PATROL', menuConfig2).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize*3 + borderPadding*5, 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
      menuConfig.backgroundColor = '#00FF00';
      menuConfig.color = '#000';
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize*4 + borderPadding*6, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);

      // define keys
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
   }
   update() {
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
         // easy mode
         game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
         }
         this.sound.play('sfx_select');
         this.scene.start('playScene');    
      }
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
         // hard mode
         game.settings = {
            spaceshipSpeed: 5,
            gameTimer: 45000    
         }
         this.sound.play('sfx_select');
         this.scene.start('playScene');    
      }
   }
}
