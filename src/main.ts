import Game from "./modules/game.js";

let gameBoard : HTMLElement = document.getElementById("gameBoard") as HTMLElement;
let startScreen : HTMLElement = document.getElementById("startScreen") as HTMLElement;
let startButton : HTMLElement = document.getElementById("startButton") as HTMLElement;
let computerButton : HTMLElement = document.getElementById("computerButton") as HTMLElement;
let playerOneInput : HTMLInputElement = document.getElementById("playerOneInput") as HTMLInputElement;
let playerTwoInput : HTMLInputElement = document.getElementById("playerTwoInput") as HTMLInputElement;
let playerOneName : HTMLElement = document.getElementById("playerOneName") as HTMLElement;
let playerTwoName : HTMLElement = document.getElementById("playerTwoName") as HTMLElement;
let playerOneScore : HTMLElement = document.getElementById("playerOneScore") as HTMLElement;
let playerTwoScore : HTMLElement = document.getElementById("playerTwoScore") as HTMLElement;
let gridContainer : HTMLElement = document.getElementById("gridSquares") as HTMLElement;
let gridButtons : NodeListOf<HTMLElement> = gridContainer.querySelectorAll("button");
let resetBoard : HTMLElement = document.getElementById("resetBoard") as HTMLElement;
let resetPlayers : HTMLElement = document.getElementById("resetPlayers") as HTMLElement;

let computerToggle = false;
let game = new Game();

initEvents();

function initEvents() : void {
    startButton.addEventListener("click", onStartButtonClick);
    computerButton.addEventListener("click", onComputerButtonClick);
    resetBoard.addEventListener("click", onResetBoardButtonClick);
    resetPlayers.addEventListener("click", onResetPlayersButtonClick);

    gridButtons.forEach((gridButton : HTMLElement, index : number) => {
    gridButton.addEventListener("click", () => { onGridButtonClick(gridButton, index) })
    });
}

// main game logic
function onGridButtonClick(gridButton : HTMLElement, index : number) : void {
    if (!game.isGameOver() && gridButton.textContent === "") {
        gridButton.textContent = game.playRound(index);

        if (computerToggle && !game.isGameOver()) {
            let computerIndex = game.getBestMove();
            gridButtons[computerIndex].textContent = game.playRound(computerIndex);
        }

        updateScore();
    }
}

// button to reset the board squares
function onResetBoardButtonClick() {
    gridButtons.forEach((gridButton : HTMLElement) => {
        gridButton.textContent = "";
    });
    game.nextRound();
}

// button to reset and choose new player names
function onResetPlayersButtonClick(event : MouseEvent) : void {
    event.preventDefault();

    resetBoard.click();
    game.resetPlayers();

    updateScore();

    computerToggle = false;

    toggleBoard();
}

// button to start a player against player game
function onStartButtonClick(event : MouseEvent) : void {
    event.preventDefault();

    toggleBoard();
    initBoardNames();
}

// button to display the game board and play against the computer
function onComputerButtonClick(event : MouseEvent) : void {
    event.preventDefault();

    toggleBoard();
    initBoardNames();

    playerTwoName.textContent += " (Computer)";
    computerToggle = true;
}

// initialize game and DOM player names
function initBoardNames() : void {
    game.playerOne.name = playerOneInput.value;
    game.playerTwo.name = playerTwoInput.value;

    playerOneName.textContent = game.playerOne.name;
    playerTwoName.textContent = game.playerTwo.name;
}

// toggle between start screen and game screen
function toggleBoard() : void {
    startScreen.classList.toggle("hidden");
    gameBoard.classList.toggle("hidden");
}

// update the DOM player scores
function updateScore() : void {
    playerOneScore.textContent = `${game.playerOne.score}`;
    playerTwoScore.textContent = `${game.playerTwo.score}`;
}