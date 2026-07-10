const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const menu = document.getElementById("menu");
const playButton = document.getElementById("playButton");

let gameRunning = false;

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 25,
    speed: 5,
    color: "#00bfff",
    health: 100
};

const keys = {};

const zombies = [];
const bullets = [];

let score = 0;

window.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
});

playButton.onclick = () => {
    menu.style.display = "none";
    canvas.style.display = "block";
    gameRunning = true;
    spawnZombie();
    gameLoop();
};
function movePlayer() {

    if (keys["w"]) player.y -= player.speed;
    if (keys["s"]) player.y += player.speed;
    if (keys["a"]) player.x -= player.speed;
    if (keys["d"]) player.x += player.speed;

    player.x = Math.max(player.size, Math.min(canvas.width - player.size, player.x));
    player.y = Math.max(player.size, Math.min(canvas.height - player.size, player.y));

}
function drawPlayer(){

    ctx.fillStyle = player.color;

    ctx.beginPath();

    ctx.arc(player.x, player.y, player.size, 0, Math.PI*2);

    ctx.fill();

}
function gameLoop(){

    if(!gameRunning) return;

    ctx.fillStyle="#081008";

    ctx.fillRect(0,0,canvas.width,canvas.height);

    movePlayer();

    drawPlayer();

    requestAnimationFrame(gameLoop);

}
