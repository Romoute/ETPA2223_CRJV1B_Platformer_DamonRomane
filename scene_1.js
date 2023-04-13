
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

        this.load.spritesheet('renard_idle', 'assets/renard_idle.png',
        { frameWidth: 32, frameHeight:32});

        //Preload de la map
        this.load.image("Tileset", "tileset/tileset_1.png");
        this.load.tilemapTiledJSON("scene_1", 'map/scene_1.json');
        
        

    }
    create(){

        const map = this.add.tilemap("scene_1");

        //JEU DE TUILE
        const tileset = map.addTilesetImage("tileset_1", "Tileset");


        const background =map.createLayer(
            "background",
            tileset
        );

        const sol =map.createLayer(
            "sol",
            tileset
        );

        
       

        //This.player
        this.player = this.physics.add.sprite(0, 330, "renard_idle");
        this.player.body.setSize(32, 32 , 300, 100);
        this.player.speed = 300; 
        this.player.direction = "left"; 
        this.player.hp = 3; 
        this.player.invincible = false;  
        this.player.invincibleFrame = 20; 

        //Collisions
        sol.setCollisionByExclusion(-1, true);
        background.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, sol);
        this.physics.add.collider(this.player, this.loseHp, null, this);




        

       
        
        //hpUI
        this.hpUI = this.add.image(1600, 800, "hp3").setOrigin(0,0);
        this.hpUI.setScrollFactor(0);
        
        //Clavier
        this.clavier = this.input.keyboard.createCursorKeys();
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);





        // Redimensions du jeu selon le fichier Tiled
        this.physics.world.setBounds(0, 0, 3200, 1600);
        this.cameras.main.setBounds(0, 0, 3200, 1600);


    }


    


    update(){ 

      //MODIFIER DEPLACEMENTS ILS SONT CASSÉS
        //DEPLACEMENTS 

        var mouvement = new Phaser.Math.Vector2(0, 0);


        if (this.clavier.left.isDown) {
            mouvement.x = -1;
            this.player.direction = "left"; 
        } 
        else if (this.clavier.right.isDown) {
            mouvement.x = 1;
            this.player.direction = "right"; 
        } 
        else {
            mouvement.x = 0;
        }
        
        if (this.clavier.up.isDown) {
            mouvement.y = -1;
            this.player.direction = "up"; 
        } 
        else if (this.clavier.down.isDown) {
            mouvement.y = 1;
            this.player.direction = "down"; 
        } 
        else {
            mouvement.y = 0;
        }
        
        mouvement.normalize();
        this.player.setVelocity(mouvement.x * this.player.speed, mouvement.y *  this.player.speed);


        //INVULNERABLE
        if(this.player.invincible){
            console.log(this.player.invincibleFrame); 
            this.player.invincibleFrame-- ;
            if(this.player.invincibleFrame <= 0){
                    this.player.invincibleFrame = 20;
                    this.player.setTint(0xffffff);
                    this.player.invincible = false ;
            }
        }



       
        if(this.player.hp == 3){
            this.hpUI.setTexture("hp3");
        }
        if(this.player.hp == 2){
            this.hpUI.setTexture("hp2");
        }
        if(this.player.hp  == 1){
            this.hpUI.setTexture("hp1");
            
        }else if(this.player.hp <= 0){
            this.scene.start("scene_1");
        }
    }

    loseHp(player){

        if(!player.invincible){
            player.invincible = true;
            player.hp -= 1;
            player.setTint(0xff0000);
            player.scene.cameras.main.shake(200, 0.01);
        }
    }
        
}


