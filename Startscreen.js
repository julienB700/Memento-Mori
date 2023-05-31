export class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");

    }
    preload() {
        this.load.audio('Intro', 'assets/Musics/Intro2.mp3')

        this.load.image('1P', 'Startscreen/MenuScreenPremierPlan.png');
        this.load.image('3P', 'Startscreen/MenuScreenthirdPlan.png');
        this.load.image('4P', 'Startscreen/MenuScreenFond.png');
        this.load.image('titre', 'Startscreen/titre.png');
        this.load.image('Button1', 'Startscreen/NewGameButton.png');
        this.load.image('Button2', 'Startscreen/MenuScreenContinue.png');
        this.load.image('Button3', 'Startscreen/MenuScreenOptions.png');

    }

    create() {
        var musique = this.sound.add('Intro', { loop: false });
            musique.play();

        this.image = this.add.image
        this.image = this.add.image(449, 224, '4P')

        this.image = this.add.image
        this.image = this.add.image(449, 224, '3P')

        this.image = this.add.image
        this.image = this.add.image(449, 224, 'titre')

        var button = this.add.sprite(449 ,270, 'Button1');
        button.setInteractive();
        button.once('pointerdown', () => {
            this.Startgame();
            musique.stop();
        });
        var button = this.add.sprite(400 ,340, 'Button2');
        button.setInteractive();
        button.once('pointerdown', () => {
            this.Startgame();
        });
        var button = this.add.sprite(380 ,400, 'Button3');
        button.setInteractive();
        button.once('pointerdown', () => {
            this.Startgame();
        });


        this.image = this.add.image
        this.image = this.add.image(449, 224 , '1P')

        
    }
    update() {

    }
    Startgame() {
        this.scene.start('Foret')

    }
}