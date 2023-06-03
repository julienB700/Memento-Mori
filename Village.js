//import { Mob as Mob} from "./Mob.js"
const WIDTH = 896;
const HEIGHT = 448;

var spawnx;
var spawny;

export class Village extends Phaser.Scene {
    constructor() {
        super("Village");
        this.player_invulnerable = true;

        this.enemy_invulnerable = false;
        this.CanShoot = true;
        this.CanShootourrelle = true;
        this.CanJump = true;
        this.CanHit = true;
        this.CanHitMelee = true;
        this.CDDash = true;
        this.CanSummon = true;
        
    }
    init(data) {
        spawnx = data.x;
        spawny = data.y;
    }
    preload() {

        this.load.tilemapTiledJSON("Village", "assets/maps/VILLAGE.json");
        this.load.image("Background_Village", "assets/maps/Background-Village.png");
        this.load.image("phaser_assets", "assets/maps/tileset1.png");
        this.load.audio('Village', 'assets/Musics/Village.mp3')
        this.load.audio('Deathtalk', 'assets/Audio/Death1rst.mp3')
        this.load.audio('Attack', 'assets/Audio/Attacksound.wav')


        this.load.spritesheet('Souls', 'assets/Sprites/SoulsPickups.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Potion', 'assets/Sprites/PotionDeSoin.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('FEU_VERT', 'assets/Sprites/Feu_Vert.png',
            { frameWidth: 32, frameHeight: 30*32 });
        this.load.spritesheet('Batanime', 'assets/Sprites/Bat.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Maganime', 'assets/Sprites/Mage_Final.png',
            { frameWidth: 64, frameHeight: 80 });
        this.load.spritesheet('Zombanime', 'assets/Sprites/Zombie.png',
            { frameWidth: 42, frameHeight: 74 });


        this.load.spritesheet('Dash', 'assets/Sprites/Dash.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player', 'assets/Sprites/Player.png',
            { frameWidth: 64, frameHeight: 80 });
        this.load.spritesheet('Orb', 'assets/Sprites/OrbSimple.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('Transi', 'assets/Sprites/Transi.png',
            { frameWidth: 64, frameHeight: 80 });
        this.load.spritesheet('SummonSprites', 'assets/Sprites/SummonSprites.png',
            { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('MyInterface', 'assets/Sprites/UI-5-vie.png', 
            { frameWidth: 237, frameHeight: 86 });
        this.load.spritesheet('CoupDeFaux', 'assets/Sprites/ScytheHit.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('CoupDeFauxLeft', 'assets/Sprites/ScytheHitLeft.png',
            { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet ('Scythpickup', 'assets/Sprites/ScythePickup.png',
            {frameWidth: 64, frameHeight: 64 });

        
    }

    create() {

        this.clavier = this.input.keyboard.createCursorKeys('up,down,left,right');
        this.clavier = this.input.keyboard.addKeys('P,K,L,M,Z,O,Q,D,E,SPACE,SHIFT,UP,DOWN,LEFT,RIGHT');
        this.add.image(800, 800, "Background_Village");
        this.physics.world.setBounds(0, 0, 50*32, 50*32);

        var musique = this.sound.add('Village', { loop: false });
        // Joue la musique
        musique.play();
        // Définit la musique en pause
        var musique = this.sound.add('Deathtalk', { loop: false });
        // Joue la musique
        musique.play();

       // Nouveau ///////////////////////////////////// FEU VERT ////////////////////////////////////////////////////////

        this.anims.create({
            key: 'Feu_vert',
            frames: this.anims.generateFrameNumbers('FEU_VERT', { start: 0, end: 14 }),
            frameRate: 10,
            repeat: -1
        });


        this.feuvertgroup = this.physics.add.group({ allowGravity: false, collideWorldBounds: false });

        this.feuvertgroup.create(16, 35*32, "FEU_VERT");

        const msldfmlkdsfklmds = this.physics.add.sprite(49*32, 35*32+16, "FEU_VERT").setFlipX(true);

        this.feuvertgroup.add(msldfmlkdsfklmds);


        this.feuvertgroup.children.each(feuvert => {
            feuvert.anims.play("Feu_vert");
        })

        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        const carteDuNiveau = this.add.tilemap("Village");
        const tileset = carteDuNiveau.addTilesetImage("tileset", "phaser_assets");
        const Sol = carteDuNiveau.createLayer('Sol', tileset);
        Sol.setCollisionByExclusion(-1, true);
    
    
        /////////////////////////// PLAYER ////////////////////////////////////////

        this.player = this.physics.add.sprite(1*32, 12*32,"player").setSize(20,50).setOffset(30,20);
        this.player.setCollideWorldBounds(true);

        this.cameras.main.zoom = 0.8;
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, Sol);

        ///////////////////////////////////////// Potion ////////////////////////////////////////////////////////////////////
        this.anims.create({
            key: 'potionanim',
            frames: this.anims.generateFrameNumbers('Potion', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.Potion = this.physics.add.group({ allowGravity: false, collideWorldBounds: false })
        
        console.log(carteDuNiveau)
        carteDuNiveau.getObjectLayer('Potions').objects.forEach((potion) => {
            
            this.current_potion =  this.Potion.create(potion.x,potion.y,'Potion')
            
            this.current_potion.play('potionanim')
            this.physics.add.overlap(this.player, this.Potion, this.CEFAIRESOIGNERCESTCOOL, null, this);
          });
          
        ///////////////////////////////////////// SOULS ////////////////////////////////////////////////////////////////////

        this.anims.create({
            key: 'SoulsAnim',
            frames: this.anims.generateFrameNumbers('Souls', { start: 0, end: 12 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.Soul = this.physics.add.group({ allowGravity: false, collideWorldBounds: false })
        
        console.log(carteDuNiveau)
        carteDuNiveau.getObjectLayer('Souls').objects.forEach((Soul) => {

            this.current_Soul =  this.Soul.create(Soul.x,Soul.y,'Souls')

            this.current_Soul.play('SoulsAnim')
            this.physics.add.overlap(this.player, this.Soul, this.CEFAIRESOIGNERCESTCOOL, null, this);
          });

        ///////////////////////////////////////// ORBE ////////////////////////////////////////////////////////////////////

        this.Orbe = this.physics.add.group({ allowGravity: false, collideWorldBounds: false });
        this.physics.add.collider(this.Orbe, Sol, function (Orbe, Sol) {
            Orbe.destroy();
        });


        ///////////////////////////////////// OBSTACLE //////////////

        this.obstacles = this.physics.add.group();
        const obstacles = carteDuNiveau.getObjectLayer("Obstacles");
        obstacles.objects.forEach(obstacle => {
            this.obstacles.create(obstacle.x, obstacle.y, "Obstacle");
            console.log(obstacle)
        })

        this.obstacles.children.each(obstacle => {
            
        })

        ////////////////////////////////////////////// LA FAUX /////////////////////////////////////////////////////////////

        this.Scyth = this.physics.add.group({ allowGravity: false, collideWorldBounds: false });
        this.ScythLeft = this.physics.add.group({ allowGravity: false, collideWorldBounds: false });

        /////////////////////////////////////////////// TRANSITION //////////////////////////////////////////////////////

        

        /////////////////////////////////////////////// SPAWN MONSTRE //////////////////////////////////////////////////////

        /////////////////////////////////////////////// SPAWN BAT //////////////////////////////////////////////////////
        this.Tir = this.physics.add.group()
        this.physics.add.overlap(this.player, this.Tir , this.PRENDREDESDEGATSCAFAITMAL, null, this);
        
        this.anims.create({
            key: 'Maganim',
            frames: this.anims.generateFrameNumbers('Maganime', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.Maganime = this.physics.add.sprite(41 * 32, 39 * 32, "Maganim").setSize(30,70).setOffset(10,10);
        this.Maganime.type = "Mage"

        this.anims.create({
            key: 'Batanim',
            frames: this.anims.generateFrameNumbers('Batanime', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        });

        this.BAT = this.physics.add.sprite(15 * 32, 8 * 32, "Batanim");
        this.BAT.type = "Bat"

        this.BAT1 = this.physics.add.sprite(44 * 32, 6 * 32, "Batanim");
        this.BAT1.type = "Bat"

        this.BAT2 = this.physics.add.sprite(30 * 32, 9 * 32, "Batanim");
        this.BAT2.type = "Bat"

        this.BAT3 = this.physics.add.sprite(23 * 32, 19 * 32, "Batanim");
        this.BAT3.type = "Bat"

        this.BAT4 = this.physics.add.sprite(12 * 32, 22 * 32, "Batanim");
        this.BAT4.type = "Bat"

        this.BAT5 = this.physics.add.sprite(6 * 32, 28 * 32, "Batanim");
        this.BAT5.type = "Bat"

        this.BAT6 = this.physics.add.sprite(20 * 32, 36 * 32, "Batanim");
        this.BAT6.type = "Bat"

        this.BAT7 = this.physics.add.sprite(7 * 32, 40* 32, "Batanim");
        this.BAT7.type = "Bat"

        this.BAT8 = this.physics.add.sprite(19 * 32, 44 * 32, "Batanim");
        this.BAT8.type = "Bat"

        this.BAT9 = this.physics.add.sprite(32 * 32, 43 * 32, "Batanim");
        this.BAT9.type = "Bat"

        this.BAT10 = this.physics.add.sprite(37 * 32, 34 * 32, "Batanim");
        this.BAT10.type = "Bat"

        /////////////////////////////////////////////// SPAWN ZOMBIE //////////////////////////////////////////////////////

        this.anims.create({
            key: 'Zombanim',
            frames: this.anims.generateFrameNumbers('Zombanime', { start: 0, end: 3 }),
            
            frameRate: 5,
            repeat: -1
        });

        this.ZOMBIE = this.physics.add.sprite(14 * 32, 15 * 32, "Zombanim").setSize(30,65).setOffset(10,10);
        this.ZOMBIE.type = "Zombie"

        this.ZOMBIE1 = this.physics.add.sprite(21 * 32, 15 * 32, "Zombanim").setSize(30,65).setOffset(10,10);
        this.ZOMBIE1.type = "Zombie"

        this.ZOMBIE2 = this.physics.add.sprite(28 * 32, 15 * 32, "Zombanim").setSize(30,65).setOffset(10,10);
        this.ZOMBIE2.type = "Zombie"

        this.ZOMBIE3 = this.physics.add.sprite(36* 32, 15 * 32, "Zombanim").setSize(30,65).setOffset(10,10);
        this.ZOMBIE3.type = "Zombie"

        this.ZOMBIE4 = this.physics.add.sprite(9* 32, 24 * 32, "Zombanim").setSize(30,65).setOffset(10,10)
        this.ZOMBIE4.type = "Zombie"
        
        this.ZOMBIE5 = this.physics.add.sprite(14* 32, 31 * 32, "Zombanim").setSize(30,65).setOffset(10,10);
        this.ZOMBIE5.type = "Zombie"
        
        this.ZOMBIE6 = this.physics.add.sprite(190* 32, 45* 32, "Zombanim").setSize(30,65).setOffset(10,10);
        this.ZOMBIE6.type = "Zombie"

        this.ZOMBIE7 = this.physics.add.sprite(35* 32, 45* 32, "Zombanim").setSize(30,65).setOffset(10,10);
        this.ZOMBIE7.type = "Zombie"

        this.ZOMBIE8 = this.physics.add.sprite(42* 32,  31* 32, "Zombanim").setSize(30,65).setOffset(10,10);
        this.ZOMBIE8.type = "Zombie"

        this.ZOMBIE9 = this.physics.add.sprite(46* 32,  45* 32, "Zombanim").setSize(30,65).setOffset(10,10);
        this.ZOMBIE9.type = "Zombie"

        this.ZOMBIE10 = this.physics.add.sprite(48* 32, 41* 32, "Zombanim").setSize(30,65).setOffset(10,10);
        this.ZOMBIE10.type = "Zombie"

        this.ZOMBIE11 = this.physics.add.sprite(48* 32,  29* 32, "Zombanim").setSize(30,65).setOffset(10,10);
        this.ZOMBIE11.type = "Zombie"

        this.ZOMBIE12 = this.physics.add.sprite(43* 32,  23* 32, "Zombanim").setSize(30,65).setOffset(10,10);
        this.ZOMBIE12.type = "Zombie"

        
        /////////////////////////////////////////////// SPAWN GROUPE //////////////////////////////////////////////////////

        this.enemygroup = this.physics.add.group();
        
        this.enemygroup.add(this.Maganime);

        this.enemygroup.add(this.BAT);
        this.enemygroup.add(this.BAT1);
        this.enemygroup.add(this.BAT2);
        this.enemygroup.add(this.BAT3);
        this.enemygroup.add(this.BAT4);
        this.enemygroup.add(this.BAT5);
        this.enemygroup.add(this.BAT6);
        this.enemygroup.add(this.BAT7);
        this.enemygroup.add(this.BAT8);
        this.enemygroup.add(this.BAT9);
        this.enemygroup.add(this.BAT10);

        this.enemygroup.add(this.ZOMBIE);
        this.enemygroup.add(this.ZOMBIE1);
        this.enemygroup.add(this.ZOMBIE2);
        this.enemygroup.add(this.ZOMBIE3);
        this.enemygroup.add(this.ZOMBIE4);
        this.enemygroup.add(this.ZOMBIE5);
        this.enemygroup.add(this.ZOMBIE6);
        this.enemygroup.add(this.ZOMBIE7);
        this.enemygroup.add(this.ZOMBIE8);
        this.enemygroup.add(this.ZOMBIE9);
        this.enemygroup.add(this.ZOMBIE10);
        this.enemygroup.add(this.ZOMBIE11);
        this.enemygroup.add(this.ZOMBIE12);


        this.enemygroup.getChildren().forEach(function (child) {
            child.setCollideWorldBounds(true);
            this.physics.add.collider(child, Sol);
            this.physics.add.overlap(this.player, child, this.PRENDREDESDEGATSCAFAITMAL,null,this);
            this.physics.add.collider(this.Orbe, child, this.enemyHit,null,this);    
            this.physics.add.overlap(this.Scyth, child, this.enemyHitMelee,null,this);
            this.physics.add.overlap(this.ScythLeft, child, this.enemyHitMelee,null,this);

            if (child.type == "Bat") {
                child.HP = 5;
                child.setGravityY(-700)
                child.anims.play("Batanim");
            }

            else if (child.type == "Zombie") {
                child.HP = 10;
                child.anims.play("Zombanim");
            }

            else if (child.type == "Mage") {
                child.HP = 10;
                child.CanShootourrelle = true;
                child.anims.play("Maganim");
            }
            else if (child.type == "BOSS") {
                child.HP = 50;
                child.CanShootourrelle = true;
            }

            else if (child.type == "BOSSBAT") {
                child.HP = 20; 
                child.setGravityY(-700)
                child.CanShootourrelle = true;
                child.anims.play("Batanim");
            }

        }, this);
    
        //////////////////////////////////////////////////////////////////////////////////////////////////////

        this.mespointsdevie = 5 ;
        this.mespointsdevieText=this.add.text(375,133,this.mespointsdevie,{fontSize:'20px',fill:'#fff'}).setScale(1).setScrollFactor(0);
        
        

        

        this.anims.create({
            key: 'ScythAnim',
            frames: this.anims.generateFrameNumbers('Scythpickup', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });


        /////////////////////////// Animations ////////////////////////////////////////////////////////////////////
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 6 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 7, end: 13 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'HEROATTAQUEGAUCHE',
            frames: this.anims.generateFrameNumbers('player', { start: 16, end: 20 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'HEROATTAQUEDROITE',
            frames: this.anims.generateFrameNumbers('player', { start: 21, end: 25 }),
            frameRate: 8,
            repeat: -1
        });

        ///////////////////////////////////////// ATTAQUES /////////////////////////////////////////////////////////////

        this.anims.create({
            key: 'RightHit',
            frames: this.anims.generateFrameNumbers('CoupDeFaux', { start: 0, end: 7 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'LeftHit',
            frames: this.anims.generateFrameNumbers('CoupDeFauxLeft', { start: 0, end: 7 }),
            frameRate: 20,
            repeat: 0
        });
        ///////////////////////////////////////// ORBANIM ///////////////////////////////////////////////

        this.anims.create({
            key: 'Orbanim',
            frames: this.anims.generateFrameNumbers('Orb', { start: 0, end: 6 }),
            frameRate: 8,
            repeat: 0
        });

        /////////////////////////////////////////// DASHANIMS ///////////////////////////////////////////////

        this.anims.create({
            key: 'DashanimGauche',
            frames: this.anims.generateFrameNumbers('Dash', { start: 5, end: 10 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'DashanimDroite',
            frames: this.anims.generateFrameNumbers('Dash', { start: 0, end: 4 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'DashanimHaut',
            frames: this.anims.generateFrameNumbers('Dash', { start: 11, end: 15 }),
            frameRate: 8,
            repeat: -1
        });


        ////////////////////////////////// UTILISATEUR INTERFACE ///////////////////////////////////////////////

        this.anims.create({
            key: 'vie1',
            frames: this.anims.generateFrameNumbers('MyInterface', { start: 24, end: 31 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'vie2',
            frames: this.anims.generateFrameNumbers('MyInterface', { start: 16, end: 23 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'vie3',
            frames: this.anims.generateFrameNumbers('MyInterface', { start: 8, end: 15 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'vie4',
            frames: this.anims.generateFrameNumbers('MyInterface', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'vie5',
            frames: this.anims.generateFrameNumbers('MyInterface', { start: 32, end: 32 }),
            frameRate: 10,
            repeat: -1
        });

        /////////////////////////// TRANSITION ////////////////////////////////////////
        this.anims.create({
            key: 'Transi',
            frames: this.anims.generateFrameNumbers('Transi', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.transition = this.physics.add.group({ allowGravity : false, collideWorldBounds: true});
        this.SpritesTransition = this.transition.create(49*32, 14.7*32, 'Transi')
        this.physics.add.overlap(this.player, this.transition, this.PROCHAINESCENE,null,this);
        this.SpritesTransition.anims.play('Transi', true)

        this.MyInterface = this.physics.add.sprite(130, 60, "MyInterface").setScale(1).setScrollFactor(0);
        this.MyInterface.body.allowGravity = false;
        this.cameras.main.zoom = 1;


        
    }
    

    /////////////////////////// FIN DU CREATE ////////////////////////////////////////
    PROCHAINESCENE(player, TRANSITION){
        this.scene.start('Foret', {x: 1 * 32, y: 26 * 32});
        }


        update(time, delta) {

            this.mespointsdevieText.setText(this.mespointsdevie);
    
    
            if (this.mespointsdevie === 5) {
                this.MyInterface.anims.play('vie5')
            }
    
            /////////////////////////////////////// ENEMIE A TETE CHERCHEUSE ///////////////////////////////////////////////////
    
            this.enemygroup.getChildren().forEach(function (child) {
    
                if (child.type == "Bat") {
                    var distance = Phaser.Math.Distance.Between(child.x, child.y, this.player.x, this.player.y);
                    if (distance < 300) {
                        child.setVelocityX(this.player.x - child.x)
                        child.setVelocityY(this.player.y - child.y)
                    }
                    else { child.setVelocity(0, 0) }
                }
    
                if (child.type == "Zombie") {
                    var distance = Phaser.Math.Distance.Between(child.x, child.y, this.player.x, this.player.y);
                    if (distance < 300) {
                        child.setVelocityX(this.player.x - child.x)
                        //child.setVelocityY(this.player.y - child.y)
                    }
                    else { child.setVelocity(0, 0) }
                }
    
                if (child.type == "Mage") {
    
    
                    const distance1 = Phaser.Math.Distance.Between(child.x, child.y, this.player.x, this.player.y);
                    if (distance1 < 400) {
    
                        if (child.CanShootourrelle == true) {
                            this.Tir.create(child.x, child.y, "Orb").setScale(0.5,0.5).setVelocityX(this.player.x - child.x).setVelocityY(this.player.y - child.y).body.setAllowGravity(false)
                            child.CanShootourrelle = false
    
                            setTimeout(() => {
                                child.CanShootourrelle = true
                            }, 1000);
                        }
                    }
                }
            }, this);
    
    
    
    
            /////////////////////////////////////// TEST ORBE A TETE CHERCHEUSE ///////////////////////////////////////////////////
    
            /////////////////////////// MOUVEMENT ////////////////////////////////////////
    
            if (this.player.body.blocked.down) {
                this.CanJump = true;
    
            }
            if (this.clavier.Q.isDown) {
                this.player.setVelocityX(-160)
                this.player.anims.play('left', true)
                if (this.clavier.SHIFT.isDown && this.CDDash == true && this.clavier.Q.isDown) {
    
                    this.player.invulnerable = true;
                    this.sleep(100).then(() => {
                        setTimeout(() => {
                            this.player.invulnerable = false
                        }, 1000);
                    }
                    )
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
    
                    this.player.invulnerable = true;
    
                    this.sleep(100).then(() => {
                        setTimeout(() => {
                            this.player.invulnerable = false
                        }, 1000);
                    }
                    )
                    this.player.setVelocityX(800);
                    this.player.anims.play('DashanimDroite', true);
    
                    this.CDDash == false;
                    setTimeout(() => {
                        this.CDDash = false
                    }, 350);
                    setTimeout(() => {
                        this.CDDash = true
                    }, 2000);
    
                }
            }
            else if (this.clavier.Z.isDown && this.CDDash == true && this.clavier.SHIFT.isDown) {
    
                this.player.invulnerable = true;
    
                this.sleep(100).then(() => {
                    setTimeout(() => {
                        this.player.invulnerable = false
                    }, 1000);
                }
                )
    
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
    
            if (this.clavier.SPACE.isDown && this.CanJump == true && this.player.body.blocked.down) {
                this.player.setVelocityY(-500);
                this.CanJump = false;
                setTimeout(() => {
                    this.CanJump = true;
                }, 1000);
            }
    
            ///////////////////////////////////// ORBES ////////////////////////////////////////
    
            if (this.CanShoot == true) {
    
                if (this.clavier.M.isDown && !this.clavier.O.isDown) {
                    this.Orbe.create(this.player.x + 30, this.player.y, "Orb").setScale(0.5).setVelocityX(475);
                    this.player.anims.play('HEROATTAQUEDROITE', true);
                }
                else if (this.clavier.K.isDown && !this.clavier.O.isDown) {
                    this.Orbe.create(this.player.x - 30, this.player.y, "Orb").setScale(0.5).setVelocityX(- 475);
                    this.player.anims.play('HEROATTAQUEGAUCHE', true);
                }
                else if (this.clavier.K.isDown && this.clavier.O.isDown) {
                    this.Orbe.create(this.player.x - 20, this.player.y - 20, "Orb").setScale(0.5).setVelocityX(- 475).setVelocityY(-475);
                }
                else if (this.clavier.O.isDown && !this.clavier.M.isDown && !this.clavier.K.isDown) {
                    this.Orbe.create(this.player.x, this.player.y - 30, "Orb").setScale(0.5).setVelocityY(-475);
                }
                else if (this.clavier.O.isDown && this.clavier.M.isDown) {
                    this.Orbe.create(this.player.x + 30, this.player.y - 30, "Orb").setScale(0.5).setVelocityY(-475).setVelocityX(475);
                }
                else if (this.clavier.L.isDown) {
                    this.Orbe.create(this.player.x, this.player.y, "Orb").setScale(0.5).setVelocityY(+475);
                }
    
                this.CanShoot = false;
    
                setTimeout(() => {
                    this.CanShoot = true;
                }, 100);
            }
            //!this.clavier.RIGHT.isDown && !this.clavier.LEFT.isDown
            //
    
            this.Orbe.getChildren().forEach(function (child) {
                child.anims.play('Orbanim', true);
                this.nombreorbes += 1
            }, this);
    
            /////////////////////////// ATTAQUES CORPS A CORPS A LA FAUX ////////////////////////////////////////
    
            if (this.CanHitMelee == true) {
                
            if (this.clavier.P.isDown && !this.clavier.Q.isDown) {
                if (this.clavier.D.isDown) {
                    this.Scyth.create(this.player.x + 50, this.player.y, "CoupDeFaux")
                    var musique = this.sound.add('Attack', { loop: false });
                    musique.play();
                    console.log("coupdroit")
                }
                this.CanHitMelee = false
                setTimeout(() => {
                    this.CanHitMelee = true;
                }, 500);
                setTimeout(() => {
                    this.Scyth.getChildren()[0].destroy();
                }, 200);
            }
            this.Scyth.getChildren().forEach(function (child) {
                child.anims.play('RightHit', true);
            }, this)
    
            if (this.clavier.P.isDown && !this.clavier.D.isDown) {
                if (this.clavier.Q.isDown) {
                    this.Scyth.create(this.player.x - 50, this.player.y, "CoupDeFauxLeft")
                    var musique = this.sound.add('Attack', { loop: false });
                    musique.play();
                    console.log("coupgauche")
                }
                this.CanHitMelee = false;
                setTimeout(() => {
                    this.CanHitMelee = true;
                }, 500);
                setTimeout(() => {
                    this.Scyth.getChildren()[0].destroy();
                }, 200);
            }
            }
            this.Scyth.getChildren().forEach(function (child) {
            
                child.anims.play('LeftHit', true);
            
            }, this);

            //if (this.clavier.SHIFT.isDown && !this.clavier.Q.isDown && !this.clavier.D.isDown && !this.clavier.Z.isDown) {
            //    this.player_invulnerable = true 
            //    this.player.setTint(0xffff00)
            //}
            //if(this.clavier.Q.isDown || this.clavier.SPACE.isDown || this.clavier.D.isDown){
            //    this.player_invulnerable = false 
            //    this.player.clearTint();
            //}
        }
    
 

        PRENDREDESDEGATSCAFAITMAL(mespointsdevie, enemy) {
            if (!this.player.invulnerable) {
                this.player.setTint(0xff0000);
                this.mespointsdevie -= 1;
                this.cameras.main.shake(100, 0.025);
                //this.GetHit = true; 
                this.player.invulnerable = true;
                if (this.mespointsdevie === 4) {
                    this.MyInterface.anims.play('vie4', true)
                }
                if (this.mespointsdevie === 3) {
                    this.MyInterface.anims.play('vie3', true)
                }
                if (this.mespointsdevie === 2) {
                    this.MyInterface.anims.play('vie2', true)
                }
                if (this.mespointsdevie === 1) {
                    this.MyInterface.anims.play('vie1', true)
                }
    
                if (this.mespointsdevie === 0) {
                    this.player.setTint(0xff0000);
    
                    this.scene.start("Village")
                }
    
                this.sleep(100).then(() => {
                    setTimeout(() => {
                        this.player.invulnerable = false
                        this.player.body.allowGravity = true;
                        this.player.clearTint();
                    }, 1000);
                }
                )
    
            }
        }
        CEFAIRESOIGNERCESTCOOL(player, Potion) {
                this.mespointsdevie += 1;
                this.player.setTint( 0x00CC00 );
                //this.GetHit = true; 
                Potion.destroy();
                this.player.invulnerable = true;
                if (this.mespointsdevie === 5) {
                    this.MyInterface.anims.play('vie5', true)
                }
                if (this.mespointsdevie === 4) {
                    this.MyInterface.anims.play('vie4', true)
                }
                if (this.mespointsdevie === 3) {
                    this.MyInterface.anims.play('vie3', true)
                }
                if (this.mespointsdevie === 2) {
                    this.MyInterface.anims.play('vie2', true)
                }
                if (this.mespointsdevie === 1) {
                    this.MyInterface.anims.play('vie1', true)
                }
                this.sleep(100).then(() => {
                    setTimeout(() => {
                        this.player.clearTint();
                        this.player.invulnerable = false
                        this.player.body.allowGravity = true;
                    }, 500);
                }
                )
            }
    
        sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
        }
    
        ///////////////////////////////////// FIN UPDATE //////////////////////////////////////////////////
    
        enemyHit(enemy, Orbe) {
            
            Orbe.destroy()
            if (enemy.HP >= 0) {
                enemy.HP -= 1;
            }
            else if (enemy.HP <= 0) {
                enemy.destroy()
            }
        };
        
        enemyHitMelee(enemy) {

            if (enemy.HP >= 0 && this.enemy_invulnerable == false) {
                enemy.HP -= 5;
                
                this.enemy_invulnerable = true
                setTimeout(() => {
        
                    this.enemy_invulnerable = false
                }, 200);
            }
            else if (enemy.HP <= 0) {
                //this.Potion.create(this.enemy.x, this.enemy.y, "Soin")
                enemy.destroy()
            }
        };
    

}