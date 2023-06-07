var spawnx;
var spawny;

const WIDTH = 896;
const HEIGHT = 448;

export class Chateau extends Phaser.Scene {
    constructor() {
        super("Chateau");
        this.player_invulnerable = false;
        this.enemy_invulnerable = false;
        this.CanShoot = true;
        this.CanHit = true;
        this.CanHitMelee = true;
        this.CanShootourrelle = true;
        this.CanJump = true;
        this.CDDash = true;
        this.CanSummon = true;
        this.CanHit = true;
    }
    init(data) {
        spawnx = data.x;
        spawny = data.y;
    }
    preload() {

        this.load.tilemapTiledJSON("Chateau", "assets/maps/Chateau.json");
        this.load.image("Background_Chateau", "assets/Backgrounds/Background_Chateau.png");
        this.load.image("phaser_assets", "assets/maps/tileset1.png");
        this.load.audio('Village', 'assets/Musics/Village.mp3')
        this.load.audio('Attack', 'assets/Audio/Attacksound.wav')

        this.load.spritesheet('Souls', 'assets/Sprites/SoulsPickups.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Maganime', 'assets/Sprites/Mage_Final.png',
            { frameWidth: 64, frameHeight: 80 });
        this.load.spritesheet('TIRDEMAGE', 'assets/Sprites/Tir.png',
            { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('Potion', 'assets/Sprites/PotionDeSoin.png',
            { frameWidth: 32, frameHeight: 32 });
        
        this.load.spritesheet('CraneDeFeu', 'assets/Sprites/CraneDeFeu.png',
            { frameWidth: 64, frameHeight: 43 });
        this.load.spritesheet('Batanime', 'assets/Sprites/Bat.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Zombanime', 'assets/Sprites/Zombie.png',
            { frameWidth: 42, frameHeight: 74 });
        this.load.spritesheet('BossIldeAnim', 'assets/Sprites/Boss_Idle.png',
            { frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('Dash', 'assets/Sprites/Dash.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player', 'assets/Sprites/Player.png',
            { frameWidth: 64, frameHeight: 80 });
        this.load.spritesheet('Orb', 'assets/Sprites/OrbSimple.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('Transi', 'assets/Sprites/Transi.png',
            { frameWidth: 64, frameHeight: 80 });
        this.load.spritesheet('TransiBig', 'assets/Sprites/TransiBig.png',
            { frameWidth: 128, frameHeight: 80 });
        this.load.spritesheet('SummonSprites', 'assets/Sprites/SummonSprites.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('MyInterface', 'assets/Sprites/UI-5-vie.png', 
            { frameWidth: 237, frameHeight: 86 });
        this.load.spritesheet('CoupDeFaux', 'assets/Sprites/ScytheHit.png',
            { frameWidth: 64, frameHeight: 64 });
        //this.load.spritesheet('CoupDeFauxLeft', 'assets/Sprites/ScytheHitLeft.png',
        //    { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('FEU_VERT', 'assets/Sprites/Feu_Vert.png',
            { frameWidth: 32, frameHeight: 30*32 });
        this.load.spritesheet('FEU_VERT2', 'assets/Sprites/Feu_Vert32.png',
            { frameWidth: 64, frameHeight: 32 });
        
        this.load.image("SpriteHitBox", "assets/Sprites/SpriteHitBox.png");

        this.load.image("PremierPlan3", "assets/Backgrounds/bgc1.png");
        this.load.image("SecondPlan3", "assets/Backgrounds/bgc2.png");
        this.load.image("TroisiemePlan3", "assets/Backgrounds/bgc3.png");
        
    }

    
    create() {

        this.clavier = this.input.keyboard.createCursorKeys('up,down,left,right');
        this.clavier = this.input.keyboard.addKeys('P,K,L,M,Z,O,Q,D,E,SPACE,SHIFT,UP,DOWN,LEFT,RIGHT');

        this.physics.world.setBounds(0, 0, 100 * 99, 99 * 32);
        
        this.TroisiemePlan = this.add.image(1600, 1600, "TroisiemePlan3");
        this.SecondPlan = this.add.image(1600, 1600, "SecondPlan3").setScrollFactor(0.85,1);
        this.PremierPlan = this.add.image(1600, 1600, "PremierPlan3").setScrollFactor(0.90,1);

        const carteDuNiveau = this.add.tilemap("Chateau");
        const tileset = carteDuNiveau.addTilesetImage("tileset", "phaser_assets");
        const Sol = carteDuNiveau.createLayer('Sol', tileset);
        
        Sol.setCollisionByExclusion(-1, true);

        /////////////////////////// PLAYER ////////////////////////////////////////

        this.player = this.physics.add.sprite(spawnx, spawny, "player").setSize(20, 50).setOffset(30, 20);
        this.player.setCollideWorldBounds(true);

        this.cameras.main.zoom = 0.8;
        this.cameras.main.setBounds(0, 0, 3200, 3200);
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, Sol);


        /////////////////////////// Potion ////////////////////////////////////////

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 6 }),
            frameRate: 8,
            repeat: -1
        });

        this.Potion = this.physics.add.group({ allowGravity: false, collideWorldBounds: false })
        
        console.log(carteDuNiveau)
        carteDuNiveau.getObjectLayer('Potions').objects.forEach((potion) => {
            
            this.current_potion =  this.Potion.create(potion.x,potion.y,'Potion')
            
            this.current_potion.play('potionanim')
            this.physics.add.overlap(this.player, this.Potion, this.CEFAIRESOIGNERCESTCOOL, null, this);
          });

        /////////////////////////// Souls ////////////////////////////////////////

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
            this.physics.add.overlap(this.player, this.Soul, this.JERECUPERELAMEDESGENS, null, this);
          });
        ///////////////////////////////////////// ORBE ////////////////////////////////////////////////////////////////////
        
        this.CDF = this.physics.add.group({ allowGravity: false, collideWorldBounds: false });
        this.physics.add.collider(this.CDF, Sol, function (CDF, Sol) {
            CDF.destroy();
        });

        this.Orbe = this.physics.add.group({ allowGravity: false, collideWorldBounds: false });
        this.physics.add.collider(this.Orbe, Sol, function (Orbe, Sol) {
            Orbe.destroy();
        });

        ////////////////////////////////////////////// LA FAUX /////////////////////////////////////////////////////////////

        this.Scyth = this.physics.add.group({ allowGravity: false, collideWorldBounds: false });
        this.ScythLeft = this.physics.add.group({ allowGravity: false, collideWorldBounds: false });

        //this.SpriteHitBox = this.physics.add.sprite(10 * 32, 25 * 32, 'SpriteHitBox').setImmovable(true);
        //this.SpriteHitBox.body.setAllowGravity(false);

        /////////////////////////////////////////////// TRANSITION //////////////////////////////////////////////////////
        this.anims.create({
            key: 'Feu_vert',
            frames: this.anims.generateFrameNumbers('FEU_VERT', { start: 0, end: 14 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'Feu_vert2',
            frames: this.anims.generateFrameNumbers('FEU_VERT2', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.feuvertgroup = this.physics.add.group({ allowGravity: false, collideWorldBounds: false });
        const Feu_Vert1 = this.physics.add.sprite(25*32, 89*32+16, "FEU_VERT").setAngle(-90).setSize(30*32,32);
        this.feuvertgroup.add(Feu_Vert1);
        this.feuvertgroup.children.each(feuvert => {
            feuvert.anims.play("Feu_vert");
            //this.physics.add.overlap(this.player, this.feuvertgroup, this.PRENDREDESDEGATSCAFAITMAL, null, this);
        })
       
        this.feuvertgroup2 = this.physics.add.group({ allowGravity: false, collideWorldBounds: false });
        const Feu_Vert2 = this.physics.add.sprite(69*32, 81*32+16, "FEU_VERT2");
        const Feu_Vert3 = this.physics.add.sprite(71*32, 81*32+16, "FEU_VERT2");
        const Feu_Vert4 = this.physics.add.sprite(73*32, 81*32+16, "FEU_VERT2");
        const Feu_Vert5 = this.physics.add.sprite(75*32, 81*32+16, "FEU_VERT2");
        const Feu_Vert6 = this.physics.add.sprite(77*32, 81*32+16, "FEU_VERT2");
        const Feu_Vert7 = this.physics.add.sprite(79*32, 81*32+16, "FEU_VERT2");
        const Feu_Vert8 = this.physics.add.sprite(81*32, 81*32+16, "FEU_VERT2");
        const Feu_Vert9 = this.physics.add.sprite(83*32, 81*32+16, "FEU_VERT2");
        const Feu_Vert10 = this.physics.add.sprite(85*32, 81*32+16, "FEU_VERT2");
        const Feu_Vert11 = this.physics.add.sprite(86*32, 81*32+16, "FEU_VERT2");

        this.feuvertgroup2.add(Feu_Vert2);this.feuvertgroup2.add(Feu_Vert3);this.feuvertgroup2.add(Feu_Vert4);this.feuvertgroup2.add(Feu_Vert5);this.feuvertgroup2.add(Feu_Vert6);this.feuvertgroup2.add(Feu_Vert7);this.feuvertgroup2.add(Feu_Vert8);this.feuvertgroup2.add(Feu_Vert9);this.feuvertgroup2.add(Feu_Vert10);this.feuvertgroup2.add(Feu_Vert11)
        this.feuvertgroup2.children.each(feuvert2 => {
            feuvert2.anims.play("Feu_vert2");
            //this.physics.add.overlap(this.player, this.feuvertgroup2, this.PRENDREDESDEGATSCAFAITMAL, null, this);
        })
       
        this.physics.add.overlap(this.player, this.feuvertgroup, this.PRENDREDESDEGATSCAFAITMAL, null, this);
        this.physics.add.overlap(this.player, this.feuvertgroup2, this.PRENDREDESDEGATSCAFAITMAL, null, this);
        /////////////////////////////////////////////// SPAWN MONSTRE //////////////////////////////////////////////////////
        this.Tir = this.physics.add.group()
        this.physics.add.overlap(this.player, this.Tir , this.PRENDREDESDEGATSCAFAITMAL, null, this);

        this.anims.create({
            key: 'Maganim',
            frames: this.anims.generateFrameNumbers('Maganime', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        });

        this.MAGE = this.physics.add.sprite(91* 32, 38 * 32, "Maganim").setSize(30,70).setOffset(10,10);
        this.MAGE.type = "Mage"
        this.MAGE1 = this.physics.add.sprite(54* 32, 98 * 32, "Maganim").setSize(30,70).setOffset(10,10);
        this.MAGE1.type = "Mage"

        this.anims.create({
            key: 'Batanim',
            frames: this.anims.generateFrameNumbers('Batanime', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        });

        this.BAT = this.physics.add.sprite(9 * 32, 31 * 32, "Batanim");
        this.BAT.type = "Bat"
        this.BAT1 = this.physics.add.sprite(13 * 32, 34 * 32, "Batanim");
        this.BAT1.type = "Bat"
        this.BAT2 = this.physics.add.sprite(18 * 32, 33 * 32, "Batanim");
        this.BAT2.type = "Bat"
        this.BAT3 = this.physics.add.sprite(23 * 32, 34 * 32, "Batanim");
        this.BAT3.type = "Bat"

        this.BAT4 = this.physics.add.sprite(44 * 34, 34 * 32, "Batanim");
        this.BAT4.type = "Bat"
        this.BAT5 = this.physics.add.sprite(58 * 32, 34* 32, "Batanim");
        this.BAT5.type = "Bat"
        this.BAT6 = this.physics.add.sprite(70 * 32, 34 * 32, "Batanim");
        this.BAT6.type = "Bat"
        this.BAT7 = this.physics.add.sprite(80 * 32, 34* 32, "Batanim");
        this.BAT7.type = "Bat"
        this.BAT8 = this.physics.add.sprite(91 * 32, 34* 32, "Batanim");
        this.BAT8.type = "Bat"

        this.BAT9 = this.physics.add.sprite(39 * 32, 43 * 32, "Batanim");
        this.BAT9.type = "Bat"
        this.BAT10 = this.physics.add.sprite(45 * 32, 46* 32, "Batanim");
        this.BAT10.type = "Bat"

        this.BAT11 = this.physics.add.sprite(57 * 32, 48 * 32, "Batanim");
        this.BAT11.type = "Bat"
        this.BAT12 = this.physics.add.sprite(66 * 32, 48 * 32, "Batanim");
        this.BAT12.type = "Bat"
        this.BAT13 = this.physics.add.sprite(75 * 32, 48 * 32, "Batanim");
        this.BAT13.type = "Bat"
        this.BAT14 = this.physics.add.sprite(89 * 32, 48 * 32, "Batanim");
        this.BAT14.type = "Bat"

        this.BAT15 = this.physics.add.sprite( 39* 32, 66 * 32, "Batanim");
        this.BAT15.type = "Bat"

        this.BAT16 = this.physics.add.sprite( 30* 32, 65* 32, "Batanim");
        this.BAT16.type = "Bat"
        
        this.BAT17 = this.physics.add.sprite(71* 32, 76* 32, "Batanim");
        this.BAT17.type = "Bat"
        this.BAT18 = this.physics.add.sprite( 87* 32,  77* 32, "Batanim");
        this.BAT18.type = "Bat"

        this.BAT19 = this.physics.add.sprite(71* 32, 86* 32, "Batanim");
        this.BAT19.type = "Bat"

        this.BAT20 = this.physics.add.sprite( 70* 32,94 * 32, "Batanim");
        this.BAT20.type = "Bat"

        this.BAT21 = this.physics.add.sprite( 80* 32, 94* 32, "Batanim");
        this.BAT21.type = "Bat"

        this.BAT22 = this.physics.add.sprite( 87* 32, 94* 32, "Batanim");
        this.BAT22.type = "Bat"

        this.BAT23 = this.physics.add.sprite( 35* 32, 80* 32, "Batanim");
        this.BAT23.type = "Bat"

        this.BAT24 = this.physics.add.sprite( 17* 32,77 * 32, "Batanim");
        this.BAT24.type = "Bat"
        this.BAT25 = this.physics.add.sprite( 14* 32, 60* 32, "Batanim");
        this.BAT25.type = "Bat"
        this.BAT26 = this.physics.add.sprite( 16* 32,47 * 32, "Batanim");
        this.BAT26.type = "Bat"
        this.BAT27 = this.physics.add.sprite( 3* 32, 47* 32, "Batanim");
        this.BAT27.type = "Bat"
        this.BAT28 = this.physics.add.sprite( 44* 32, 94* 32, "Batanim");
        this.BAT28.type = "Bat"
        this.BAT29 = this.physics.add.sprite( 28* 32, 94* 32, "Batanim");
        this.BAT29.type = "Bat"
        this.BAT30 = this.physics.add.sprite( 13* 32, 94* 32, "Batanim");
        this.BAT30.type = "Bat"
        this.BAT31 = this.physics.add.sprite( 6* 32, 71* 32, "Batanim");
        this.BAT31.type = "Bat"
        this.BAT32 = this.physics.add.sprite(2* 32,94* 32, "Batanim");
        this.BAT32.type = "Bat"

        //this.BAT33 = this.physics.add.sprite( * 32, * 32, "Batanim");
        //this.BAT33.type = "Bat"



        /////////////////////////////////////////////// SPAWN ZOMBIE //////////////////////////////////////////////////////
       
        this.anims.create({
            key: 'Zombanim',
            frames: this.anims.generateFrameNumbers('Zombanime', { start: 0, end: 3 }),
            
            frameRate: 5,
            repeat: -1
        });
       
        this.ZOMBIE0 = this.physics.add.sprite(20 * 32, 38 * 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE0.type = "Zombie"

        this.ZOMBIE = this.physics.add.sprite(13 * 32, 38 * 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE.type = "Zombie"

        this.ZOMBIE1 = this.physics.add.sprite(17 * 32, 38 * 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE1.type = "Zombie"

        this.ZOMBIE2 = this.physics.add.sprite(19 * 32, 38 * 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE2.type = "Zombie"

        this.ZOMBIE3 = this.physics.add.sprite(43* 32, 38 * 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE3.type = "Zombie"

        this.ZOMBIE4 = this.physics.add.sprite(46* 32, 38 * 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE4.type = "Zombie"
        
        this.ZOMBIE5 = this.physics.add.sprite(50* 32,  38* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE5.type = "Zombie"
        
        this.ZOMBIE6 = this.physics.add.sprite(62* 32, 38* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE6.type = "Zombie"

        this.ZOMBIE7 = this.physics.add.sprite(65* 32, 38* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE7.type = "Zombie"

        this.ZOMBIE8 = this.physics.add.sprite(68* 32,  38* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE8.type = "Zombie"

        this.ZOMBIE9 = this.physics.add.sprite(43* 32,  53* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE9.type = "Zombie"

        this.ZOMBIE10 = this.physics.add.sprite(51* 32, 53* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE10.type = "Zombie"

        this.ZOMBIE11 = this.physics.add.sprite(57* 32,  53* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE11.type = "Zombie"

        this.ZOMBIE12 = this.physics.add.sprite(63* 32,  53* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE12.type = "Zombie"

        this.ZOMBIE13 = this.physics.add.sprite(70* 32,  53* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE13.type = "Zombie"


        this.ZOMBIE14 = this.physics.add.sprite(92* 32,  53* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE14.type = "Zombie"

        this.ZOMBIE15 = this.physics.add.sprite(41* 32,  70* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE15.type = "Zombie"

        this.ZOMBIE16 = this.physics.add.sprite(36* 32,  70* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE16.type = "Zombie"

        this.ZOMBIE17 = this.physics.add.sprite(32* 32,  70* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE17.type = "Zombie"

        this.ZOMBIE18 = this.physics.add.sprite(25* 32,  70* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE18.type = "Zombie"

        this.ZOMBIE19 = this.physics.add.sprite(66* 32,  97* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE19.type = "Zombie"

        this.ZOMBIE20 = this.physics.add.sprite(68* 32,  97* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE20.type = "Zombie"
        this.ZOMBIE21 = this.physics.add.sprite(72* 32,  97* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE21.type = "Zombie"
        this.ZOMBIE22 = this.physics.add.sprite(76* 32,  97* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE22.type = "Zombie"
        this.ZOMBIE23 = this.physics.add.sprite(80* 32,  97* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE23.type = "Zombie"
        this.ZOMBIE24 = this.physics.add.sprite(80* 32,  97* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE24.type = "Zombie"

        this.ZOMBIE25 = this.physics.add.sprite(48* 32,  97* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE25.type = "Zombie"
        this.ZOMBIE26 = this.physics.add.sprite(42* 32,  97* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE26.type = "Zombie"
        this.ZOMBIE27 = this.physics.add.sprite(38* 32,  97* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE27.type = "Zombie"
        this.ZOMBIE28 = this.physics.add.sprite(34* 32,  97* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE28.type = "Zombie"
        this.ZOMBIE29 = this.physics.add.sprite(25* 32,  97* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE29.type = "Zombie"
        this.ZOMBIE30 = this.physics.add.sprite(15* 32,  97* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE30.type = "Zombie"
        this.ZOMBIE31 = this.physics.add.sprite(6* 32,  97* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE31.type = "Zombie"


        this.ZOMBIE32 = this.physics.add.sprite(1* 32,  89* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE32.type = "Zombie"
        this.ZOMBIE33 = this.physics.add.sprite(8* 32,  84* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE33.type = "Zombie"

        this.ZOMBIE34= this.physics.add.sprite(1* 32,  80* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE34.type = "Zombie"

        this.ZOMBIE35 = this.physics.add.sprite(8* 32,  75* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE35.type = "Zombie"

        this.ZOMBIE36 = this.physics.add.sprite(8* 32,  62* 32, "MonstreZombie").setSize(30,65).setOffset(10,10);
        this.ZOMBIE36.type = "Zombie"

        /////////////////////////////////////////////// SPAWN GROUPE //////////////////////////////////////////////////////
        
        this.anims.create({
            key: 'BossIldeAnime',
            frames: this.anims.generateFrameNumbers('BossIldeAnim', { start: 0, end: 3 }),
            
            frameRate: 5,
            repeat: -1
        });

        this.BOSS = this.physics.add.sprite(35* 32, 15* 32, "BossIldeAnime").setScale(4).setSize(16,50).setOffset(40,30);
        this.BOSS.type = "BOSS"

        this.BOSSBAT1 = this.physics.add.sprite(26* 32, 14* 32, "Batanim").setScale(3).setSize(32,32).setOffset(0,0);
        this.BOSSBAT1.type = "BOSSBAT"

        this.BOSSBAT2 = this.physics.add.sprite(42* 32, 14* 32, "Batanim").setScale(3).setSize(32,32).setOffset(0,0);
        this.BOSSBAT2.type = "BOSSBAT"


        this.enemygroup = this.physics.add.group();
        this.enemygroup.add(this.BOSS);
        this.enemygroup.add(this.BOSSBAT1);this.enemygroup.add(this.BOSSBAT2);
        this.enemygroup.add(this.MAGE);this.enemygroup.add(this.MAGE1);

        this.enemygroup.add(this.BAT);this.enemygroup.add(this.BAT1);this.enemygroup.add(this.BAT2);this.enemygroup.add(this.BAT3);this.enemygroup.add(this.BAT4);this.enemygroup.add(this.BAT5);this.enemygroup.add(this.BAT6);this.enemygroup.add(this.BAT7);this.enemygroup.add(this.BAT8);this.enemygroup.add(this.BAT9);this.enemygroup.add(this.BAT10);this.enemygroup.add(this.BAT11);this.enemygroup.add(this.BAT12);this.enemygroup.add(this.BAT13);this.enemygroup.add(this.BAT14);this.enemygroup.add(this.BAT15);this.enemygroup.add(this.BAT16);this.enemygroup.add(this.BAT17);this.enemygroup.add(this.BAT18);this.enemygroup.add(this.BAT19);this.enemygroup.add(this.BAT20);this.enemygroup.add(this.BAT21);this.enemygroup.add(this.BAT22);this.enemygroup.add(this.BAT23);
        this.enemygroup.add(this.BAT24);this.enemygroup.add(this.BAT25);this.enemygroup.add(this.BAT26);this.enemygroup.add(this.BAT27);this.enemygroup.add(this.BAT28);this.enemygroup.add(this.BAT29);this.enemygroup.add(this.BAT30);this.enemygroup.add(this.BAT31);this.enemygroup.add(this.BAT32);

        this.enemygroup.add(this.ZOMBIE0);this.enemygroup.add(this.ZOMBIE);this.enemygroup.add(this.ZOMBIE1);this.enemygroup.add(this.ZOMBIE2);this.enemygroup.add(this.ZOMBIE3);this.enemygroup.add(this.ZOMBIE4);this.enemygroup.add(this.ZOMBIE5);this.enemygroup.add(this.ZOMBIE6);this.enemygroup.add(this.ZOMBIE7);this.enemygroup.add(this.ZOMBIE8);this.enemygroup.add(this.ZOMBIE9);this.enemygroup.add(this.ZOMBIE10);this.enemygroup.add(this.ZOMBIE11);this.enemygroup.add(this.ZOMBIE12);this.enemygroup.add(this.ZOMBIE13);this.enemygroup.add(this.ZOMBIE13);this.enemygroup.add(this.ZOMBIE14);this.enemygroup.add(this.ZOMBIE15);this.enemygroup.add(this.ZOMBIE16);this.enemygroup.add(this.ZOMBIE17);this.enemygroup.add(this.ZOMBIE18);this.enemygroup.add(this.ZOMBIE19);this.enemygroup.add(this.ZOMBIE20);
        this.enemygroup.add(this.ZOMBIE21);this.enemygroup.add(this.ZOMBIE22);this.enemygroup.add(this.ZOMBIE23);this.enemygroup.add(this.ZOMBIE24);this.enemygroup.add(this.ZOMBIE25);this.enemygroup.add(this.ZOMBIE26);this.enemygroup.add(this.ZOMBIE27);this.enemygroup.add(this.ZOMBIE28);this.enemygroup.add(this.ZOMBIE29);this.enemygroup.add(this.ZOMBIE30);this.enemygroup.add(this.ZOMBIE30);this.enemygroup.add(this.ZOMBIE31);this.enemygroup.add(this.ZOMBIE32);this.enemygroup.add(this.ZOMBIE33);this.enemygroup.add(this.ZOMBIE34);this.enemygroup.add(this.ZOMBIE35);this.enemygroup.add(this.ZOMBIE36);


        this.enemygroup.getChildren().forEach(function (child) {
            child.setCollideWorldBounds(true);
            this.physics.add.collider(child, Sol);
            this.physics.add.overlap(this.player, child, this.PRENDREDESDEGATSCAFAITMAL,null,this);
            this.physics.add.collider(this.CDF, child, this.enemyHit,null,this);    
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
                child.HP = 100;
                child.CanShootourrelle = true;
                child.anims.play("BossIldeAnime");
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
        this.messouls = 0;
        this.SoulsText = this.add.text(50, 120, this.messouls, { fontSize: '20px', fill: '#fff' }).setScale(1).setScrollFactor(0);

        this.anims.create({
            key: 'enemy1',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 0 }),
            frameRate: 8,
            repeat: -1
        });

        //////////////////////////////////////// Animations ////////////////////////////////////////////////////////////////////
        
        

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
            frameRate: 25,
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
            key: 'TransiBigAnim',
            frames: this.anims.generateFrameNumbers('TransiBig', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.transitionBig = this.physics.add.group({ allowGravity: false, collideWorldBounds: true });
        this.SpritesTransitionBig = this.transitionBig.create(10 * 32, 52.8 * 32, 'TransiBig')
        this.physics.add.overlap(this.player, this.transitionBig, this.PROCHAINESCENE,null,this);
        this.SpritesTransitionBig.anims.play('Transi', true)

        this.MyInterface = this.physics.add.sprite(130, 60, "MyInterface").setScale(1).setScrollFactor(0);
        this.MyInterface.body.allowGravity = false;
        this.cameras.main.zoom = 1;

        this.MyInterfaceSouls = this.physics.add.sprite(30, 120, "Souls").setScale(1).setScrollFactor(0);
        this.MyInterfaceSouls.body.allowGravity = false;
        this.MyInterfaceSouls.anims.play('SoulsAnim', true);
    }

    /////////////////////////// FIN DU CREATE ////////////////////////////////////////

    PROCHAINESCENE(){
        this.scene.start('Chateau', {x: 36 * 32, y: 38 * 32});
        }

//{ x: 36 * 32, y: 38 * 32 }
    update(time, delta) {
        this.mespointsdevieText.setText(this.mespointsdevie);
        this.SoulsText.setText(this.SoulsText);

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
                child.setVelocityX(0);

                const distance1 = Phaser.Math.Distance.Between(child.x, child.y, this.player.x, this.player.y);
                if (distance1 < 200) {

                    if (child.CanShootourrelle == true) {
                        this.Tir.create(child.x, child.y, "Orb").setScale(0.5,0.5).setVelocityX(this.player.x - child.x).setVelocityY(this.player.y - child.y).body.setAllowGravity(false)
                        child.CanShootourrelle = false

                        setTimeout(() => {
                            child.CanShootourrelle = true
                        }, 1000);
                    }
                }
            }

            if (child.type == "BOSS") {
                const distance1 = Phaser.Math.Distance.Between(child.x, child.y, this.player.x, this.player.y);
                if (distance1 < 500) {

                    if (child.CanShootourrelle == true) {
                        this.Tir.create(child.x, child.y, "Orb").setScale(0.5,0.5).setVelocityX(this.player.x - child.x).setVelocityY(this.player.y - child.y).body.setAllowGravity(false)
                        child.CanShootourrelle = false

                        setTimeout(() => {
                            child.CanShootourrelle = true
                        }, 500);
                    }
                }
            }

            if (child.type == "BOSS") {

                var distance = Phaser.Math.Distance.Between(child.x, child.y, this.player.x, this.player.y);
                if (distance < 300) {
                    child.setVelocityX(this.player.x - child.x)
                    child.setVelocityY(this.player.y - child.y)
                }
                else { child.setVelocity(0, 0) }
            }
            
            if (child.type == "BOSSBAT") {
                child.setVelocityX(0);

                const distance1 = Phaser.Math.Distance.Between(child.x, child.y, this.player.x, this.player.y);
                if (distance1 < 500) {

                    if (child.CanShootourrelle == true) {
                        this.Tir.create(child.x, child.y, "Orb").setScale(0.5,0.5).setVelocityX(this.player.x - child.x).setVelocityY(this.player.y - child.y).body.setAllowGravity(false)
                        child.CanShootourrelle = false

                        setTimeout(() => {
                            child.CanShootourrelle = true
                        }, 500);
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
                this.CDF.create(this.player.x + 30, this.player.y, "CraneDeFeu").setScale(0.85).setVelocityX(350);
                this.player.anims.play('HEROATTAQUEDROITE', true);
            }
            else if (this.clavier.K.isDown && !this.clavier.O.isDown) {
                this.CDF.create(this.player.x - 30, this.player.y, "CraneDeFeu").setScale(0.85).setVelocityX(- 350).setFlipX(true);
                this.player.anims.play('HEROATTAQUEGAUCHE', true);
            }
            else if (this.clavier.K.isDown && this.clavier.O.isDown) {
                this.CDF.create(this.player.x - 20, this.player.y - 20, "CraneDeFeu").setScale(0.85).setVelocityX(- 350).setVelocityY(-350).setFlipX(true).setAngle(45);
            }
            else if (this.clavier.O.isDown && !this.clavier.M.isDown && !this.clavier.K.isDown) {
                this.CDF.create(this.player.x, this.player.y - 30, "CraneDeFeu").setScale(0.85).setVelocityY(-350).setAngle(-90);
            }
            else if (this.clavier.O.isDown && this.clavier.M.isDown) {
                this.CDF.create(this.player.x + 30, this.player.y - 30, "CraneDeFeu").setScale(0.85).setVelocityY(-350).setVelocityX(350).setAngle(-45);
            }
            else if (this.clavier.L.isDown) {
                this.CDF.create(this.player.x, this.player.y, "CraneDeFeu").setScale(0.85).setVelocityY(+350).setAngle(90);
            }

            this.CanShoot = false;

            setTimeout(() => {
                this.CanShoot = true;
            }, 100);
        }
        this.CDF.getChildren().forEach(function (child) {
            child.anims.play('Crananim', true);
            //this.nombreorbes += 1
        }, this);
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
                    this.Scyth.create(this.player.x + 50, this.player.y, "CoupDeFaux");
                    var musique = this.sound.add('Attack', { loop: false });
                    musique.play();
                    console.log("coupdroit");
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
                    this.Scyth.create(this.player.x - 50, this.player.y, "CoupDeFaux").setFlipX(true);
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
            
                child.anims.play('RightHit', true);
            
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


    PRENDREDESDEGATSCAFAITMAL(player, enemy){
        if(!this.player.invulnerable){
            this.mespointsdevie -= 1;
            this.player.setTint( 0xff0000 );
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
            
            if(this.mespointsdevie === 0){
                this.player.setTint( 0xff0000 );
                
                this.scene.start("Chateau")
            }
            
            this.sleep(100).then(() => {
                setTimeout(()=>{
                this.player.clearTint();
                this.player.invulnerable = false
                this.player.body.allowGravity = true;
                },1000);
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
    JERECUPERELAMEDESGENS(player, Soul){
        this.messouls += 1;
        Soul.destroy();
        this.player.setTint(0x9900FF);
        if (this.messouls == 5){
            this.messouls == 0;
            this.mespointsdevie += 1;
        }
        this.sleep(100).then(() => {
            setTimeout(() => {
                this.player.clearTint();
            }, 500);
        }
        )

    }
    enemyHit(enemy, CDF) {
            
        CDF.destroy()
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