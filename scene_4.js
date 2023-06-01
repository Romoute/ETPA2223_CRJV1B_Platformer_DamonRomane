export default class scene_4 extends Phaser.Scene {

    constructor(){

        super({
            key: "scene_4"
    });
}

//MANQUE : ----------------------------------------------
//MÉCANIQUES : 
//DASH 
//MECANIQUE DU BOUTON
//PLATEFORMES MOVABLE
////////////////////
// A MODIFIER 
//fluidité des controles 


// ennemis 




    // ----- INITIALISATION DES DONNEES DU JOUEUR -----
    init(data) {

    // Position du sprite joueur
    //  this.positionX = data.x;
    //  this.positionY = data.y; 
    
    }

    preload(){
        
    //preload assets : barre de vie
        this.load.image('hp1', 'assets/hp1.png');
        //this.load.image('hp2', 'assets/hp2.png');
        //this.load.image('hp3', 'assets/hp3.png');

        this.load.image('chasseur', 'assets/chasseur.png');
        this.load.image('doggo', 'assets/doggo.png');
       
        this.load.image('SpritePetitRenard', 'assets/SpritePetitRenard.png',
        {frameWidth: 133, frameHeight: 72});
        this.load.image('SpriteGrandRenard', 'assets/SpriteGrandRenard.png');
     

        //Preload de la map
        this.load.image("Tileset", "tileset/tileset_1.png");
        this.load.tilemapTiledJSON("scene_1", 'map/scene_1.json');

        this.load.image("Tileset2", "tileset/tileset_2.png");
        this.load.tilemapTiledJSON("scene_2", 'map/scene_2.json');

        this.load.image("Tileset3", "tileset/tileset_3.png");
        this.load.tilemapTiledJSON("scene_3", 'map/scene_3.json');
        
        this.load.image("Tileset4", "tileset/tileset_4.png");
        this.load.tilemapTiledJSON("scene_4", 'map/scene_4.json');

        this.load.image("Tileset5", "tileset/tileset_5.png");
        this.load.tilemapTiledJSON("scene_5", 'map/scene_5.json');

       

        this.load.image('SpriteCaillou', 'assets/SpriteCaillou.png');
        this.load.image('SpriteHitbox', 'assets/SpriteHitbox.png');
      
        

    }
    create(){


    //CA CAILLOU
        this.PossibiliteDeBougerLeCaillou = false;

        this.SpriteHitboxVideGauche = this.physics.add.sprite(0, 0, 'SpriteHitbox').setSize(8, 40);
        this.SpriteHitboxVideGauche.body.allowGravity = false;
        this.PossibiliteDeBougerLaBoxAGauche = false;

        this.SpriteHitboxVideDroite = this.physics.add.sprite(0, 0, 'SpriteHitbox').setSize(8, 40);
        this.SpriteHitboxVideDroite.body.allowGravity = false;
        this.PossibiliteDeBougerLaBoxADroite = false;



        this.IsOnFirstPlayer = true;
        this.speed = 300; 
        this.direction = "left"; 
        this.hp = 1; 
        this.invincible = false;  
        this.invincibleFrame = 60; 

  

// Si je veux modifier le temps entre chaque Swap de player
        this.LancementAttenteF = false
        this.AttenteF = 40;

    //Clavier 
        this.clavier = this.input.keyboard.addKeys('F,Q,D,C,SPACE');
        this.cursors = this.input.keyboard.createCursorKeys();


//JEU DE TUILE---------------------------------------------------------------------------------------------------------------------------
        const map4 = this.add.tilemap("scene_4");

        const tileset4 = map4.addTilesetImage(
            "tileset_4", 
            "Tileset4"
            );

        const changementSceneQuatre = map4.createLayer(
            "changementSceneQuatre", 
            tileset4, 
        )

        const background = map4.createLayer(
            "background",
            tileset4,
        );
        const sol = map4.createLayer(
            "sol",
            tileset4,
        );


    //Position box
        this.SpriteCaillou = this.physics.add.sprite(430, 300 , "SpriteCaillou").setImmovable(true);
    //Position Porte et Bouton 
        this.SpritePorte = this.physics.add.sprite(736, 200 , "SpritePorte").setImmovable(true);
        this.SpriteBouton = this.physics.add.sprite(736, 32 , "SpriteBouton").setImmovable(true);

    //Position Sortie
        //this.SpriteSortie = this.physics.add.staticSprite(900, 150, "SpriteSortie");
        
    //Position joueur
        this.player = this.physics.add.sprite(150, 300 , "SpritePetitRenard"); // 0, 330, ici je change la position de mes chara
        this.player.body.setSize(70,65);
        this.playerDeux = this.physics.add.sprite(100, 300, "SpriteGrandRenard");
        this.playerDeux.body.setSize(90,81);
        this.cameras.main.startFollow(this.player);
        //this.player.body.setSize(32, 32 , 300, 100); 
    



//COLLISIONS----------------------------------------------------------------------------------------------------------------------------------------------------------
        //this.chasseur = this.physics.add.sprite(500, 250, "chasseur");
        //this.doggo = this.physics.add.sprite(530, 300, "doggo") 

        //this.physics.add.overlap(this.playerDeux, this.this.SpriteHitboxVide, DeplacementTrue(), null, this);
        this.physics.add.collider(this.player, sol);
        this.physics.add.collider(this.playerDeux, sol);

        this.physics.add.collider(this.SpriteBouton, sol);
        this.physics.add.collider(this.SpritePorte, sol);
        //this.physics.add.collider(this.chasseur, sol);
        //this.physics.add.collider(this.doggo, sol);
        this.player.setCollideWorldBounds(true);
        this.playerDeux.setCollideWorldBounds(true);
        this.SpriteCaillou.setCollideWorldBounds(true);
        //this.physics.add.collider(this.SpriteSortie, sol);

      

        
        //sol.setCollisionByProperty({estSolide : true});
        sol.setCollisionByExclusion(-1, true);
        background.setCollisionByExclusion(-1, true);


        this.physics.add.collider(this.SpriteCaillou, sol);
    //collisions renard et box
        this.physics.add.collider(this.player, this.SpriteCaillou);
        this.physics.add.collider(this.playerDeux, this.SpriteCaillou, this.PossibiliteDeBougerLaBox, null, this);

    //collisions porte/boutons et joueurs
        this.physics.add.collider(this.player, this.SpritePorte);
        this.physics.add.collider(this.playerDeux, this.SpritePorte);

   
    //this.physics.add.collider(this.player, this.loseHp, null, this);
        this.physics.add.overlap(this.player, this.loseHp, null, this);
        this.physics.add.overlap(this.player || this.playerDeux, this.SpriteBouton, function() {
            if (this.clavier.C.isDown){
                this.SpritePorte.destroy();
                
            }
        }, null, this);
        this.physics.add.overlap(this.playerDeux, this.SpriteBouton, function() {
            if (this.clavier.C.isDown){
                this.SpritePorte.destroy();
                
            }
        }, null, this);
       
     


        

    //this.physics.add.collider(this.player, this.loseHp, null, this);
        this.physics.add.overlap(this.player, this.loseHp, null, this);

     


        changementSceneQuatre.setCollisionByExclusion(-1, true);

        
        this.physics.add.collider([this.player, this.playerDeux], changementSceneQuatre, (player, changementSceneQuatre) => {
            player.hasTouched = true;
            if(this.player.hasTouched && this.playerDeux.hasTouched){
                this.scene.start("scene_5");
            }
        });
        
    //hpUI
        this.hpUI = this.add.image(-100,-100, "hp1").setOrigin(0,0);
        this.hpUI.setScrollFactor(0);
        


        this.player.wallJumping = true; 
        


       



    //Redimensions du jeu selon le fichier Tiled
        this.physics.world.setBounds(0, 0, 896, 448);
        this.cameras.main.setBounds(0, 0, 896, 448);

     
        //ici faire changement de scene. Ne pas oublier de mettre les collisions et overlap avec le sol

        //pour nouvelle scene je crée une hitbox_sortie que je place au bout de mon niveau
        

        
    }


    
//POUVOIR BOUGER BOX------------------------------------------------------------------------------------------------

    update(){ 

        //CA C EST LE CAILLOU
        if (this.physics.overlap(this.playerDeux, this.SpriteHitboxVideGauche)){
            this.PossibiliteDeBougerLaBoxADroite = true;
        }
        else if (this.physics.overlap(this.playerDeux, this.SpriteHitboxVideDroite)){
            this.PossibiliteDeBougerLaBoxAGauche = true;
        }
        else{
            this.PossibiliteDeBougerLaBoxADroite = false;
            this.PossibiliteDeBougerLaBoxAGauche = false;
        }

        if(this.clavier.Q.isDown || this.cursors.left.isDown && this.PossibiliteDeBougerLaBoxAGauche == true){
            this.SpriteCaillou.setVelocityX(-140);
        }
        if(this.clavier.D.isDown || this.cursors.right.isDown && this.PossibiliteDeBougerLaBoxADroite == true){
            this.SpriteCaillou.setVelocityX(140);
        }
        

        this.SpriteHitboxVideDroite.x = this.SpriteCaillou.x + 50;
        this.SpriteHitboxVideDroite.y = this.SpriteCaillou.y

        this.SpriteHitboxVideGauche.x = this.SpriteCaillou.x - 50;
        this.SpriteHitboxVideGauche.y = this.SpriteCaillou.y


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
//WALL JUMP-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


        if (this.cursors.up.isDown && this.player.body.blocked.right || this.clavier.SPACE.isDown && this.player.body.blocked.right) {
            if (this.player.wallJumping == true) {

                this.player.wallJumping = false;

                this.time.delayedCall(500, () => {
                    this.cdWallJump(); 
                });
           
                this.player.setVelocityY(-300);
                
                
            }
        }
        
        if (this.cursors.up.isDown && this.player.body.blocked.left || this.clavier.SPACE.isDown && this.player.body.blocked.left) {
            if (this.player.wallJumping == true) {

                this.player.wallJumping = false;

                this.time.delayedCall(500, () => {
                    this.cdWallJump(); 
                });

                this.player.setVelocityY(-300);
               
            }    
        }
        
    
    

// Déplacement du Joueur 2
        if (this.cursors.left.isDown && this.PossibiliteDeBougerLeCaillou == true){
            this.SpriteCaillou.setVelocityX(-150);
        }
        else if (this.cursors.right.isDown && this.SpriteCaillouGoToRight == true){
            this.SpriteCaillou.setVelocityX(150);
        }
        if (this.cursors.left.isDown && this.IsOnFirstPlayer == false || this.clavier.Q.isDown && this.IsOnFirstPlayer == false){ 
            this.playerDeux.setVelocityX(-160); 
        }
        else if (this.cursors.right.isDown && this.IsOnFirstPlayer == false || this.clavier.D.isDown && this.IsOnFirstPlayer == false){ 
            this.playerDeux.setVelocityX(160); 
        }
        else{
            this.playerDeux.setVelocityX(0);
            this.SpriteCaillou.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.playerDeux.body.onFloor() && this.IsOnFirstPlayer == false || this.clavier.SPACE.isDown && this.playerDeux.body.onFloor() && this.IsOnFirstPlayer == false){
            this.playerDeux.setVelocityY(-300); 
        }

        

       

//INVULNERABLE------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        if (this.invincible){
            //console.log(this.invincibleFrame); 
            this.invincibleFrame-- ;
            if(this.invincibleFrame <= 0){
                    this.invincibleFrame = 60;
                    this.player.setTint(0xffffff);
                    this.invincible = false ;
            }
        }


//UI HP-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
       
        
        if(this.hp  == 1){
            this.hpUI.setTexture("hp1");
            
        }else if(this.hp <= 0){
            this.scene.start("scene_3");
        }
}
   
// FONCTION LOSE HP------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    loseHp(){
        if (this.invincible == false){
            //console.log("Bonjour");
            this.invincible = true;
            this.hp -= 1;
            this.player.setTint(0xff0000);
            this.player.scene.cameras.main.shake(200, 0.01);
        }
    }

    cdWallJump() {
        this.player.wallJumping = true;
    }

}


    



 


