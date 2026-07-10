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
