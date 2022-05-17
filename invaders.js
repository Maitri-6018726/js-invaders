let player = {
    x: 400, y:560
};

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
    
}
function setup(){
draw();
}


function movePlayer(){
    switch(event.key){
        case "ArrowLeft":
            player.x -= 15;
            break;
        case "ArrowRight":
            player.x += 15;
            break;
        case "ArrowUp":
            player.y -= 15;
            break;
        case "ArrowDown":
            player.y += 15;
}
draw();
}
window.addEventListener("load", setup);
window.addEventListener("keydown", movePlayer);