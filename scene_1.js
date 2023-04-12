
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
       
        this.preload.image("Tileset", "tileset/tileset_1.png");
        this.preload.tilemapTiledJSON("scene_1", 'map/scene_1.json');
        
        

    }
    create(){

        const map = this.add.tilemap("scene_1");

        //JEU DE TUILE
        const tileset = map.affTilesetImage("tileset_1", "Tileset");


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

    }




    update(){ 



        
    }
}

