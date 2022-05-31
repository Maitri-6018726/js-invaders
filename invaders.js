class Bullet {
    x;
    y;

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    update(){
        this.y -= 10;
    }

    draw(context){
        context.fillStyle = "#eb4646";
        context.beginPath();
        context.arc(this.x, this    .y, 5, 0, Math.PI * 2);
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
    context.fillStyle = "#c93265"
    // context.fillRect(390, 580, 20, 80)
    context.beginPath();
    context.moveTo(player.x, player.y);
    context.lineTo(player.x - 30, player.y +40);
    context.lineTo(player.x + 30, player.y +40);
    context.fill();
    }
};


let bullets = [];

let direction = {
    left: false,
    right: false,
    up: false,
    down: false,
};

function update(){
    player.update();

    //update
    for(let index = 0; index < bullets.length; index++) {
        const bullet = bullets[index];
        bullet.update();
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
    for(let index = 0; index < bullets.length; index++) {
        const bullet = bullets[index];
        bullet.draw(context)
        }
}
function setup(){
    draw();
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
            break

        case " ":
            let bullet = player.shoot();
            bullets.push( bullet);
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
            break
    }
}
window.addEventListener("load", setup);
window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);

setInterval(update, 50);