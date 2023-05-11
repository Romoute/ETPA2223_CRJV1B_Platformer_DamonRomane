
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

        this.load.image('pousse', 'assets/pousse.png');

        this.load.spritesheet('SpriteHitbox', 'assets/SpriteHitbox.png',
        { frameWidth: 64, frameHeight:64});

        this.load.spritesheet('renard_idle', 'assets/renard_idle.png',
        { frameWidth: 32, frameHeight:32});

        this.load.spritesheet('SpriteGrandRenard', 'assets/SpriteGrandRenard.png',
        { frameWidth: 64, frameHeight:64});

        //Preload de la map
        this.load.image("Tileset", "tileset/tileset_1.png");
        this.load.tilemapTiledJSON("scene_1", 'map/scene_1.json');
        
        
        

    }
    create(){

        this.IsOnFirstPlayer = true;
        this.speed = 300; 
        this.direction = "left"; 
        this.hp = 3; 
        this.invincible = false;  
        this.invincibleFrame = 60; 


        this.LancementAttenteF = false
    // Si je veux modifier le temps entre chaque Swap de player
        this.AttenteF = 40;


        const map = this.add.tilemap("scene_1");

//JEU DE TUILE---------------------------------------------------------------------------------------------------------------------------
        const tileset = map.addTilesetImage("tileset_1", "Tileset");

        const background = map.createLayer(
            "background",
            tileset
        );
        const sol = map.createLayer(
            "sol",
            tileset
        );


// CRÉATION OBJETs AVEC TILED-----------------------------------------------------------------------------------------------
        this.box = this.physics.add.group({ allowGravity: false, collideWorldBounds: true });
        map.getObjectLayer('box').objects.forEach((obj) => {

            //console.log('yo')
            //console.log(obj.x,obj.y)
            const box = this.box.create(obj.x, obj.y, 'pousse').setOrigin(0);
            
        });
       
        
        this.player = this.physics.add.sprite(500, 500 , "renard_idle"); // 0, 330,
        this.playerDeux = this.physics.add.sprite(350, 490, "SpriteGrandRenard");
        this.cameras.main.startFollow(this.player);
        //this.player.body.setSize(32, 32 , 300, 100);
        

        this.SpriteHitbox = this.physics.add.sprite(250, 60, "SpriteHitbox");

    //Collisions
        sol.setCollisionByExclusion(-1, true);
        background.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, sol);
        this.physics.add.collider(this.playerDeux, sol);
        this.physics.add.collider(this.SpriteHitbox, sol);

    //this.physics.add.collider(this.player, this.loseHp, null, this);
        this.physics.add.overlap(this.player, this.SpriteHitbox, this.loseHp, null, this);




        

       
        
    //hpUI
        this.hpUI = this.add.image(10,10, "hp3").setOrigin(0,0);
        this.hpUI.setScrollFactor(0);
        
    //Clavier
        this.clavier = this.input.keyboard.addKeys('F,Q,D,SPACE');
        this.cursors = this.input.keyboard.createCursorKeys();
        



    //Redimensions du jeu selon le fichier Tiled
        this.physics.world.setBounds(0, 0, 3200, 1600);
        this.cameras.main.setBounds(0, 0, 3200, 1600);
        

    }


    


    update(){ 

//LANCEMENT CHRONO ATTENTE POUR F------------------------------------------------------------------------------------------------------------------------------------------------------------------
        if (this.LancementAttenteF == true){
            this.AttenteF -- ;
            if (this.AttenteF <= 0){
                this.AttenteF = 40;
                this.LancementAttenteF = false;
            }
        }
      


//SWAP CHARA----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        if (this.clavier.F.isDown){
            if (this.IsOnFirstPlayer == true && this.AttenteF == 40){
                this.IsOnFirstPlayer = false;
                this.LancementAttenteF = true;
                this.cameras.main.startFollow(this.playerDeux);
            }
            else if (this.IsOnFirstPlayer == false && this.AttenteF == 40){
                this.LancementAttenteF = true;
                this.IsOnFirstPlayer = true;
                this.cameras.main.startFollow(this.player);
            }
            
        }
// Déplacement du Joueur 1 
        if (this.cursors.left.isDown && this.IsOnFirstPlayer == true || this.clavier.Q.isDown && this.IsOnFirstPlayer == true){ 
            this.player.setVelocityX(-160); 
        }
        else if (this.cursors.right.isDown && this.IsOnFirstPlayer == true || this.clavier.D.isDown && this.IsOnFirstPlayer == true){ 
            this.player.setVelocityX(160); 
        }
        else{
            this.player.setVelocityX(0);
        }


        if (this.cursors.up.isDown && this.player.body.onFloor() && this.IsOnFirstPlayer == true || this.clavier.SPACE.isDown && this.player.body.onFloor() && this.IsOnFirstPlayer == true){
            this.player.setVelocityY(-300); 
        }


// Déplacement du Joueur 2
        if (this.cursors.left.isDown && this.IsOnFirstPlayer == false || this.clavier.Q.isDown && this.IsOnFirstPlayer == false){ 
            this.playerDeux.setVelocityX(-160); 
        }
        else if (this.cursors.right.isDown && this.IsOnFirstPlayer == false || this.clavier.D.isDown && this.IsOnFirstPlayer == false){ 
            this.playerDeux.setVelocityX(160); 
        }
        else{
            this.playerDeux.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.playerDeux.body.onFloor() && this.IsOnFirstPlayer == false || this.clavier.SPACE.isDown && this.playerDeux.body.onFloor() && this.IsOnFirstPlayer == false){
            this.playerDeux.setVelocityY(-300); 
        }

        
   
        //this.player.setVelocity(mouvement.x * this.speed, mouvement.y *  this.speed);


//INVULNERABLE------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        if (this.invincible){
            console.log(this.invincibleFrame); 
            this.invincibleFrame-- ;
            if(this.invincibleFrame <= 0){
                    this.invincibleFrame = 60;
                    this.player.setTint(0xffffff);
                    this.invincible = false ;
            }
        }


//UI HP-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
       
        if(this.hp == 3){
            this.hpUI.setTexture("hp3");
        }
        if(this.hp == 2){
            this.hpUI.setTexture("hp2");
        }
        if(this.hp  == 1){
            this.hpUI.setTexture("hp1");
            
        }else if(this.hp <= 0){
            this.scene.start("scene_1");
        }
    }


// FONCTION LOSE HP------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    loseHp(){
        if (this.invincible == false){
            console.log("Bonjour");
            this.invincible = true;
            this.hp -= 1;
            this.player.setTint(0xff0000);
            this.player.scene.cameras.main.shake(200, 0.01);
        }
    }
        
}






