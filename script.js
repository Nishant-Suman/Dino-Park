const dino = document.getElementById('dino');
const rock = document.getElementById('rock');
const score = document.getElementById('score');
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');

let gameRunning = false;
let gameLoop;


function jump(){
    if(!gameRunning) return;

    dino.classList.add('jump-animation');

    setTimeout(() => {
        dino.classList.remove('jump-animation');
    }, 500);
}


startBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameRunning = true;
    score.innerText = 0;

    gameLoop = setInterval(() => {

        score.innerText = Number(score.innerText) + 1;

        const dinoTop = parseInt(window.getComputedStyle(dino)
            .getPropertyValue('top'));

        const rockLeft = parseInt(window.getComputedStyle(rock)
            .getPropertyValue('left'));

        
        if(rockLeft < 60 && rockLeft > 0 && dinoTop > 200){
            clearInterval(gameLoop);
            alert("Game Over!\nYour Score: " + score.innerText);
            location.reload();
        }

    }, 50);
});


document.addEventListener('keydown', (e) => {
    if(e.code === "Space"){
        jump();
    }
});