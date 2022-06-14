const enemy1 = new Image();
enemy1.src = "enemy1.png"


class Enemy{
    x;
    y;
    size;
    hp;
    cooldown;

    constructor(x,y, size, hp){
        this.x = x;
        this.y = y;
        this.size = size;
        this.hp = hp;
        this.cooldown = 0;
    }

    draw(context){
        context.drawImage(enemy1, this.x, this.y, this.size, this.size)
    }

    update(){
        if(this.cooldown == 0){
        this.x += Math.random()*10-5;
        this.y += Math.random()*10-5;
        this.cooldown = 20;
        }

        this.cooldown -=1;
    }

    hit(bullet){
        if(bullet.x >= this.x && 
           bullet.y >= this.y &&
           bullet.x <= this.x + this.size &&
           bullet.y <= this.y + this.size
           ){
            this.hp -= 10;
            return true
        }else{
            return false    
        }
    }
}

//new enemey (10, 20, 5, 50)

class Bullet {
    x;
    y;

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    update(){
        this.y -= 25;
    }

    draw(context){
        context.fillStyle = "#d9d13d";
        context.beginPath();
        context.arc(this.x, this.y, 5, 0, Math.PI * 2);
        context.fill();
        }
    }

    let player = {
    x: 400, 
    y:560,

    shoot: function(){
        return new Bullet(this.x, this.y);
    },

    update: function(){
    if(direction.left == true){
        if(this.x > 30){
        this.x -= 10;
        }
    }
    if(direction.right == true){
        if(this.x < 770){
        this.x += 10;
        }
    }
    if(direction.up == true){
        if(this.y > 0){
        this.y -= 10;
        }
    }
    if(direction.down == true){
        if(this.y < 560){
        this.y += 10;
        }
    }
},

    draw: function(context){
    context.fillStyle = "#c73dd9"
    // context.fillRect(390, 580, 20, 80)
    context.beginPath();
    context.moveTo(player.x, player.y);
    context.lineTo(player.x - 30, player.y +40);
    context.lineTo(player.x + 30, player.y +40);
    context.fill();
    }
};


let bullets = [];
let enemies = [];

let direction = {
    left: false,
    right: false,
    up: false,
    down: false,
    shoot: false,
};

function update(){
    player.update();

    if(direction.shoot){
        let bullet = player.shoot();
        bullets.push(bullet);
    }

    //update
    for(let index = 0; index < bullets.length; index++) {
        const bullet = bullets[index];
        bullet.update();
    }

    for(let index =0; index < enemies.length; index++){
        const enemey = enemies[index];
        enemey.update();
    }

    for(let bindex = 0; bindex < bullets.length; bindex++){
        const bullet = bullets[bindex];

        for(let eindex = 0; eindex < enemies.length; eindex++){
            const enemey = enemies[eindex];

            if(enemey.hit(bullet)) {
                bullets.splice(bindex, 1)
            }
        }

    }

    draw();
}

function draw(){
    let canvas = document.getElementById("invaders-canvas");
    let context = canvas.getContext("2d")

    context.fillStyle = "#18106b";
    context.fillRect(0, 0, 800, 600);

    context.fillStyle = "#aeff45"
    context.font= "48px Macondo, cursive";
    context.fillText("Space Invaders", 20, 50);

    player.draw(context);

    // draw()
    
    for(let index = 0; index < enemies.length; index++){
        const enemey = enemies [index];
        enemey.draw(context);
    }

    for(let index = 0; index < bullets.length; index++) {
        const bullet = bullets[index];
        bullet.draw(context)
        }
}
function setup(){
    draw();
    let enemey = new Enemy(370, 200, 90, 50)
    enemies.push(enemey);
}


function keydown(event){
    switch(event.key){
        case "ArrowLeft":
            direction.left = true
            break;

        case "ArrowRight":
            direction.right = true
            break;

        case "ArrowUp":
            direction.up = true
            break;

        case "ArrowDown":
            direction.down = true
            break;

        case " ":
            direction.shoot = true
            break;
    }
}

function keyup(event){
    switch(event.key){
        case "ArrowLeft":
            direction.left = false
            break;
        case "ArrowRight":
            direction.right = false
            break;
        case "ArrowUp":
            direction.up = false
            break;
        case "ArrowDown":
            direction.down = false
            break;

        case " ":
            direction.shoot = false;
            break;
    }
}
window.addEventListener("load", setup);
window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);

setInterval(update, 50);