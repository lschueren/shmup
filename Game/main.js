

//Game Setup
    var timer = 0;
    var loop;
    var canvas = document.getElementById('canvas');
    
    canvas.width  = 1024;
    canvas.height = 700;
    
    var c = canvas.getContext('2d');

    var x = 100;
    var y = 100;
    var w = 100;
    var h = 100;

    var upkey = 40;
    var downkey = 38;
    var leftkey = 37;
    var rightkey = 39;
    var shootkey = 32;

/// Player Objekt
  
    var ship = {      
        x: 100,
        y: 100,
        height: 100,
        width: 100,
	speed: 15,
        keyUp: false,
        keyDown: false,
        keyLeft: false,
        keyRight: false,
        shootKey: false,
        energy: 2000,
        shooting: false,
        shoot: function(){
            Object.create(bullet);
            
        },
    };
    ship.img = new Image();
    ship.img.src = "player.png";

/// Bullet Objekt
    var bullet = {      
        x: 100,
        y: 100,
        height: 20,
        width: 20,
        
    };
    bullet.img = new Image();
    bullet.img.src = "bullet.png";




/// Enemy Objekt

////////////TODO



// Check Input



var arrow_keys_handler = function(e) {
    switch(e.keyCode){
        case 37: case 39: case 38:  case 40: // Arrow keys
        case 32: e.preventDefault(); break; // Space
        default: break; // do not block other keys
    }
};

var getInput = function( event ){
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

var stopInput = function( event ){
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
    if (player.x < 0){
	player.x = 0;
    }
    if (player.x+player.width >= canvas.width){
	player.x = canvas.width-player.width;
    }
};

//Update
function updatePlayer(){
    if (player.keyUp){
        player.y = player.y + player.speed;
    }
    else if (player.keyDown){
        player.y = player.y - player.speed;
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

};





//Game

window.onload = function(){

    ///Event Listener Setup
    window.addEventListener("keydown", arrow_keys_handler, false);
    window.addEventListener("keydown", getInput, false);
    window.addEventListener("keyup", stopInput, false);
    
    player = Object.create(ship);

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
