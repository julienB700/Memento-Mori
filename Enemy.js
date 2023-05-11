class Enemy {
    constructor(player) {
      this.player = player;
    }
    
    attack() {
      this.player.hit();
    }
  }