let score = 0;
let cross = true;
let gameRunning = true;
let gameInterval;

let audio = new Audio('music1.mp3');
let audiogo = new Audio('music2.mp3');

// start music
setTimeout(() => {
    audio.loop = true;
    audio.play();
}, 500);

// Controls
document.onkeydown = function (e) {
    if (!gameRunning) return;

    let dino = document.querySelector('.dino');

    // Jump
    if (e.keyCode === 38) {
        if (!dino.classList.contains('animatedino')) {
            dino.classList.add("animatedino");
            setTimeout(() => {
                dino.classList.remove("animatedino");
            }, 600);
        }
    }
if (e.keyCode === 39) {
    let dx = parseInt(getComputedStyle(dino).left);
    dino.style.left = dx + 50 + "px";
    dino.classList.remove("flip");
}

// Move Left (face backward)
if (e.keyCode === 37) {
    let dx = parseInt(getComputedStyle(dino).left);
    dino.style.left = dx - 50 + "px";
    dino.classList.add("flip");
}
};

// GAME LOOP
gameInterval = setInterval(() => {
    if (!gameRunning) return;

    let dino = document.querySelector('.dino');
    let obstacle = document.querySelector('.obstacle');

    let dx = parseInt(getComputedStyle(dino).left);
    let dy = parseInt(getComputedStyle(dino).top);
    let ox = parseInt(getComputedStyle(obstacle).left);
    let oy = parseInt(getComputedStyle(obstacle).top);

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    // COLLISION
    if (offsetX < 80 && offsetY < 60) {
        endGame();
    }

    // SCORE
    else if (offsetX < 150 && cross) {
        score++;
        updateScore(score);
        cross = false;
        setTimeout(() => cross = true, 1000);
    }

}, 100);

// END GAME
function endGame() {
    gameRunning = false;

    let obstacle = document.querySelector('.obstacle');
    obstacle.classList.remove('obstacleAni');

    audio.pause();
    audiogo.play();

    document.getElementById("replayBox").style.display = "block";
}

// UPDATE SCORE
function updateScore(score) {
    document.getElementById("scoreContainer").innerHTML =
        "Your Score: " + score;
}

// RESTART GAME
function restartGame() {
    location.reload();
}
