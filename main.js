const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.style.display = "block";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "red";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "yellow";
ctx.font = "50px Arial";
ctx.fillText("SI VES ESTO, EL CANVAS FUNCIONA", 50, 100);
