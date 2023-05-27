export class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.player_invulnerable = false;
        this.CanShoot = true;
        this.CanJump = true;
        this.CDDash = true;
        this.HPbar= 5;
        this.CanSummon = true;
        this.HP = 5;
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update(){

       
    }


}