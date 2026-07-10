alert("main.js cargó");

const canvas = document.getElementById("gameCanvas");

alert(canvas);

const ctx = canvas.getContext("2d");

alert("ctx creado");

canvas.style.display = "block";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "red";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "yellow";
ctx.font = "50px Arial";
ctx.fillText("FUNCIONA", 50, 100);
