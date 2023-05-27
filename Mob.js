

export class Mob extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, speed) {
        super(scene, x, y, 'Mob');
        this.setDepth(1);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setAngle(90);

        this.body.setImmovable(true);

        this.speed = speed;

        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this); 
    }

    update(){
        this.body.setVelocityY(this.speed);

    }

    destroyLaser() {
        this.destroy();
    }
}
