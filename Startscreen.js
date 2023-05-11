class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");

    }
    preload() {
        this.load.image('1P', 'assets/MenuScreenPremierPlan.png');
        this.load.image('3P', 'assets/MenuScreenthirdPlan.png');
        this.load.image('4P', 'assets/MenuScreenFond.png');
        this.load.image('titre', 'assets/titre.png');
        this.load.image('Button1', 'assets/NewGame.png');
        this.load.image('Button2', 'assets/Continue.png');
        this.load.image('Button3', 'assets/Options.png');

    }
    create() {
        this.image = this.add.image
        this.image = this.add.image(449, 224, '4P')

        this.image = this.add.image
        this.image = this.add.image(449, 224, '3P')

        this.image = this.add.image
        this.image = this.add.image(449, 224, 'titre')

        var button = this.add.sprite(449 ,224, 'Button1');
        button.setInteractive();
        button.on('pointerdown', () => {
            this.Startgame();
        });

        this.image = this.add.image
        this.image = this.add.image(449, 224, 'Button2')

        this.image = this.add.image
        this.image = this.add.image(449, 224, 'Button3')


        this.image = this.add.image
        this.image = this.add.image(449, 224 , '1P')

        
    }
    update() {

    }
    Startgame() {
        this.scene.start('monjeu')

    }
}