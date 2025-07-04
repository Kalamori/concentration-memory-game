/*--------------------------------- Pseudo ---------------------------------*/

// * Considerations:
// * Loading Title Screen when page loads.
// * Eight characters on the screen equally spaced out.
// * Start button to start the gane.
// * Character movement with single audio sound assigned to each character.
// * Display the current score on the screen (id="score-display") (localStorage.setItem("score", "score-display");) (scoreDisplay.textContent = `score: ${score}`;)
// * Player clicks correct sequence, next turn starts, 100 points to player
// * Player clicks incorrect sequence, game over, final score and highest score achieved displayed. (`Game over! Your final score is: ${score}`)

// Inputs (user submitted or computer generated)
// * User will click the start button to start the game.
// * Computer will move the character/s with a single audio sound attached to that character in a increasing sequence.
// * Computer will move all characters at once with a specific audio sound attached to show that the sequence for this turn is over.
// * User will click the character/s that moved in the building sequence correctly or incorrectly. 

// Variables & State (think scores, choices, timers, lives etc)
// * IF user clicks characters in the sequence correctly, then score will increase by 100.
// * IF user clicks characters in the sequence correctly, then computer will add one character movement to the sequence.
// * IF user clicks characters in the sequence incorrectly, then game will end.
// * IF user clicks characters in the sequence incorrectly, current score & high score will be displayed in center with "Game Over" message.
// * Timer will show in the top left hand corner for game duration
// * Timer will stop when the game is over.

// User Interactions (user initiated events like clicks, hovers, key presses etc)
// * User clicks on the characters in the correct sequence.
// * User clicks on the characters in the incorrect sequence.

// Core Logic / Rules (List the core rules that will dictate the win lose condition)
// * Lose condition - player incorrectly inputs turn's sequence
// * High score condition - player succesfully remembers and inputs correct turn sequence multiple times.


// Conditions / Branching (which conditions will lead to which things happening)
// * Character movement turn to turn increases by one.
// * Character movement follows a sequence that builds upon the last turn.
// * Character movement added each turn is randomly chosen via a random number generator.
// * Scoring - player correctly chosing turns sequence increases score.


// Loops (if any) (does any logic repeat? For example a ticking timer or in a game of poker maybe multiple computer choices generated on a loop)
// * Character movement loop
// * Player input loop
// * Increasing timer loop
// * Scoring and Game Status Loop

// Outputs / Feedback (What will the app output to the screen)
// * Character movement (computer): each turn characters will move in a sequence increasing by 1 each turn.
// * Character movement (player): each turn characters will move when player clicks on them.
// * Score display: indicator of players score on the top left of the screen.
// * Game over message: indicator of if the player has met the lose condition (incorrect sequence clicked)
// * Final game score and Highest game score achieved.


/*-------------------------------- Constants --------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const landingPage = document.getElementById('landing-page');
    const gameArea = document.getElementById ('game-area');

    startButton.addEventListener('click', () => {
        landingPage.style.display = 'none';
        gameArea.style.display = 'block';
    });
});
/*-------------------------------- Variables --------------------------------*/
let sequence = [];
let playerSequence = [];
let score = 0;
let highScore = 0;

let timeElapsed = 0;
let timer;

/*------------------------ Cached Element References ------------------------*/

/*-------------------------------- Functions --------------------------------*/
function startTimer() {
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

    playerSequence();
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
// Sounds!
        i++;
    }, 1000);
}
/*----------------------------- Event Listeners -----------------------------*/
