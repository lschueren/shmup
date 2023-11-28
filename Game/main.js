window.onload = function(){

//Game Setup
let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');
    canvas.width  = 800;
    canvas.height = 600;

let upkey = 38;
let downkey = 40;
let leftkey = 37;
let rightkey = 39;
let shootkey = 32;
let bullets = [];
let enemies = [];
let players = [];

let killcount = 0;
let spawnSpeed = 1000;

/// Player Objekt
  
const Player = {      
        x: null,
        y: null,
        height: 50,
        width: 50,
	    speed: 15,
        keyUp: false,
        keyDown: false,
        keyLeft: false,
        keyRight: false,
        bullettimer: 5,
        shootKey: false,
        energy: 2000,
        shooting: false,
        alive: true,
        shoot: function(){
            this.bullettimer--
            if (player.bullettimer <= 0) { 
                    bullet = Object.create(Bullet);
                    bullet.x = this.x + (this.width/2 - bullet.width/2.4);
                    bullet.y = this.y;
                    bullets.push(bullet);
                    this.bullettimer = 10;
                }; 
           
            }
        };
        Player.img = new Image();
        Player.img.src = "player.png";


/// Bullet Objekt
const Bullet = {      
        x: 0,
        y: 0,
        height: 10,
        width: 10,
        speed: 5,
        moveUp: false,
        moveDown: false,
        moveLeft: false,
        moveRight: false
        
        };
        Bullet.img = new Image();
        Bullet.img.src = "bullet.png";


/// Enemy Objekt

const Enemy = {
    x: canvas.width/2,
    y: 0,
    height: 50,
    width: 50,
    speed: 2,
    health: 20,
    move: function(){
	this.y = this.y+this.speed;
    }
    
       
        };
        Enemy.img = new Image();
        Enemy.img.src = "enemy.png";
        Enemy.img2 = new Image();
        Enemy.img2.src = "speedster.png";

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





//////////////////Kollisionsabfrage
 
function checkCollision(){
    
    /// Bullets + Enemies
    for (let i = 0; i < bullets.length; i++){
        for (let j = 0; j < enemies.length; j++){
      
            if (bullets[i] != undefined && bullets[i].y <= enemies[j].y + enemies[j].height
            && bullets[i].x > enemies[j].x
            && bullets[i].x < enemies[j].x + enemies[j].width){
                    bullets.splice(i, 1);
                    enemies[j].health = enemies[j].health - 10;
                    if (enemies[j].health <= 0 ){
                            if (enemies[j].img.src == "speedster.png"){
                               killcount = killcount +4; /// +4 punkte für Speedster
                            }
                            enemies.splice(j, 1);
                            killcount = killcount+1; /// 1 punkt für normale Feinde
                            
                    }
            } 

        }
    }


  
//Wenn Player mit einem Feind kollidiert, Explosionsbild, dann Leeres Bild nach Timeout / Position undefined setzen



    for (let j = 0; j < enemies.length; j++){

        let playerRight = player.x+player.width
        let playerLeft = player.x
        let playerTop = player.y
        let playerBottom = player.y+player.height
        let enemyRight = enemies[j].x+enemies[j].width
        let enemyLeft = enemies[j].x
        let enemyTop = enemies[j].y
        let enemyBottom = enemies[j].y+enemies[j].height


      
        if (player != undefined 
            && playerTop <= enemyBottom
            && playerRight >= enemyLeft 
            && playerLeft <= enemyRight
            && playerBottom >= enemyTop
        ){        
            player.alive = false;
 
            if (player.img.src != "nix.png"){
                player.img.src = "explosion.png";
            }

            setTimeout(function(){player.img.src = "nix.png"; 
                                  player.x = undefined;
                                  player.y = undefined;
                                  setTimeout( gameReset(), 3000);}, 1000);

            //
        };
    }
  
};



//Update Funktionen
function updatePlayer(){
 
 if (player.alive){ // man kann nur steuern wenn player am leben ist

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

    if (!player.alive){
        setup();
    }

}

};

function updateEnemies(){
    for (let i = 0; i < enemies.length; i++){
	   
        if (enemies.length > 0){ // mach das folgende nur wenn enemies array etwas enthält
            
            //bewegen
            enemies[i].move();
            //wenn health weg - enemy weg
            if (enemies[i].health <=0 || enemies[i].y > canvas.height){
                enemies.splice(i,1 );
            }
    
            //wenn speed größer 5 dann speedster bild
            if (enemies[i].speed >= 5){
            enemies[i].img = enemies[i].img2;  
            }else {enemies[i].img = enemies[i].img;}


            //wenn speedster, dann beweg dich auf den player zu
            if (enemies[i].img == enemies[i].img2){
                if (enemies[i].x >= player.x){
                    enemies[i].x = enemies[i].x - 2
                    } else{
                    enemies[i].x = enemies[i].x + 2
                }
            }
        }else {console.log('nix');}
    }
};


/////////////////////////////Draw Funktionen
function clearFrame(){
    c.clearRect(0 ,0, canvas.width, canvas.height);
};


function drawEnemies(){
    for (let i = 0; i < enemies.length; i++){
        if (enemies.length >0){
            c.drawImage(enemies[i].img, enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
        }
    }
};


function drawPlayer (){
    c.drawImage(player.img, player.x, player.y, player.width, player.height);
};


function drawBullets (){

    if (bullets.length>0){
    for (let i = 0; i< bullets.length; i++) {
 
        bullets[i].y = bullets[i].y-bullets[i].speed;
        c.drawImage(bullets[i].img, bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height);
        if (bullets[i].y <= 0){bullets.splice(i, 1);} ///// An Position 0, eine Bullet aus dem Array enemies löschen, wenn sie am oberen rand angekommen ist 
    }
    }
};

function generateEnemies(){
    for (let i=0; i<1; i++){
        enemy = Object.create (Enemy);
        enemy.x = Math.floor(Math.random() * (canvas.width-enemy.width));
        enemy.speed = enemy.speed + Math.floor(Math.random() * 5);
        enemies.push(enemy);
        spawnSpeed = spawnSpeed +1;
        }

}

function gameReset(){
    location.reload();
}




///////////////////////////////////////////////////////////
///////////     GAME    //////////////////////////////////
//////////////////////////////////////////////////////////

    function setup(){
    ///Event Listener Setup
    window.addEventListener("keydown", arrow_keys_handler, false);
    window.addEventListener("keydown", getInput, false);
    window.addEventListener("keyup", stopInput, false);
    
    player = Object.create(Player);
    player.x = canvas.width/2-player.width/2;
    player.y = canvas.height-player.height*2;
    
    setInterval(generateEnemies, spawnSpeed);
    gameLoop();
    }



    /// Game Loop
    function gameLoop(){
        //Daten aktualisieren
      
        checkCollision();
        updatePlayer();
        updateEnemies();

        //Draw
        clearFrame();
        drawPlayer();
        drawEnemies();
        drawBullets();

        //GUI
        c.font = "50px sans-serif";
        c.fillText(killcount,20,50);
        window.requestAnimationFrame(gameLoop); 
    };

    setup();


};
