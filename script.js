const dino = document.getElementById('dino');
const rock = document.getElementById('rock');
const score = document.getElementById('score');
const playText = document.getElementById('play');

let gameRunning = false;
let gameStarted = false;
let gameLoop;

let currentScore = 0;
let passedRock = false;

// Speed control
let baseSpeed = 1.5;   // initial animation duration (seconds)
let currentSpeed = baseSpeed;
let minSpeed = 0.4;    // max speed limit (lower = faster)


// Jump Function
function jump(){
    if(!gameRunning) return;

    if(dino.classList.contains('jump-animation')) return;

    dino.classList.add('jump-animation');

    setTimeout(() => {
        dino.classList.remove('jump-animation');
    }, 500);
}


function startGame(){
    gameRunning = true;
    gameStarted = true;
    currentScore = 0;
    score.innerText = currentScore;


    playText.style.display = "none";
    // ✅ Start rock movement here
    rock.style.animation = `rock ${currentSpeed}s linear infinite`;

    gameLoop = setInterval(() => {

        const dinoTop = parseInt(
            window.getComputedStyle(dino).getPropertyValue('top')
        );

        const rockLeft = parseInt(
            window.getComputedStyle(rock).getPropertyValue('left')
        );

        // Collision
        if(rockLeft < 60 && rockLeft > 0 && dinoTop > 200){
            clearInterval(gameLoop);
            alert("Game Over!\nYour Score: " + currentScore);
            location.reload();
        }

        // Score update
        if(rockLeft < 0 && !passedRock){
            currentScore++;
            score.innerText = currentScore;
            passedRock = true;

            if(currentScore % 10 === 0){
                increaseSpeed();
            }
        }

        if(rockLeft > 500){
            passedRock = false;
        }

    }, 50);
}



function increaseSpeed(){
    currentSpeed = currentSpeed * 0.75;

    if(currentSpeed < minSpeed){
        currentSpeed = minSpeed;
    }


    rock.style.animation = "none";
    rock.offsetHeight; // force reflow
    rock.style.animation = `rock ${currentSpeed}s linear infinite`;
}


// Input Handler
function handleInput(e){

    if(e.type === "touchstart") e.preventDefault();

    if(!gameStarted){
        startGame();
        return;
    }

    jump();
}


// Controls
document.addEventListener('keydown', handleInput);
document.addEventListener('click', handleInput);
document.addEventListener('touchstart', handleInput, { passive: false });
