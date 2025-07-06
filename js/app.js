
const animalSounds = {
    elephant: new Audio('assets/sounds/elephant.mp3'),
    giraffe: new Audio('assets/sounds/giraffe.mp3'),
    zebra: new Audio('assets/sounds/zebra.mp3'),
    rhino: new Audio('assets/sounds/rhino.mp3'),
    lion: new Audio('assets/sounds/lion.mp3'),
    cheetah: new Audio('assets/sounds/cheetah.mp3'),
    hyeena: new Audio('assets/sounds/hyeena.mp3'),
    meerkat: new Audio('assets/sounds/meerkat.mp3'),
    hippo: new Audio('assets/sounds/hippo.mp3'),
    buffalo: new Audio('assets/sounds/buffalo.mp3'),
    leopard: new Audio('assets/sounds/leopard.mp3'),
    camel: new Audio('assets/sounds/camel.mp3'),
};

let sequence = [];
let playerSequence = [];
let score = 0;
let highScore = 0;

let timeElapsed = 0;
let timer;
let acceptinput = false;

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const landingPage = document.getElementById('landing-page');
    const gameArea = document.getElementById ('game-area');
    const feedback = document.getElementById('feedback');
    const animals = Array.from(document.querySelectorAll('.animal'));
    animals.forEach((animal, index) => {
        animal.addEventListener('click', () => {
            if (!acceptInput) return;
            playerSequence.push(index);
            animateAnimal(index);
            checkPlayerInput();
        });
    const restartButton = document.getElementById('restart-button');

    restartButton.addEventListener('click', () => {
        restartGame();
    })
    });

function startTimer() {
    timeElapsed = 0;
    updateTimerDisplay();

    timer = setInterval (() => {
        timeElapsed++;
        updateTimerDisplay();
    }, 1000);
}
function stopTimer() {
    clearInterval(timer);
}

function nextRound() {
    acceptInput = false;
    playerSequence = [];

    const nextAnimalIndex = Math.floor(Math.random() * animals.length);
    sequence.push(nextAnimalIndex);
    playSequence();
}

function playSequence () {
    let i = 0;

    const interval = setInterval(() => {
        if (i > 0) resetAnimalStyle(sequence[i - 1]);

        if (i === sequence.length) {
            clearInterval(interval);
            acceptInput = true;
            feedback.textContent = "Your Turn!";
            return;
        }
        animateAnimal(sequence[i]);
        i++;
    }, 1000);
}

function animateAnimal(index) {
    const animal = animals[index];
    
    if (!animal) {
        return;
    }
    
    const animalId = animal.id;

    animal.classList.add("flash");
    animal.style.outline = "3px solid gold";

    setTimeout(() => {
        animal.classList.remove("flash");
    }, 400);

    const sound = animalSounds[animalId];
    if (sound) {
        if (!sound.paused) sound.pause();
        sound.currentTime = 0;

        setTimeout(() => {
            sound.play();
        }, 10);
    }
}

function resetAnimalStyle(index) {
    const animal = animals[index];
    animal.style.outline = "none";
}

function checkPlayerInput() {
    const currentIndex = playerSequence.length -1;

    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
        gameOver();
        return;
    }

    if (playerSequence.length === sequence.length) {
        score += 100;
        updateScore();
        feedback.textContent = "Correct!";
        setTimeout(nextRound, 1000);
    }
}

function updateScore() {
    const scoreDisplay = document.getElementById('score');
    const highScoreDisplay = document.getElementById('high-score');

    scoreDisplay.textContent = `Score: ${score}`;

    if (score > highScore) {
        highScore = score;
    }

    highScoreDisplay.textContent = `High Score: ${highScore}`;
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer');

    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;

    const formattedTime = `${padTime(minutes)}:${padTime(seconds)}`;
    timerDisplay.textContent = `Time: ${formattedTime}`;
}

function padTime(unit) {
    return unit < 10 ? `0${unit}` : unit;
}

function gameOver() {
    stopTimer();
    acceptinput = false;
    
    const finalMessage = document.getElementById('final-message');
    const gameOverScreen = document.getElementById('game-over');

    gameArea.style.display = 'none';
    document.getElementById('game-over').style.display = 'block';

    finalMessage.textContent = `Game Over! Your score: ${score}. High score: ${highScore}`;

    feedback.textContent = "Wrong! Game Over.";
}

function restartGame() {
    Object.values(animalSounds).forEach((sound) => {
        sound.pause();
        sound.currentTime = 0;
    });
    stopTimer();

    sequence = [];
    playerSequence = [];
    score = 0;
    timeElapsed = 0;
    acceptinput = false;

    updateScore();
    updateTimerDisplay();

    gameArea.style.display = 'block';

    const gameOverScreen = document.getElementById ('game-over');
    gameOverScreen.style.display = 'none';

    startTimer();
    nextRound();

    feedback.textContent = "Watch and Pay Attention to the Sequence!";
}

    startButton.addEventListener('click', () => {
        landingPage.style.display = 'none';
        gameArea.style.display = 'block';

        score = 0;
        updateScore();
        timeElapsed = 0;
        startTimer();
        nextRound();
    });
});
