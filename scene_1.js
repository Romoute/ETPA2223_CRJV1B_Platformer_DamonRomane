
export default class scene_1 extends Phaser.Scene {

    constructor(){

        super({
            key: "scene_1"
    });
}

    // ----- INITIALISATION DES DONNEES DU JOUEUR -----
    // A chaque fonction changement de scene on donnera des donnees qui seront transmises a la nouvelle scene
    // pour par exemple donner la position du joueur, ses points de vie, les objets qu'il a en sa possession etc
    init(data) {

        // Position du sprite joueur
      //  this.positionX = data.x;
      //  this.positionY = data.y; 
    
    }

    preload(){
       //preload assets : barre de vie

        this.load.image('hp1', 'assets/hp1.png');
        this.load.image('hp2', 'assets/hp2.png');
        this.load.image('hp3', 'assets/hp3.png');

        

        //Preload de la map
        this.load.image("Tileset", "tileset/tileset_1.png");
        this.load.tilemapTiledJSON("scene_1", 'map/scene_1.json');
        
        

    }
    create(){

        const map = this.add.tilemap("scene_1");

        //JEU DE TUILE
        const tileset = map.addTilesetImage("tileset_1", "Tileset");


        const sol =map.createLayer(
            "sol",
            tileset
        );

        
        const background =map.createLayer(
            "background",
            tileset
        );

        


        sol.setCollisionByExclusion(-1, true);
        background.setCollisionByExclusion(-1, true);

          // ----- CAMERA -----

        // Redimensions du jeu selon le fichier Tiled
        this.physics.world.setBounds(0, 0, 3200, 1600);
        this.cameras.main.setBounds(0, 0, 3200, 1600);

       
        
        //hpUI
        this.hpUI = this.add.image(1600, 800, "hp3").setOrigin(0,0);
        this.hpUI.setScrollFactor(0);
        
        

    }


    


    update(){ 



        
    }
}

