const $body = document.querySelector("body");

const $homePage = document.querySelector(".home-page");
const $gameRulesPage = document.querySelector(".game-rules-page");
const $gameScreen = document.querySelector(".game-screen");
const $gameCells = document.querySelectorAll(".game-cell");
const $gamePauseScreen = document.querySelector(".game-pause");

const $playerVsPlayer = document.querySelector(".play-vs-player");
const $gameRules = document.querySelector(".game-rules");

const $btnMenu = document.querySelector(".header-menu");
const $btnRestart = document.querySelector(".header-restart");
const $FooterGame = document.querySelector(".footer-container");

const $gameRulesBtn = document.querySelector(".icon-close-game-rules");

const $gameEndBackgroud = document.querySelector(".game-end-background");
const $winner1 = document.querySelector(".game-end-winner-1");
const $winner2 = document.querySelector(".game-end-winner-2");
const $btnPlayAgainWinner1 = document.querySelector(
  ".gamer-end-play-again-winner1"
);
const $btnPlayAgainWinner2 = document.querySelector(
  ".gamer-end-play-again-winner2"
);

// Buttons menu
const $btnContinueGame = document.querySelector(".btn-continue-pause");
const $btnRestartGame = document.querySelector(".btn-restart-pause");
const $btnQuitGame = document.querySelector(".btn-quit-pause");

// Le joueur actuel
let currentPlayer = "red";

// Tableau de jeu
let gameBoard = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
];

console.log(gameBoard);

// Les Icons
const counterRed = `<svg width="70px" height="75px" viewBox="0 0 70 75" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>counter-red-large</title>
    <defs>
        <circle id="path-1" cx="35" cy="35" r="32"></circle>
        <filter x="-3.9%" y="-3.9%" width="107.8%" height="107.8%" filterUnits="objectBoundingBox" id="filter-2">
            <feOffset dx="0" dy="5" in="SourceAlpha" result="shadowOffsetInner1"></feOffset>
            <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>
        </filter>
    </defs>
    <g id="Designs" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="counter-red-large">
            <circle id="Oval-Copy-41" fill="#000000" cx="35" cy="35" r="35"></circle>
            <circle id="Oval-Copy-42" fill="#000000" cx="35" cy="40" r="35"></circle>
            <g id="Oval-Copy-43">
                <use fill="#FD6687" fill-rule="evenodd" xlink:href="#path-1"></use>
                <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use>
            </g>
        </g>
    </g>
</svg>`;

const counterYellow = `<svg width="70px" height="75px" viewBox="0 0 70 75" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>counter-yellow-large</title>
    <defs>
        <circle id="path-1" cx="35" cy="35" r="32"></circle>
        <filter x="-3.9%" y="-3.9%" width="107.8%" height="107.8%" filterUnits="objectBoundingBox" id="filter-2">
            <feOffset dx="0" dy="5" in="SourceAlpha" result="shadowOffsetInner1"></feOffset>
            <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>
        </filter>
    </defs>
    <g id="Designs" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="counter-yellow-large">
            <circle id="Oval-Copy-35" fill="#000000" cx="35" cy="35" r="35"></circle>
            <circle id="Oval-Copy-36" fill="#000000" cx="35" cy="40" r="35"></circle>
            <g id="Oval-Copy-35">
                <use fill="#FFCE67" fill-rule="evenodd" xlink:href="#path-1"></use>
                <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use>
            </g>
        </g>
    </g>
</svg>`;

//  Function checkWin
function checkWin(board) {
  // Vérifier les lignes
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        board[row][col] !== "" &&
        board[row][col] === board[row][col + 1] &&
        board[row][col + 1] === board[row][col + 2] &&
        board[row][col + 2] === board[row][col + 3]
      ) {
        return true;
      }
    }
  }

  // Vérifier les colonnes
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      if (
        board[row][col] !== "" &&
        board[row][col] === board[row + 1][col] &&
        board[row + 1][col] === board[row + 2][col] &&
        board[row + 2][col] === board[row + 3][col]
      ) {
        return true;
      }
    }
  }

  // Vérifier les diagonales (haut gauche vers bas droite)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        board[row][col] !== "" &&
        board[row][col] === board[row + 1][col + 1] &&
        board[row + 1][col + 1] === board[row + 2][col + 2] &&
        board[row + 2][col + 2] === board[row + 3][col + 3]
      ) {
        return true;
      }
    }
  }

  // Vérifier les diagonales (haut droite vers bas gauche)
  for (let row = 0; row < 3; row++) {
    for (let col = 3; col < 7; col++) {
      if (
        board[row][col] !== "" &&
        board[row][col] === board[row + 1][col - 1] &&
        board[row + 1][col - 1] === board[row + 2][col - 2] &&
        board[row + 2][col - 2] === board[row + 3][col - 3]
      ) {
        return true;
      }
    }
  }

  return false;
}

