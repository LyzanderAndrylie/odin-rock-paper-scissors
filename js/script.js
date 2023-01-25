/**
 * @param {string} word 
 */
function wordTitleCase(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

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
 * @param {string} playerSelection
 * @param {string} computerSelection
 */
function playRound(playerSelection, computerSelection) {
    const playerSelectionLowerCase = playerSelection.toLowerCase();

    // Check playerSelection
    if (playerSelectionLowerCase !== "rock" && playerSelectionLowerCase !== "paper" && playerSelectionLowerCase !== "scissors") {
        return "Player selection invalid!"
    }

    // Create adjacency list for Rock Paper Scissors graph
    // Rock Paper Scissors graph is directed graph
    // Edge (x, y) means x beats y
    const adjList = new Map();
    adjList.set("rock", "scissors");
    adjList.set("scissors", "paper");
    adjList.set("paper", "rock");

    if (playerSelectionLowerCase === computerSelection) {
        return `Draw! ${wordTitleCase(playerSelection)} draws with ${wordTitleCase(computerSelection)}`;
    } else if (adjList.get(playerSelectionLowerCase) === computerSelection) {
        return `You Win! ${wordTitleCase(playerSelection)} beats ${wordTitleCase(computerSelection)}`;
    } else {
        return `You Lose! ${wordTitleCase(playerSelection)} is defeated by ${wordTitleCase(computerSelection)}`
    }
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    let totalDraw = 0;
    let totalInvalid = 0;
    const totalRound = 5;

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

    // Report Winner
    if (playerScore > computerScore) {
        console.log(`Player is the Winner ${playerStatus}`);
    } else if (playerScore < computerScore) {
        console.log(`Computer is the Winner ${playerStatus}`);
    } else {
        console.log(`Match ended with Draw ${playerStatus}`);
    }
}

// Start game
game();