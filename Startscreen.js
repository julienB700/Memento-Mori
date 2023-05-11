class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");

    }
    preload() {
        this.load.image('Menu', 'assets/MenuScreen.png');
        //this.load.image('titre', 'assets/titre.png');
        //this.load.image('Button', 'assets/button.png');

    }
    create() {
        this.image = this.add.image
        this.image = this.add.image(896, 448, 'Menu')
        this.image.setScale(1)
        //this.image = this.add.image(800,200, 'titre')
        //var button = this.add.sprite(800,650, 'Button');
        //button.setInteractive();
        //button.on('pointerdown', () => {
        //    this.Startgame();
        //});
    }
    update() {

    }
    Startgame() {
        this.scene.start('monjeu')

    }
}