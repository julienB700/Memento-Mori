//import { Mob as Mob} from "./Mob.js"

export class Village extends Phaser.Scene {
    constructor() {
        super("Village");
        this.player_invulnerable = false;
        this.CanShoot = true;
        this.CanJump = true;
        this.CDDash = true;
        this.HPbar= 5;
        this.CanSummon = true;
        this.HP = 5;
        
    }
    
    preload() {

        this.load.audio('Village', 'assets/Musics/Village.mp3')

        this.load.tilemapTiledJSON("Village","assets/maps/VILLAGE.json");
        this.load.image("Background","assets/maps/Background-Village.png");
        this.load.image("phaser_assets", "assets/maps/tileset1.png");

        this.load.spritesheet('player','assets/Sprites/Player.png',
           { frameWidth: 64, frameHeight: 80 });

        this.load.spritesheet('Orb','assets/Sprites/OrbSimple.png',
           { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('SummonSprites','assets/Sprites/SummonSprites.png',
           { frameWidth: 64, frameHeight: 64});

        this.load.spritesheet('Transi','assets/Sprites/Transi.png',
            { frameWidth: 64, frameHeight: 80 });

        this.load.spritesheet('Dash', 'assets/Sprites/Dash.png',
            { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('HP', 'assets/Sprites/UIHP-sheet.png',
            { frameWidth: 898, frameHeight: 448});

        this.load.spritesheet('KingIdle', 'assets/Sprites/KingIdle.png',
            { frameWidth: 160, frameHeight: 111});
        
        this.load.spritesheet('CoupDeFaux', 'assets/Sprites/ScytheHit.png',
            { frameWidth: 64, frameHeight: 64 });

        this.load.image("SpriteHitBox", "assets/Sprites/SpriteHitBox.png");

    }


    create() {

        this.clavier = this.input.keyboard.addKeys('K,L,M,Z,O,Q,D,E,SPACE,SHIFT');

        this.physics.world.setBounds(0, 0, 50*32, 50*32);
        
        this.add.image(800, 800,"Background");

        var musique = this.sound.add('Village', { loop: false });
            // Joue la musique
            musique.play();


        const carteDuNiveau = this.add.tilemap("Village");        
        const tileset = carteDuNiveau.addTilesetImage("tileset","phaser_assets");
        const Sol = carteDuNiveau.createLayer('Sol',tileset);
        Sol.setCollisionByExclusion(-1, true);

        //const CalqueDeMobs = carteDuNiveau.getObjectLayer('Mobs')
        //const MobGroupe = this.physics.add.group();
        //CalqueDeMobs.objects.forEach(obj => {
        //    MobGroupe.add(new Mob (this, obj.x, obj.y));
        //});
        



        this.player = this.physics.add.sprite(1*32, 12*32,"player").setSize(20,50).setOffset(30,20);
        this.player.setCollideWorldBounds(true);

        this.cameras.main.zoom = 1;
        this.cameras.main.startFollow(this.player); 
        this.physics.add.collider(this.player, Sol);

        //ORBE
        this.Orbe = this.physics.add.group({ allowGravity : false, collideWorldBounds: false});
        this.physics.add.collider(this.Orbe, Sol,function(Orbe,Sol) {
        Orbe.destroy();
        });
    
        //TRANSITION
        this.transition = this.physics.add.group({ allowGravity : false, collideWorldBounds: true});
        this.SpritesTransition = this.transition.create(49*32, 14.7*32, 'Transi')

        //OVERLAPPING ET COLLIDER DU PLAYER
        this.physics.add.overlap(this.player, this.SpritesTransition, this.Checkpoint1, null,this);
        this.physics.add.overlap(this.player, this.SpriteHitBox, this.GetHit, null, this);
        this.physics.add.collider(this.Orbe, this.GroupeEnnemi, this.kill, null, this);
        this.physics.add.collider(this.player, this.GroupeEnnemi);
        
        //this.physics.add.collider(this.Orbe, this.EnnemiUn, this.killEnnemiUn, null, this);

        //GROUPE DE SUMMONS
        this.Summon = this.physics.add.group({ allowGravity : false, collideWorldBounds: false});
        this.physics.add.collider(this.Summon, Sol);
        this.SummonHp = 100

        // Hitbox Coucou
        this.SpriteHitBox = this.physics.add.sprite(this.Summon.x, this.Summon.y, 'SpriteHitBox').setSize(1280, 1280);
        this.SpriteHitBox.setOffset(this.Summon.x, this.Summon.y)
        this.SpriteHitBox.setScale(0.5)

        this.physics.add.overlap(this.SpriteHitBox, this.enemie, this.SummonAttaquelemechant, null, this);
        
        //GROUPE ENEMIE
        this.enemie = this.physics.add.sprite(20*32, 3*32, 'enemie1').setSize(20,50).setOffset(30,20);
        this.physics.add.collider(this.GroupeEnnemi, this.GroupeEnnemi,);
        this.GroupeEnnemi = this.physics.add.group({ immovable: true, allowGravity: false })
        this.EnnemiUn = this.GroupeEnnemi.create( 16 * 32 , 3* 32, 'enemie1');


        this.SpriteHitBox = this.physics.add.sprite(7*32, 12*32, 'SpriteHitBox').setImmovable(true);
        this.SpriteHitBox.body.setAllowGravity(false);

    
        //PLAYER

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

        //ORBE
        this.anims.create({
            key: 'Orbanim',
            frames: this.anims.generateFrameNumbers('Orb', { start: 0, end:6}),
            frameRate: 8,
            repeat: 0
        
        });
        //SUMMON'S ANIM

        this.anims.create({
            key: 'Summon',
            frames: this.anims.generateFrameNumbers('SummonsSprites', {start:0,end:5}),
            frameRate: 10,
            repeat: -1
        });
///////////////////////////////////////////////////////////////////
        this.HPbar = this.add.sprite(449, 224, "HP").setScrollFactor(0);


        //UIHP
        this.anims.create({
            key: 'vie0',
            frames: this.anims.generateFrameNumbers('HP', { start: 5, end: 5 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'vie1',
            frames: this.anims.generateFrameNumbers('HP', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'vie2',
            frames: this.anims.generateFrameNumbers('HP', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'vie3',
            frames: this.anims.generateFrameNumbers('HP', { start: 2, end: 2 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'vie4',
            frames: this.anims.generateFrameNumbers('HP', { start: 3, end: 3 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'vie5',
            frames: this.anims.generateFrameNumbers('HP', { start: 4, end:4 }),
            frameRate: 1,
            repeat: -1
        });

        //Transition
        this.anims.create({
            key: 'Transi',
            frames: this.anims.generateFrameNumbers('Transi', {start:0,end:7}),
            frameRate: 10,
            repeat: -1
        });

    }

    //FIN CREATE


    handlePlayerEnemyCollision() {
        if (this.player_invulnerable == false) {this.hp -= 1 ; console.log("- 1 HP");
        this.player_invulnerable = true;
        this.sleep(1000).then(() => {

            setTimeout(()=>{
            console.log("testHit")
            this.player_invulnerable= false
            },1000);
            }
            )}
    
        if (this.hp === 0) {
            this.player.setTint(0xff0000)
            this.handlePlayerDeath();
        }
       
    }  

    handlePlayerDeath(HP){
        if (HP == 0)
            this.scene.start('Startscreen')
    };

    update() {
        console.log(this.HP);

        
        //if (HP == 0) { this.HPbar.anims.play("vie0") }
        //if (HP == 1) { this.HPbar.anims.play("vie1") }
        //if (HP == 2) { this.HPbar.anims.play("vie2") }
        //if (HP == 3) { this.HPbar.anims.play("vie3") }
        //if (HP == 4) { this.HPbar.anims.play("vie4") }
        //if (HP == 5) { this.HPbar.anims.play("vie5") }
        //if (HP <= 0) {
        //    this.scene.start("Startscreen")
        //}


        if (this.clavier.O.isDown && this.CanShoot == true) {
            if (this.clavier.D.isDown) {
                this.Orbe.create(this.player.x + 50, this.player.y, "Orb").setScale(0.5).setVelocityX(475);
            }
            else if (this.clavier.Q.isDown) {
                this.Orbe.create(this.player.x - 50, this.player.y, "Orb").setScale(0.5).setVelocityX(- 475);
            }
            else if (this.clavier.Z.isDown) {
                this.Orbe.create(this.player.x, this.player.y - 50, "Orb").setScale(0.5).setVelocityY(-475);
            }
            else if (this.clavier.O.isDown) {
                this.Orbe.create(this.player.x + 50, this.player.y, "Orb").setScale(0.5).setVelocityX(475);
            }
        
            this.CanShoot = false;
            setTimeout(() => {
                this.CanShoot = true;
            }, 100);
        }
        this.Orbe.getChildren().forEach(function (child) {
            child.anims.play('Orbanim', true);
            this.nombreorbes += 1
        }, this)


        if (this.clavier.M.isDown && this.CanSummon == true) {
            if (this.clavier.D.isDown) {
                this.Summon.create(this.player.x + 50, this.player.y, "SummonSprites");
            }
            else if (this.clavier.Q.isDown) {
                this.Summon.create(this.player.x - 50, this.player.y, "SummonSprites");
            }
            else if (this.clavier.M.isDown) {
                this.Summon.create(this.player.x + 50, this.player.y, "SummonSprites");
            }
            this.CanSummon = false;
            setTimeout(() => {
                this.CanSummon = true;
            }, 500);
        }

        this.Summon.getChildren().forEach(function (child) {
            child.anims.play('SummonSprites', true);
        }, this);
        //SHOOT
   
         this.transition.children.each(function(Transition) {
             Transition.anims.play("Transi", true)
             }, this);

             if(this.player.body.blocked.down){
                this.CanJump = true;
                
            }
            if (this.clavier.Q.isDown) {
            this.player.setVelocityX(-160)
            this.player.anims.play('left', true)
            if (this.clavier.SHIFT.isDown && this.CDDash == true && this.clavier.Q.isDown) {
                this.player.setVelocityX(-800)
                this.player.anims.play('DashanimGauche', true)
                this.CDDash == false;
                setTimeout(() => {
                    this.CDDash = false
                }, 350);
                setTimeout(() => {
                    this.CDDash = true
                }, 2000);
            }

        }
        else if (this.clavier.D.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true)
            if (this.clavier.SHIFT.isDown && this.CDDash == true && this.clavier.D.isDown) {
                this.player.setVelocityX(800)
                this.player.anims.play('DashanimDroite', true)
                this.CDDash == false;
                setTimeout(() => {
                    this.CDDash = false
                }, 350);
                setTimeout(() => {
                    this.CDDash = true
                }, 2000);

            }
        }
        else if (this.clavier.Z.isDown && this.CDDash == true && this.clavier.SHIFT.isDown){
            this.player.setVelocityY(-500)
            this.player.anims.play('DashanimHaut', true)
            this.CDDash == false;
                setTimeout(() => {
                    this.CDDash = false
                }, 150);
                setTimeout(() => {
                    this.CDDash = true
                }, 3000);
        }
            else {
                this.player.setVelocityX(0)
            }
            
            if (this.clavier.SPACE.isDown && this.CanJump == true ) {
                this.player.setVelocityY(-500);
                this.CanJump = false;
                setTimeout(() => {
                    this.CanJump = true;
                }, 1000);
            }
    
     }

    SummonAttaquelemechant(Summon, SpriteHitBox) {
        this.SummonFollow = true;
    }

    GetHit(){
        if(this.HP == 5){
            setTimeout(() => {
                this.HP -= 1
                this.player_invulnerable = true;
            }, 1000);
            this.HPbar.setTexture('vie4');
        }
        else if(this.HP == 4){
            setTimeout(() => {
                this.HP -= 1;
            }, 1000);
            this.HPbar.setTexture('vie3');
        }
        else if(this.HP == 3){
            setTimeout(() => {
                this.HP -= 1;
            }, 1000);
            this.HPbar.setTexture('vie2');
        }
        else if(this.HP == 2){
            setTimeout(() => {
                this.HP -= 1;
            }, 1000);
            this.HPbar.setTexture('vie1');
        }
        else if(this.HP == 1){
            setTimeout(() => {
                this.HP -= 1;
            }, 1000);
        }
    }
    handlePlayerDeath(HP){
        if (HP == 0)
            this.scene.start('Menu')
    };

    //Checkpoint1(){
    //    console.log("foret")
    //    this.scene.start("Foret",{x: 0 * 32, y: 25 * 32})
    //}
    
}