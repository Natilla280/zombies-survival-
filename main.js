const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const menu = document.getElementById("menu");
const playButton = document.getElementById("playButton");

playButton.onclick = () => {

menu.style.display = "none";

canvas.style.display = "block";

gameLoop();

}

function gameLoop(){

ctx.fillStyle="#081008";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="white";
ctx.font="35px Arial";
ctx.fillText("Zombie Survival - Versión 1",40,60);

requestAnimationFrame(gameLoop);

}
