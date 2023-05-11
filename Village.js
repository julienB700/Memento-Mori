class monjeu extends Phaser.Scene {
    constructor() {
        super("monjeu");
        this.player_invulnerable = false;
    }
    preload() {
        this.load.tilemapTiledJSON("Village","maps/VILLAGE.json");
        this.load.image("phaser_assets", "maps/newstileset.png");
        this.load.image('perso','Sprites/Player.png');

    }


    create() {
        const carteDuNiveau = this.add.tilemap("Village");        
        const tileset = carteDuNiveau.addTilesetImage("newstileset","phaser_assets");
        const base = carteDuNiveau.createLayer('Calque 1 sol',tileset);
        base.setCollisionByProperty({ estSolide: true }); 
        this.player = this.physics.add.sprite(0*64, 9*64, 'perso');
        this.physics.add.collider(this.player, base);
        this.cameras.main.zoom = 0.3;
        this.cameras.main.startFollow(this.player); 
        this.clavier = this.input.keyboard.addKeys('Q,D,E,SPACE,SHIFT');
    }
    
        
    update() {
        if (this.clavier.Q.isDown) {

            this.player.setVelocityX(-400);
            //this.HB.x=this.player.x-32;
            //this.HB.y=this.player.y;
        }
        else if (this.clavier.D.isDown) {
            this.player.setVelocityX(400);
            //this.HB.x=this.player.x+32;
            //this.HB.y=this.player.y;
        }
        else {
            this.player.setVelocityX(0)
            //this.player.anims.play('idle', true);
        }
        if (this.clavier.SPACE.isDown ) {
            this.player.setVelocityY(-900);
        }

    }

}