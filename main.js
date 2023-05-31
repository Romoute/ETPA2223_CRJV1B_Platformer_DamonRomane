import menu from './menu.js';
import scene_1 from './scene_1.js';
import scene_2 from './scene_2.js';
import scene_3 from './scene_3.js';
import scene_4 from './scene_4.js';




// ----- CONFIGURATION INITIALE -----
var config = {
    type: Phaser.AUTO,
    width: 896, height: 448,
    pixelArt: false,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: true
        }
    },

    // Ajout des differentes scenes dans le jeu (donc la toutes les prochaines scenes que tu fais tu les met la dedans avec une virgule)
    scene: [menu, scene_1, scene_2, scene_3, scene_4],
    fps: {
        target: 60,
        forceSetTimeOut: true
      },
};
var game = new Phaser.Game(config);
game.scene.start("menu");