// Button player vs player
$playerVsPlayer.addEventListener("click", function (e) {
  $homePage.classList.add("hidden");
  $gameScreen.classList.remove("hidden");
  $body.style.backgroundColor = "var(--purple)";
});

// Button game rules
$gameRules.addEventListener("click", function (e) {
  $homePage.classList.add("hidden");
  $gameRulesPage.classList.remove("hidden");
  $body.style.backgroundColor = "var(--purple)";
});

// Button game rules to home page
$gameRulesBtn.addEventListener("click", function (e) {
  $gameRulesPage.classList.add("hidden");
  $homePage.classList.remove("hidden");
  $body.style.backgroundColor = "var(--dark-purple)";
});

// Button menu
$btnMenu.addEventListener("click", function (e) {
  $gamePauseScreen.classList.remove("hidden");
});

// Button continue game
$btnContinueGame.addEventListener("click", function (e) {
  $gamePauseScreen.classList.add("hidden");
});

// Button restart pause
$btnRestartGame.addEventListener("click", function (e) {
  $gamePauseScreen.classList.add("hidden");

  $gameCells.forEach(function (clearCell) {
    clearCell.innerHTML = "";
  });

  console.clear();

  gameBoard = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ];

  $FooterGame.style.backgroundColor = "var(--dark-purple)";
});

// Button quit game
$btnQuitGame.addEventListener("click", function (e) {
  $gamePauseScreen.classList.add("hidden");
  $gameScreen.classList.add("hidden");
  $homePage.classList.remove("hidden");
  $body.style.backgroundColor = "var(--dark-purple)";
});

// Button restart
$btnRestart.addEventListener("click", function (e) {
  $gameCells.forEach(function (clearCell) {
    clearCell.innerHTML = "";
  });

  console.clear();

  gameBoard = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ];

  $FooterGame.style.backgroundColor = "var(--dark-purple)";
});

// Button play again Winner 1
$btnPlayAgainWinner1.addEventListener("click", function (e) {
  $winner1.classList.add("hidden");

  $gameEndBackgroud.classList.add("hidden");

  $btnRestart.click();
});

// Button play again Winner 2
$btnPlayAgainWinner2.addEventListener("click", function (e) {
  $winner2.classList.add("hidden");

  $gameEndBackgroud.classList.add("hidden");

  $btnRestart.click();
});

// Le système du jeu
$gameCells.forEach(function (gameCell) {
  gameCell.innerHTML = "";

  gameCell.addEventListener("click", function () {
    const dataX = gameCell.getAttribute("data-x");

    for (let i = 5; i >= 0; i--) {
      if (gameBoard[i][dataX] === "") {
        gameBoard[i][dataX] = currentPlayer;

        if (currentPlayer === "red") {
          document.querySelector(
            `.game-cell[data-y="${i}"][data-x="${dataX}"]`
          ).innerHTML = counterRed;

          console.log(gameBoard);

          console.log(checkWin(gameBoard));

          if (checkWin(gameBoard)) {
            console.log("Victory");

            $FooterGame.style.backgroundColor = "var(--pink)";

            $gameEndBackgroud.classList.remove("hidden");
            $winner1.classList.remove("hidden");
          }

          currentPlayer = "yellow";
        } else {
          document.querySelector(
            `.game-cell[data-y="${i}"][data-x="${dataX}"]`
          ).innerHTML = counterYellow;

          console.log(gameBoard);

          console.log(checkWin(gameBoard));

          if (checkWin(gameBoard) === true) {
            console.log("Defeat");

            $FooterGame.style.backgroundColor = "var(--yellow)";

            $gameEndBackgroud.classList.remove("hidden");
            $winner2.classList.remove("hidden");
          }

          currentPlayer = "red";
        }
        break;
      }
    }
  });
});
