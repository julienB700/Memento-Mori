class Player {
    constructor() {
      this.health = 100;
      this.isHit = false;
    }
    
    hit() {
      if (!this.isHit) {
        this.health -= 10;
        this.isHit = true;
  
        setTimeout(() => {
          this.isHit = false;
        }, 1000); // 1-second delay
      }
      }
    }