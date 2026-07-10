const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const menu = document.getElementById("menu");
const playButton = document.getElementById("playButton");

let running = false;
let score = 0;

const keys = {};

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    speed: 5,
    hp: 100
};

const bullets = [];
const zombies = [];

window.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
});

canvas.addEventListener("click", shoot);

playButton.onclick = () => {

    menu.style.display = "none";

    canvas.style.display = "block";

    running = true;

    setInterval(spawnZombie,1200);

    gameLoop();

};

function movePlayer(){

    if(keys["w"]) player.y -= player.speed;
    if(keys["s"]) player.y += player.speed;
    if(keys["a"]) player.x -= player.speed;
    if(keys["d"]) player.x += player.speed;

    if(player.x<player.radius) player.x=player.radius;
    if(player.y<player.radius) player.y=player.radius;
    if(player.x>canvas.width-player.radius) player.x=canvas.width-player.radius;
    if(player.y>canvas.height-player.radius) player.y=canvas.height-player.radius;

}

function drawPlayer(){

    ctx.beginPath();
    ctx.arc(player.x,player.y,player.radius,0,Math.PI*2);
    ctx.fillStyle="#27a8ff";
    ctx.fill();

}
// ============================
// PARTE 2
// ============================

function shoot(e){

    const rect = canvas.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const angle = Math.atan2(mouseY-player.y,mouseX-player.x);

    bullets.push({

        x:player.x,
        y:player.y,

        dx:Math.cos(angle)*12,
        dy:Math.sin(angle)*12,

        radius:5

    });

}

function updateBullets(){

    for(let i=bullets.length-1;i>=0;i--){

        bullets[i].x+=bullets[i].dx;
        bullets[i].y+=bullets[i].dy;

        if(
            bullets[i].x<0||
            bullets[i].x>canvas.width||
            bullets[i].y<0||
            bullets[i].y>canvas.height
        ){

            bullets.splice(i,1);

        }

    }

}

function drawBullets(){

    ctx.fillStyle="yellow";

    bullets.forEach(b=>{

        ctx.beginPath();

        ctx.arc(b.x,b.y,b.radius,0,Math.PI*2);

        ctx.fill();

    });

}

function spawnZombie(){

    let x;
    let y;

    const side=Math.floor(Math.random()*4);

    if(side===0){

        x=Math.random()*canvas.width;
        y=-30;

    }

    if(side===1){

        x=canvas.width+30;
        y=Math.random()*canvas.height;

    }

    if(side===2){

        x=Math.random()*canvas.width;
        y=canvas.height+30;

    }

    if(side===3){

        x=-30;
        y=Math.random()*canvas.height;

    }

    zombies.push({

        x,
        y,

        radius:18,

        speed:1.5,

        hp:1

    });

}
// ============================
// PARTE 3
// ============================

function updateZombies(){

    for(let i=zombies.length-1;i>=0;i--){

        const z=zombies[i];

        const angle=Math.atan2(player.y-z.y,player.x-z.x);

        z.x+=Math.cos(angle)*z.speed;
        z.y+=Math.sin(angle)*z.speed;

        // Colisión con balas
        for(let j=bullets.length-1;j>=0;j--){

            const b=bullets[j];

            const dx=b.x-z.x;
            const dy=b.y-z.y;

            const dist=Math.sqrt(dx*dx+dy*dy);

            if(dist<z.radius+b.radius){

                bullets.splice(j,1);
                zombies.splice(i,1);

                score++;

                break;

            }

        }

        // Daño al jugador
        const dx=player.x-z.x;
        const dy=player.y-z.y;

        const dist=Math.sqrt(dx*dx+dy*dy);

        if(dist<player.radius+z.radius){

            player.hp-=0.2;

        }

    }

}

function drawZombies(){

    ctx.fillStyle="#43ff43";

    zombies.forEach(z=>{

        ctx.beginPath();

        ctx.arc(z.x,z.y,z.radius,0,Math.PI*2);

        ctx.fill();

    });

}

function drawHUD(){

    ctx.fillStyle="white";

    ctx.font="24px Arial";

    ctx.fillText("❤️ Vida: "+Math.floor(player.hp),20,40);

    ctx.fillText("🏆 Puntos: "+score,20,75);

}
