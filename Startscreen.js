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

        //this.pointer = setOrigin(0.5,0.5)

        var musique = this.sound.add('Intro', { loop: false });
            musique.play();

        this.fourthplan = this.add.image(449, 224, '4P').setScale(1.2)
      
        this.thirdplan = this.add.image(449, 224, '3P').setScale(1.2)
        
        this.titre = this.add.image(449, 224, 'titre');
        
        this.Firstplan = this.add.image(449, 224 , '1P').setScale(1.2);

    
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

    }
    update() {
  // Get the current position of the pointer
        const pointer = this.input.activePointer;
        const pointerX = pointer.x;
        const pointerY = pointer.y;

        // Calculate the amount to scroll for each layer based on the pointer's position
        const scrollX = pointerX + 0.05;
        const scrollY = pointerY + 0.05;

        // Set the scroll factors and scroll the layers
        this.thirdplan.x = pointerX * 2;
        this.thirdplan.y = pointerY * 2;
    
        this.titre.x = pointerX + 0.5;
        this.titre.y = pointerY + 0.5;

        this.Firstplan.x = pointerX + 0.8;
        this.Firstplan.y = pointerY + 0.8;


    }
    Startgame() {
        this.scene.start('Chateau')

    }
}