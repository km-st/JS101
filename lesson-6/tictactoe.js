const readline = require("readline-sync");

const INITIAL_MARKER = " ";
const HUMAN_MARKER = "X";
const COMPUTER_MARKER = "O";
const REQUIRED_NUMBER_OF_WINS = 2;
const FIRST_MOVER = "choose";

let winningLines = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9], // rows
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9], // columns
  [1, 5, 9],
  [3, 5, 7], // diagonals
];

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function displayBoard(board) {
  console.clear();

  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);

  console.log("");
  console.log("     |     |");
  console.log(`  ${board["1"]}  |  ${board["2"]}  |  ${board["3"]}`);
  console.log("     |     |");
  console.log("-----+-----+-----");
  console.log("     |     |");
  console.log(`  ${board["4"]}  |  ${board["5"]}  |  ${board["6"]}`);
  console.log("     |     |");
  console.log("-----+-----+-----");
  console.log("     |     |");
  console.log(`  ${board["7"]}  |  ${board["8"]}  |  ${board["9"]}`);
  console.log("     |     |");
  console.log("");
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function emptySquares(board) {
  return Object.keys(board).filter((key) => board[key] === " ");
}

function playerChoosesSquare(board) {
  let square;

  while (true) {
    prompt(`Choose a square (${joinOr(emptySquares(board))}):`);
    square = readline.question().trim();
    if (emptySquares(board).includes(square)) break;

    prompt("Sorry, that's not a valid choice.");
  }

  board[square] = HUMAN_MARKER;
}

const findAtRiskSquare = (defendAgainst) => (board) => {
  let defensiveMove = null;

  for (let winningLine of winningLines) {
    const lineWithMarkers = winningLine.map((position) =>
      board[position] === defendAgainst ? defendAgainst : board[position]
    );

    const hasTwoMarkers =
      lineWithMarkers.filter((position) => position === defendAgainst)
        .length === 2;
    const emptyIndex = lineWithMarkers.findIndex(
      (position) => position === INITIAL_MARKER
    );

    if (hasTwoMarkers && emptyIndex >= 0) {
      defensiveMove = winningLine[emptyIndex];
      break;
    }
  }

  return defensiveMove;
};

const findComputerDefensiveSquare = findAtRiskSquare(HUMAN_MARKER);
const findComputerOffensiveSquare = findAtRiskSquare(COMPUTER_MARKER);

function computerChoosesSquare(board) {
  const defensivePosition = findComputerDefensiveSquare(board);
  const offensivePosition = findComputerOffensiveSquare(board);
  let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
  let square = (() => {
    if (offensivePosition !== null) return offensivePosition;
    if (defensivePosition !== null) return defensivePosition;
    if (board[5] === " ") return 5;
    return emptySquares(board)[randomIndex];
  })();
  board[square] = COMPUTER_MARKER;
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) {
  return !!detectRoundWinner(board);
}

function joinOr(array, delimiter = ", ", finalJoiningWord = "or") {
  if (array.length === 0) return "";
  if (array.length === 1) return `${array[0]}`;
  if (array.length === 2) return array.join(` ${finalJoiningWord} `);

  return `${`${array
    .slice(0, array.length - 1)
    .join(
      delimiter
    )}${delimiter}`.trim()}${` ${finalJoiningWord} `}${array.slice(-1)}`;
}

function detectMatchWinner(scores) {
  const [winner] = Object.entries(scores).find((scoreEntry) => {
    const [_, score] = scoreEntry;
    return score === REQUIRED_NUMBER_OF_WINS;
  });
  return winner;
}

function detectRoundWinner(board) {
  for (let line = 0; line < winningLines.length; line++) {
    let [sq1, sq2, sq3] = winningLines[line];

    if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER
    ) {
      return "Player";
    } else if (
      board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER
    ) {
      return "Computer";
    }
  }

  return null;
}

let board = initializeBoard();
let scores = {
  Computer: 0,
  Player: 0,
};

const getCurrentPLayer = () => {
  let currentPlayer;

  switch (FIRST_MOVER) {
    case "choose":
      while (true) {
        prompt("Who gets first move? Player (1) or Computer (2)");
        selection = readline.question();

        if (selection === "1") {
          currentPlayer = "player";
          break;
        } else if (selection === "2") {
          currentPlayer = "computer";
          break;
        } else {
          prompt("Please select a valid option: Player (1) or Computer (2)");
        }
      }
      break;
    case "player":
      currentPlayer = "player";
    case "computer":
      currentPlayer = "computer";
  }

  return currentPlayer;
};

const alternatePlayer = (currentPlayer) => {
  return currentPlayer === "player" ? "computer" : "player";
};

const chooseSquare = (board, currentPlayer) => {
  if (currentPlayer === "player") {
    playerChoosesSquare(board);
  } else {
    computerChoosesSquare(board);
  }
};

while (true) {
  let board = initializeBoard();
  let currentPlayer = getCurrentPLayer();
  let roundWinner;

  while (true) {
    displayBoard(board);

    chooseSquare(board, currentPlayer);
    currentPlayer = alternatePlayer(currentPlayer);
    if (someoneWon(board) || boardFull(board)) break;
  }

  displayBoard(board);

  if (someoneWon(board)) {
    roundWinner = detectRoundWinner(board);
    prompt(`${roundWinner} won the round!`);
    scores[roundWinner]++;
    prompt(`You: ${scores.Player}\tComputer: ${scores.Computer}`);
  } else {
    prompt("It's a tie!");
  }

  const matchHasBeenWon = Object.values(scores).some((score) => {
    return score === REQUIRED_NUMBER_OF_WINS;
  });

  if (matchHasBeenWon) {
    const matchWinner = detectMatchWinner(scores);
    prompt(`${matchWinner} has won the match!`);
    scores.Player = 0;
    scores.Computer = 0;
  }

  prompt(
    matchHasBeenWon
      ? "Play another match? (y or n)"
      : "Play another round? (y or n)"
  );

  let playAgainAnswer;

  while (true) {
    playAgainAnswer = readline.question().toLowerCase();
    if (playAgainAnswer === "y" || playAgainAnswer === "n") break;
    prompt("Please enter a valid choice (y or n)");
  }

  if (playAgainAnswer === "n") break;
}

prompt("Thanks for playing Tic Tac Toe!");
