/**
 * Converts the specified word to Title Case.
 * @param {string} word
 * @returns {string} word in Title Case.
 */
function wordTitleCase(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

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
 * @returns {string} message that inform the result.
 */
function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    // Check playerSelection validity
    if (playerSelection !== "rock" && playerSelection !== "paper" && playerSelection !== "scissors") {
        return "Player selection invalid!"
    }

    // Create adjacency list for Rock Paper Scissors directed graph.
    // Edge (x, y) means x beats y.
    const adjList = new Map();
    adjList.set("rock", "scissors");
    adjList.set("scissors", "paper");
    adjList.set("paper", "rock");

    if (playerSelection === computerSelection) {
        return `Draw! ${wordTitleCase(playerSelection)} draws with ${wordTitleCase(computerSelection)}`;
    } else if (adjList.get(playerSelection) === computerSelection) {
        return `You Win! ${wordTitleCase(playerSelection)} beats ${wordTitleCase(computerSelection)}`;
    } else {
        return `You Lose! ${wordTitleCase(playerSelection)} is defeated by ${wordTitleCase(computerSelection)}`
    }
}

/**
 * Starts the rock paper scissors game.
 */
function game() {
    let playerScore = 0;
    let computerScore = 0;
    let totalDraw = 0;
    let totalInvalid = 0;
    const totalRound = 5;

    // Play round
    for (let i = 1; i <= totalRound; i++) {
        const playerSelection = prompt(`Round ${i}: Enter your selection (Rock/Paper/Scissors) `) ?? "";
        const computerSelection = getComputerChoice();
        const result = `Round ${i}: ${playRound(playerSelection, computerSelection)}`;
        console.log(result);

        if (result.includes("Win")) {
            playerScore++;
        } else if (result.includes("Lose")) {
            computerScore++;
        } else if (result.includes("Draw")) {
            totalDraw++;
        } else {
            totalInvalid++;
        }
    }

    const playerStatus = `(Your status = W: ${playerScore}; L: ${computerScore}; D: ${totalDraw}; I: ${totalInvalid})`;

    // Report winner
    if (playerScore > computerScore) {
        console.log(`Player is the Winner ${playerStatus}`);
    } else if (playerScore < computerScore) {
        console.log(`Computer is the Winner ${playerStatus}`);
    } else {
        console.log(`Match ended with Draw ${playerStatus}`);
    }
}

game();