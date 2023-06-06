const WIDTH = 896;
const HEIGHT = 448;

export class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");

    }
    preload() {
        this.load.audio('Intro', 'assets/Musics/Intro2.mp3');
        this.load.audio('HeartBeat', 'assets/Audio/Heartbeat.wav');

        this.load.image('1P', 'Startscreen/MenuScreenPremierPlan.png');
        this.load.image('3P', 'Startscreen/MenuScreenthirdPlan.png');
        this.load.image('4P', 'Startscreen/MenuScreenFond.png');
        this.load.image('titre', 'Startscreen/titre.png');
        this.load.image('Button1', 'Startscreen/NewGameButton.png');
        this.load.image('Button2', 'Startscreen/MenuScreenContinue.png');
        this.load.image('Button3', 'Startscreen/MenuScreenOptions.png');

    }

    create() {
        this.Son_HeartBeat = this.sound.add('HeartBeat', { loop: false });
        //this.pointer = setOrigin(0.5,0.5)

        var musique = this.sound.add('Intro', { loop: false });
            musique.play();


        this.fourthplan = this.add.image(WIDTH / 2, HEIGHT / 2, "4P").setScale(1.2);
        this.thirdplan = this.add.image(WIDTH / 2, HEIGHT / 2, "3P").setScale(1.2);
        this.titre = this.add.image(WIDTH / 2, HEIGHT / 2, "titre").setScale(1.1);

        var button = this.add.sprite(449 ,270, 'Button1');
        button.setInteractive();
        button.once('pointerdown', () => {
            this.Son_HeartBeat.play();
            this.Startgame();
            musique.stop();
            
        });
        var button = this.add.sprite(400 ,340, 'Button2')
        button.setInteractive();
        button.once('pointerdown', () => {
            this.Startgame();
        });
        var button = this.add.sprite(380 ,400, 'Button3');
        button.setInteractive();
        button.once('pointerdown', () => {
            this.Startgame();
        });
        this.firstplan = this.add.image(WIDTH / 2, HEIGHT / 2, "1P").setScale(1.2);

        
    }
    update() {
  // Get the current position of the pointer
        const mx = this.input.mousePointer.x;
        const my = this.input.mousePointer.y;
    
        // Set the scroll factors and scroll the layers
        this.fourthplan.x = WIDTH / 2 + (mx / 200);
        this.fourthplan.y = HEIGHT / 2 + (my / 200);

        this.thirdplan.x = WIDTH / 2 + (mx / 50);
        this.thirdplan.y = HEIGHT / 2 + (my / 50);

        this.firstplan.x = WIDTH / 2 + (mx / 10);
        this.firstplan.y = HEIGHT / 2 + (my / 10);

        this.titre.x = WIDTH / 2 + (mx / 100);
        this.titre.y = HEIGHT / 2 + (my / 100);

        //this.button.x = WIDTH / 2 + (mx / 600);
        //this.button.y = HEIGHT / 2 + (my / 600);


    }
    Startgame() {
        this.scene.start('Foret')

    }
}