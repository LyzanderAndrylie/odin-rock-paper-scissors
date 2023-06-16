/**
 * Randomly returns "rock"/"paper"/"scissors".
 * @returns {string} "rock"/"paper"/"scissors".
 */
function getComputerChoice() {
    const computerChoice = Math.floor(Math.random() * 3);

    switch (computerChoice) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        default:
            return "scissors";
    }
}

/**
 * Plays one round of rock paper scissors and determines the winner.
 * @param {string} playerSelection - "rock"/"paper"/"scissors" (case insensitive).
 * @param {string} computerSelection - "rock"/"paper"/"scissors" (case insensitive).
 * @returns {string} player status ("DRAW"/"WIN"/"LOSE").
 */
function playRound(playerSelection, computerSelection) {
    const playerSelectionLower = playerSelection.toLowerCase();
    const computerSelectionLower = computerSelection.toLowerCase();

    if (playerSelectionIsValid(playerSelectionLower)) {
        return "Player selection invalid!"
    }

    // Create adjacency list for Rock Paper Scissors directed graph.
    // Edge (x, y) means x beats y.
    const adjList = new Map([
        ["rock", "scissors"],
        ["scissors", "paper"],
        ["paper", "rock"]
    ]);

    if (playerSelectionLower === computerSelectionLower) {
        return "DRAW";
    } else if (adjList.get(playerSelectionLower) === computerSelectionLower) {
        return "WIN";
    } else {
        return "LOSE";
    }
}

function playerSelectionIsValid(playerSelection) {
    return playerSelection !== "rock" && playerSelection !== "paper" && playerSelection !== "scissors";
}

let playerScore = 0;
let computerScore = 0;
let totalDraw = 0;
let currentRound = 0;
const scoreToWin = 5;

/**
 * Starts the rock paper scissors game.
 */
function game() {
    enableAllInput();
    addInfoBoard();
    addResetButton();
    addAllSelectionsListener();
}

function addAllSelectionsListener() {
    const selections = document.querySelectorAll("#player input");
    selections.forEach((selection) => {
        selection.addEventListener("click", () => {
            const playerSelection = selection.dataset.key;
            setElementBrightness(selection, 100);

            const computerSelection = getComputerChoice();
            const computerSelectionInput = document.querySelector(`#computer input[data-key="${computerSelection}"]`);
            setElementBrightness(computerSelectionInput, 100);

            const result = playRound(playerSelection, computerSelection)
            updateScore(result);
            updateInfo();

            disableAllInput();
            setTimeout(() => {
                resetInputBrightness();
                if (existWinner()) {
                    reportWinner();
                    resetScore();
                    addPlayAgainAndBackHomeButton();
                } else {
                    enableAllInput();
                }
            }, 1000);

        })
    });
}

function setElementBrightness(elem, percent) {
    elem.style.filter = `brightness(${percent}%)`;
}

function existWinner() {
    return playerScore == scoreToWin || computerScore == scoreToWin;
}

// UPDATE
function updateScore(result) {
    switch (result) {
        case "WIN":
            playerScore++;
            break;
        case "LOSE":
            computerScore++;
            break;
        case "DRAW":
            totalDraw++;
            break;
    }
}

function updateInfo() {
    updateRound(currentRound++)
    updateScoreBoard()
}

function updateRound(round) {
    const roundDiv = document.getElementById("round-number");
    roundDiv.textContent = round;
}

function updateScoreBoard() {
    const playerScoreDiv = document.getElementById("player-score");
    const computerScoreDiv = document.getElementById("computer-score");

    playerScoreDiv.textContent = String(playerScore);
    computerScoreDiv.textContent = String(computerScore);
}

// RESET
function resetGame() {
    resetScore();
    resetInfoBoard();
    resetInputBrightness();
    removeAllSelectionsListener();
    addPlayButton();
}

function resetScore() {
    playerScore = 0;
    computerScore = 0;
    totalDraw = 0;
    currentRound = 0;
}

function resetInfoBoard() {
    const infoDiv = document.getElementById("info");
    infoDiv.textContent = "First to 5 win the game";
}

function removeAllSelectionsListener() {
    const selections = document.querySelectorAll("#player input");

    selections.forEach((selection) => {
        selection.replaceWith(selection.cloneNode(true));
    });
}

// INPUT
function resetInputBrightness() {
    const selections = document.querySelectorAll("input");

    selections.forEach((selection) => {
        selection.style.removeProperty("filter");
    })
}

function disableAllInput() {
    const selections = document.querySelectorAll("input");

    selections.forEach((selection) => {
        selection.disabled = true;
    })
}

function enableAllInput() {
    const selections = document.querySelectorAll("input");

    selections.forEach((selection) => {
        selection.disabled = false;
    })
}

// REPORT
function reportWinner() {
    const playerStatus = `(Your status = Win: ${playerScore}; Lose: ${computerScore}; Draw: ${totalDraw})`;

    let result;

    if (playerScore > computerScore) {
        result = "You are the Winner";
    } else if (playerScore < computerScore) {
        result = "Computer is the Winner";
    } else {
        result = "Match ended with Draw";
    }

    const infoDiv = document.getElementById("info");
    infoDiv.innerHTML = `
        <p>${result}</p>
        <p>${playerStatus}</p>
    `;
}

// PLAY and RESET button
function addResetButton() {
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset";
    resetButton.classList.add("reset");
    resetButton.addEventListener("click", resetGame);

    const buttonContainer = document.getElementById("button");
    buttonContainer?.replaceChildren(resetButton);
}

function addPlayButton() {
    const playButton = document.createElement("button");
    playButton.textContent = "Play";
    playButton.classList.add("play");
    playButton?.addEventListener("click", () => {
        game();
    });

    const buttonContainer = document.getElementById("button");
    buttonContainer?.replaceChildren(playButton);
}

function addPlayAgainAndBackHomeButton() {
    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again?";
    playAgainButton.classList.add("play");
    playAgainButton?.addEventListener("click", () => {
        resetGame();
        game();
    });

    const backHomeButton = document.createElement("button");
    backHomeButton.textContent = "Back to home";
    backHomeButton.classList.add("reset");
    backHomeButton.addEventListener("click", resetGame);

    const buttonContainer = document.getElementById("button");
    buttonContainer?.replaceChildren(playAgainButton);
    buttonContainer?.appendChild(backHomeButton);
}

function addInfoBoard() {
    const info = `
        <div id="round">
                <div>Round</div>
                <div id="round-number">0</div>
            </div>
            <div class="vertical-line"></div>
            <div id="score">
                <div>Score</div>
                <table>
                    <thead>
                        <tr>
                            <th>You</th>
                            <th rowspan="2">Computer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id="player-score">0</td>
                            <td id="computer-score">0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    `;

    const infoDiv = document.getElementById("info");
    infoDiv.innerHTML = info;
}

addPlayButton();