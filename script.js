import { Menu as Menu } from "./Startscreen.js"
import { Foret as Foret } from "./Foret.js"
import { Village as Village } from "./Village.js"
 
var config = {
    type: Phaser.AUTO,
    width: 896, height: 448,
    physics: {
        default: 'arcade',
        arcade: {
            gravity:{y: 700},
            debug: true
        }
    },
    antialias: false,
    scene: [Menu,Village,Foret],
    
    pixelArt : true ,

};
new Phaser.Game(config)