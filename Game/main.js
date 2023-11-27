

//Game Setup
let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');
    canvas.width  = 1024;
    canvas.height = 700;

let upkey = 38;
let downkey = 40;
let leftkey = 37;
let rightkey = 39;
let shootkey = 32;

let bullets = [];



/// Player Objekt
  
const Player = {      
        x: 100,
        y: 100,
        height: 100,
        width: 100,
	    speed: 15,
        keyUp: false,
        keyDown: false,
        keyLeft: false,
        keyRight: false,
        bullettimer: 5,
        shootKey: false,
        energy: 2000,
        shooting: false,
        shoot: function(){
            this.bullettimer--
            if (bullets.length<50 && player.bullettimer <= 0) { 
                             
                    bullet = Object.create(Bullet);
                    bullet.x = this.x + (this.width/2 - bullet.width/2.4);
                    bullet.y = this.y;
                    bullets.push(bullet);
                    this.bullettimer = 5;
                };
           
            }
        }
     
    Player.img = new Image();
    Player.img.src = "player.png";

/// Bullet Objekt
const Bullet = {      
        x: 0,
        y: 0,
        height: 20,
        width: 20,
        speed: 20
        
    };
    Bullet.img = new Image();
    Bullet.img.src = "bullet.png";




/// Enemy Objekt

////////////TODO



// Check Input


let arrow_keys_handler = function(e) {
    switch(e.keyCode){
        case 37: case 39: case 38:  case 40: // Arrow keys
        case 32: e.preventDefault(); break; // Space
        default: break; // do not block other keys
    }
};
let getInput = function( event ){
    if (event.keyCode == upkey){
        player.keyUp = true;
    }
    else if (event.keyCode == downkey){
        player.keyDown = true;
    } 
    if (event.keyCode == leftkey){
        player.keyLeft = true;
    }
    else if (event.keyCode == rightkey){
        player.keyRight = true;
    } 
    if (event.keyCode == shootkey){
        player.keyShoot = true;
    }
    
};
let stopInput = function( event ){
    if (event.keyCode == upkey){
        player.keyUp = false;
    }
    else if (event.keyCode == downkey){
        player.keyDown = false;
    } 
    if (event.keyCode == leftkey){
        player.keyLeft = false;
    }
    else if (event.keyCode == rightkey){
        player.keyRight = false;
    } 
    if (event.keyCode == shootkey){
        player.keyShoot = false;
    }
    
};


//Kollisionsabfrage
function checkCollision(){

    ///Player Ränder

   /* if (player.x < 0){
	player.x = 0;
    }
    if (player.x+player.width >= canvas.width){
	player.x = canvas.width-player.width;
    }
    if (player.y < 10){
        player.y = 0;
    }*/

    ///Bullets Rand



};

//Update
function updatePlayer(){
    if (player.keyUp && player.y >= 20){
        player.y = player.y - player.speed;

    }
    else if (player.keyDown && player.y <= canvas.height-player.height-10){
        player.y = player.y + player.speed;
    }
    if (player.keyRight && player.x <= canvas.width-player.width-10){
        player.x = player.x + player.speed;
    }
    else if (player.keyLeft && player.x >= 0 + 10){
        player.x = player.x - player.speed;
    }
    if (player.keyShoot){

     player.shoot();

    };
};




//Draw Funktionen

function clearFrame(){

 

    c.clearRect(0 ,0, canvas.width, canvas.height);

};

function drawPlayer (){
    
    c.drawImage(player.img, player.x, player.y, player.width, player.height);

};

function drawBullets (){


   
    for (let i = 0; i< bullets.length; i++) {
        let index = i;
        bullets[i].y = bullets[i].y-bullets[i].speed;
        c.drawImage(bullets[i].img, bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height);
        if (bullets[i].y <= 0){bullets.splice(0,1);} ///// An Position 0, 1 Element weglöschen. 
    }
}






//Game

window.onload = function(){

    ///Event Listener Setup
    window.addEventListener("keydown", arrow_keys_handler, false);
    window.addEventListener("keydown", getInput, false);
    window.addEventListener("keyup", stopInput, false);
    
    player = Object.create(Player);

    /// Game Loop
    function gameLoop(){
        //Daten aktualisieren
        checkCollision();
        updatePlayer();
        //Draw
        clearFrame();
        drawPlayer();
        drawBullets();
    
        window.requestAnimationFrame(gameLoop); 
    };

    gameLoop();

};
