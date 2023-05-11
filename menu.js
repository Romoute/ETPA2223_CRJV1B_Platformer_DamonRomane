export default class menu extends Phaser.Scene {

    constructor(){
        super({key : "menu"})

    }

    preload() {
        this.load.image('menu', 'assets/menu.png');

    }

    create(){
        this.clavier = this.input.keyboard.createCursorKeys();
        this.add.image(640, 360, 'menu'); // 896, 448 taille de l'image

    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
            this.scene.start("scene_1");
          } 

    }
}

   