var nombreorbes = 0;
var CDDash = true;
var HPmax = 100;
var HP = 100;
var degat = 34;
var vitessedep = 1;
var vitessedatk = 1;
var speedatk = 1;
var CanJump = true;

class Cimetière extends Phaser.Scene {
    constructor() {
        super("Cimetière");
        this.player_invulnerable = false;
        this.CanShoot = true;
    }
    preload() {
        this.load.audio('Village', 'assets/Musics/Village.mp3')
        this.load.tilemapTiledJSON("Village","assets/maps/Cimetière.json");
        this.load.image("phaser_assets", "assets/maps/tileset1.png");
        this.load.spritesheet('player','assets/Sprites/Player.png',
        { frameWidth: 64, frameHeight: 80 });
        this.load.spritesheet('Orb','assets/Sprites/OrbSimple.png',
        { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('Transi','assets/Sprites/Transi.png',
        { frameWidth: 64, frameHeight: 80 });
    }


    create() {

        var musique = this.sound.add('Village', { loop: false });
            // Joue la musique
            musique.play();

        const carteDuNiveau = this.add.tilemap("Cimetière");        
        const tileset = carteDuNiveau.addTilesetImage("tileset","phaser_assets");

        const bg2 = carteDuNiveau.createLayer('bg2',tileset);
        const bg1 = carteDuNiveau.createLayer('bg1',tileset);
 
        const Sol = carteDuNiveau.createLayer('Sol',tileset);
        
        
        Sol.setCollisionByExclusion(-1, true);

        this.player = this.physics.add.sprite(1*32, 20*32, 'player').setSize(20,50).setOffset(30,20);
        this.physics.world.setBounds(0, 0, 50*32, 50*32)
        this.player.setCollideWorldBounds(true)
        
        this.cameras.main.zoom = 1;
        this.cameras.main.startFollow(this.player); 
        this.physics.add.collider(this.player, Sol);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.clavier = this.input.keyboard.addKeys('Z,O,Q,D,E,SPACE,SHIFT');

        this.Orbe = this.physics.add.group({ allowGravity : false, collideWorldBounds: false});
        this.physics.add.collider(this.Orbe, Sol);

        this.transition = this.physics.add.group({ allowGravity : false, collideWorldBounds: true})
        this.SpritesTransition = this.transition.create(48*32, 22.7*32, 'Transi')
        //this.physics.add.collider(this.Orbe, this.EnnemiUn, this.killEnnemiUn, null, this);

        this.anims.create({
            key: 'Transi',
            frames: this.anims.generateFrameNumbers('Transi', {start:0,end:7}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end:6 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 7, end:13 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'Orbanim',
            frames: this.anims.generateFrameNumbers('Orb', { start: 0, end:6}),
            frameRate: 8,
            repeat: 0
        });
        this.physics.add.overlap(this.player, this.transition, this.Checkpoint1, null, this);
    }
    
        
    update() {
        if (this.clavier.SPACE.isDown && this.player.body.blocked.down){
            //si touche haut appuyée ET que le perso touche le sol
            this.player.setVelocityY(-280); //alors vitesse verticale négative
          
            // hero can't jump anymore
            this.canJump = false;
        
            // hero is not on the wall anymore
            //this.onWallDroit = false;
            //this.onWallGauche = false;
        
        }
        if(this.player.body.blocked.down){
        
            // hero can jump
            this.canJump = true;
        
            // hero not on the wall
            //this.onWallDroit = false;
            //this.onWallGauche = false;
        }
        if (this.clavier.Q.isDown) {
            this.player.setVelocityX(-160)
            this.player.anims.play('left', true)
            if (this.clavier.SHIFT.isDown && CDDash == true) {
                this.player.setVelocityX(-800)
                setTimeout(() => {
                    CDDash = true
                }, 3000);
            }

        }
        else if (this.clavier.D.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true)
            if (this.clavier.SHIFT.isDown && CDDash == true) {
                this.player.setVelocityX(800)
                setTimeout(() => {
                    CDDash = true
                }, 3000);
            }
        }
        else {
            this.player.setVelocityX(0)
        }
        
        if (this.clavier.SPACE.isDown && this.CanJump == true ) {
            this.player.setVelocityY(-1000);
            this.CanJump = false;
            setTimeout(() => {
                this.CanJump = true;
            }, 500);
        }

        //BARRE DE VIE

        //if (HP == 0) { this.HPbar.anims.play("vie1") }
        //if (HP == 25) { this.HPbar.anims.play("vie2") }
        //if (HP == 50) { this.HPbar.anims.play("vie3") }
        //if (HP == 75) { this.HPbar.anims.play("vie4") }
        //if (HP == 100) { this.HPbar.anims.play("vie5") }

        //SHOOT
        if (this.clavier.O.isDown && this.CanShoot == true) {
            if (this.clavier.D.isDown) {
                this.Orbe.create(this.player.x + 50, this.player.y, "Orb").setVelocityX(475*speedatk);
            }
            else if (this.clavier.Q.isDown) {
                this.Orbe.create(this.player.x - 50, this.player.y, "Orb").setVelocityX(- 475*speedatk);
            }
            //else if (this.cur.Z.isDown) {
            //    this.Orbe.create(this.player.x, this.player.y - 50, "Orb").setVelocityY(-475 * speedatk);
            //}
            else if (this.clavier.Z.isDown) {
                this.Orbe.create(this.player.x, this.player.y - 50, "Orb").setVelocityY(-475*speedatk);
            }
            else if (this.clavier.O.isDown) {
                this.Orbe.create(this.player.x + 50, this.player.y, "Orb").setVelocityX(475*speedatk);
            }
            this.CanShoot = false;
            setTimeout(() => {
                this.CanShoot = true;
            }, 500 * vitessedatk);
        }
        this.Orbe.getChildren().forEach(function (child) {
            child.anims.play('Orbanim', true);
            nombreorbes += 1
        }, this)

        if (HP <= 0) {
            this.scene.start("fin")
        }
        this.transition.children.each(function(SpriteFire) {
            SpriteFire.anims.play("SpriteFire", true)
            }, this);
    }
    Checkpoint1(){
        this.scene.start("Checkpoint1",{x: 1 * 32, y: 22 * 32})
    }

}