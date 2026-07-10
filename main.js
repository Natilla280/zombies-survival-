parte // ===============================
// ZOMBIE SURVIVAL - PARTE 1
// ===============================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const menu = document.getElementById("menu");
const playButton = document.getElementById("playButton");

let gameRunning = false;
let score = 0;

const keys = {};
const bullets = [];
const zombies = [];

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    speed: 5,
    health: 100,
    color: "#2ea8ff"
};

window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

canvas.addEventListener("click", shoot);

playButton.addEventListener("click", () => {
    menu.style.display = "none";
    canvas.style.display = "block";

    gameRunning = true;

    setInterval(spawnZombie, 1500);

    gameLoop();
});

function movePlayer() {

    if (keys["w"]) player.y -= player.speed;
    if (keys["s"]) player.y += player.speed;
    if (keys["a"]) player.x -= player.speed;
    if (keys["d"]) player.x += player.speed;

    player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));

}

function drawPlayer() {

    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();

}

function shoot(e) {

    const rect = canvas.getBoundingClientRect();

    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const angle = Math.atan2(my - player.y, mx - player.x);

    bullets.push({
        x: player.x,
        y: player.y,
        dx: Math.cos(angle) * 10,
        dy: Math.sin(angle) * 10,
        radius: 5
    });

}

function updateBullets() {

    for (let i = bullets.length - 1; i >= 0; i--) {

        const b = bullets[i];

        b.x += b.dx;
        b.y += b.dy;

        if (
            b.x < 0 ||
            b.x > canvas.width ||
            b.y < 0 ||
            b.y > canvas.height
        ) {
            bullets.splice(i, 1);
        }

    }

}

function drawBullets() {

    ctx.fillStyle = "yellow";

    bullets.forEach((b) => {

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();

    });

}
// ===============================
// ZOMBIE SURVIVAL - PARTE 2
// ===============================

function spawnZombie() {

    const side = Math.floor(Math.random() * 4);

    let x, y;

    if (side === 0) {
        x = Math.random() * canvas.width;
        y = -30;
    }

    if (side === 1) {
        x = canvas.width + 30;
        y = Math.random() * canvas.height;
    }

    if (side === 2) {
        x = Math.random() * canvas.width;
        y = canvas.height + 30;
    }

    if (side === 3) {
        x = -30;
        y = Math.random() * canvas.height;
    }

    zombies.push({
        x,
        y,
        radius: 18,
        speed: 1.6,
        health: 1
    });

}

function updateZombies() {

    for (let i = zombies.length - 1; i >= 0; i--) {

        const z = zombies[i];

        const angle = Math.atan2(player.y - z.y, player.x - z.x);

        z.x += Math.cos(angle) * z.speed;
        z.y += Math.sin(angle) * z.speed;

        // Golpea al jugador
        const dx = player.x - z.x;
        const dy = player.y - z.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < player.radius + z.radius) {

            player.health -= 0.15;

            if (player.health <= 0) {

                gameRunning = false;

                alert("💀 GAME OVER\n\nPuntaje: " + score);

                location.reload();

            }

        }

        // Colisión con balas
        for (let j = bullets.length - 1; j >= 0; j--) {

            const b = bullets[j];

            const dx2 = b.x - z.x;
            const dy2 = b.y - z.y;

            const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

            if (dist2 < b.radius + z.radius) {

                bullets.splice(j,1);
                zombies.splice(i,1);

                score++;

                break;

            }

        }

    }

}

function drawZombies() {

    ctx.fillStyle = "#41ff41";

    zombies.forEach(z=>{

        ctx.beginPath();

        ctx.arc(z.x,z.y,z.radius,0,Math.PI*2);

        ctx.fill();

    });

}

function drawHUD(){

    ctx.fillStyle="white";

    ctx.font="26px Arial";

    ctx.fillText("❤️ Vida: "+Math.floor(player.health),20,40);

    ctx.fillText("🏆 Puntos: "+score,20,80);

}
