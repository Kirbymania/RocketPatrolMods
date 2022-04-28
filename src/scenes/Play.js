class Play extends Phaser.Scene {
   constructor() {
      super("playScene");
   }

   preload() {
      // load images/tile sprites
      this.load.image('rocket', './assets/rocket.png');
      this.load.image('spaceship', './assets/spaceship.png');
      this.load.image('spaceshipfire', './assets/spaceshipfire.png');
      this.load.image('ufo', './assets/spaceship2.png');
      this.load.image('starfield', './assets/starfield.png');
      this.load.image('planets', './assets/planets.png');
      // load spritesheet
      this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
      // load bgm
      this.load.audio('bgm', ['./assets/bensound-dreams.mp3']);
      // credit to: https://www.bensound.com/royalty-free-music/electronica
   }
   create() {
      // play music
      this.music = game.sound.add('bgm', {loop: true});
      this.music.play();

      // place tile sprite
      this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0).setScrollFactor(0);
      this.planets = this.add.tileSprite(0, 0, 640, 480, 'planets').setOrigin(0, 0).setScrollFactor(0);

      // green UI background
      this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
      // white borders
      this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

      this.anims.create({
         key: 'exhaust',
         frames: [
            {key: 'spaceship'},
            {key: 'spaceshipfire'}
         ],
         frameRate: 5,
         repeat: -1
      });     

      // add rocket (p1)
      this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
      // add spaceships (x3)
      this.value = Phaser.Math.Between(1, 2);
      this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, this.value, 30).setOrigin(0, 0).play('exhaust');
      this.value = Phaser.Math.Between(1, 2);
      this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, this.value, 20).setOrigin(0,0).play('exhaust');
      this.value = Phaser.Math.Between(1, 2);
      this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, this.value, 10).setOrigin(0,0).play('exhaust');
      this.ufo = new Spaceship2(this, game.config.width, borderUISize*3 + borderPadding*4, 'ufo', 0, 50).setOrigin(0,0);

      // define keys
      keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

      // animation config
      this.anims.create({
         key: 'explode',
         frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
         frameRate: 30
      });

      // initialize score
      this.p1Score = 0;
      // display score
      let scoreConfig = {
         fontFamily: 'Courier',
         fontSize: '28px',
         backgroundColor: '#F3B141',
         color: '#843605',
         align: 'right',
         padding: {
         top: 5,
         bottom: 5,
         },
         fixedWidth: 100
      }
      this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

      // initialize hiscore
      this.hiscore = 0;
      // display score
      let hiscoreConfig = {
         fontFamily: 'Courier',
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
      this.hiscoreLeft = this.add.text(borderUISize + borderPadding*15, borderUISize + borderPadding*2, "Hi: " + this.hiscore, hiscoreConfig);

      // GAME OVER flag
      this.gameOver = false;

      // 60-second play clock
      scoreConfig.fixedWidth = 0;
      this.clock = this.time.delayedCall(60000, () => {
         this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
         this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
         this.gameOver = true;
      }, null, this);

      let fireConfig = {
         fontFamily: 'Courier',
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
      this.firing = this.add.text(borderUISize + borderPadding*35, borderUISize + borderPadding*2, 'FIRE', fireConfig);
      this.firing.visible = false;
   }

   update() {
      // update hi score
      this.hiscoreLeft.text = "High: " + localStorage.getItem("hiscore");
      if (localStorage.getItem("hiscore") < this.p1Score) {
         localStorage.setItem("hiscore", this.p1Score);
      }      

      // display for hide FIRE UI
      if (this.p1Rocket.isFiring == true){
         this.firing.visible = true;
      }
      else {
         this.firing.visible = false;
      }

      // check key input for restart
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
         this.scene.restart();
      }

      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
         this.scene.start("menuScene");
      }

      // scrolling backgrounds
      this.starfield.tilePositionX -= 0.25;
      this.planets.tilePositionX -= 0.5;


      if (!this.gameOver) {               
         this.p1Rocket.update();         // update rocket sprite
         this.ship01.update();           // update spaceships (x3)
         this.ship02.update();
         this.ship03.update();
         this.ufo.update();
      } 

      // check collisions
      if(this.checkCollision(this.p1Rocket, this.ship03)) {
         this.p1Rocket.reset();
         this.shipExplode(this.ship03);   
      }
      if (this.checkCollision(this.p1Rocket, this.ship02)) {
         this.p1Rocket.reset();
         this.shipExplode(this.ship02);
      }
      if (this.checkCollision(this.p1Rocket, this.ship01)) {
         this.p1Rocket.reset();
         this.shipExplode(this.ship01);
      }
      if (this.checkCollision(this.p1Rocket, this.ufo)) {
         this.p1Rocket.reset();
         this.shipExplode(this.ufo);
      }
   }

   checkCollision(rocket, ship) {
      // simple AABB checking
      if (rocket.x < ship.x + ship.width && 
         rocket.x + rocket.width > ship.x && 
         rocket.y < ship.y + ship.height &&
         rocket.height + rocket.y > ship. y) {
            return true;
      } else {
         return false;
      }
   }
   shipExplode(ship) {
      // temporarily hide ship
      ship.alpha = 0;
      // create explosion sprite at ship's position
      let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
      boom.anims.play('explode');             // play explode animation
      boom.on('animationcomplete', () => {    // callback after anim completes
        ship.reset();                         // reset ship position
        ship.alpha = 1;                       // make ship visible again
        boom.destroy();                       // remove explosion sprite
      });
      // score add and repaint
      this.p1Score += ship.points;
      this.scoreLeft.text = this.p1Score; 
      this.sound.play('sfx_explosion');
   }
}
