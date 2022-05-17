let player = {
    x: 400, y:560
};

let bullets = [];

let direction = {
    left: false,
    right: false,
    up: false,
    down: false,
};

function update(){
    if(direction.left == true){
        if(player.x > 30){
        player.x -= 10;
        }
    }
    if(direction.right == true){
        if(player.x < 770){
        player.x += 10;
        }
    }
    if(direction.up == true){
        if(player.y > 0){
        player.y -= 10;
        }
    }
    if(direction.down == true){
        if(player.y < 560){
        player.y += 10;
        }
    }

    //update
    for(let index = 0; index < bullets.length; index++) {
        bullets[index].y -= 10;
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

    context.fillStyle = "#c93265"
    // context.fillRect(390, 580, 20, 80)
    context.beginPath();
    context.moveTo(player.x, player.y);
    context.lineTo(player.x - 30, player.y +40);
    context.lineTo(player.x + 30, player.y +40);
    context.fill();

    // draw()
    for(let index = 0; index < bullets.length; index++) {
        const bullet = bullets[index];
        context.fillStyle = "#eb4646";
        context.beginPath();
        context.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
        context.fill();
        }
    
    // if(bullet != null) {
    //     context.fillStyle = "#eb4646";
    //     context.beginPath();
    //     context.arc(bullet.x, bullet.y, 10, 0, Math.PI * 2);
    //     context.fill();
    // }
}
function setup(){
    draw();
}


function keydown(event){
    switch(event.key){
        case "ArrowLeft":
            direction.left = true
            // player.x -= 15;
            break;
        case "ArrowRight":
            direction.right = true
            // player.x += 15;
            break;
        case "ArrowUp":
            direction.up = true
            // player.y -= 15;
            break;
        case "ArrowDown":
            direction.down = true
            // player.y += 15;
            break
        case " ":
            bullets.push( {
                x: player.x,
                y: player.y
            });
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