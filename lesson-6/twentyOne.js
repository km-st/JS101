const readline = require("readline-sync");

const SUITS = ["H", "D", "S", "C"];
const VALUES = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const REQUIRED_NUMBER_OF_WINS = 5;
const REQUIRED_TOTAL = 21;
const DEALER_MINIMUM_TARGET = REQUIRED_TOTAL - 4;
let scores = {
  dealer: 0,
  player: 0,
};

function prompt(message) {
  console.log(`=> ${message}`);
}

// shuffle an array
function shuffle(array) {
  for (let first = array.length - 1; first > 0; first--) {
    let second = Math.floor(Math.random() * (first + 1)); // random index from 0 to i
    [array[first], array[second]] = [array[second], array[first]]; // swap elements
  }

  return array;
}

function initalizeDeck() {
  let deck = [];

  for (let suitIndex = 0; suitIndex < SUITS.length; suitIndex++) {
    let suit = SUITS[suitIndex];

    for (let valueIndex = 0; valueIndex < VALUES.length; valueIndex++) {
      let value = VALUES[valueIndex];
      deck.push([suit, value]);
    }
  }

  return shuffle(deck);
}

function total(cards) {
  // cards = [['H', '3'], ['S', 'Q'], ... ]
  let values = cards.map((card) => card[1]);

  let sum = 0;
  values.forEach((value) => {
    if (value === "A") {
      sum += 11;
    } else if (["J", "Q", "K"].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });

  // correct for Aces
  values
    .filter((value) => value === "A")
    .forEach((_) => {
      if (sum > REQUIRED_TOTAL) sum -= 10;
    });

  return sum;
}

function busted(total) {
  return total > REQUIRED_TOTAL;
}

function detectResult(dealerTotal, playerTotal) {
  if (playerTotal > REQUIRED_TOTAL) {
    return "PLAYER_BUSTED";
  } else if (dealerTotal > REQUIRED_TOTAL) {
    return "DEALER_BUSTED";
  } else if (dealerTotal < playerTotal) {
    return "PLAYER";
  } else if (dealerTotal > playerTotal) {
    return "DEALER";
  } else {
    return "TIE";
  }
}

function displayResults(dealerTotal, playerTotal) {
  let result = detectResult(dealerTotal, playerTotal);

  switch (result) {
    case "PLAYER_BUSTED":
      prompt("You busted! Dealer wins!");
      break;
    case "DEALER_BUSTED":
      prompt("Dealer busted! You win!");
      break;
    case "PLAYER":
      prompt("You win!");
      break;
    case "DEALER":
      prompt("Dealer wins!");
      break;
    case "TIE":
      prompt("It's a tie!");
  }
}

function playAgain() {
  console.log("-------------");
  prompt("Do you want to play again? (y or n)");
  let answer = readline.question().toLowerCase();

  while (true) {
    if (answer === "y" || answer === "n") break;
    prompt("Please enter a valid choice (y or n)");
  }

  return answer === "y";
}

function popTwoFromDeck(deck) {
  return [deck.pop(), deck.pop()];
}

function hand(cards) {
  return cards.map((card) => `${card[1]}${card[0]}`).join(" ");
}

function roundSummary({ dealerCards, playerCards, dealerTotal, playerTotal }) {
  console.log("==============");
  prompt(`Dealer has ${dealerCards}, for a total of: ${dealerTotal}`);
  prompt(`Player has ${playerCards}, for a total of: ${playerTotal}`);
  console.log("==============");

  updateScore(dealerTotal, playerTotal);
  displayResults(dealerTotal, playerTotal);
  prompt(`You: ${scores.player}\tDealer: ${scores.dealer}`);
}

function resetScore() {
  scores.player = 0;
  scores.dealer = 0;
}

function updateScore(dealerTotal, playerTotal) {
  let result = detectResult(dealerTotal, playerTotal);

  switch (result) {
    case "PLAYER_BUSTED":
      scores.dealer++;
      break;
    case "DEALER_BUSTED":
      scores.player++;
      break;
    case "PLAYER":
      scores.player++;
      break;
    case "DEALER":
      scores.dealer++;
      break;
    case "TIE":
      break; // do nothing
  }
}

function detectMatchWinner() {
  const winner = Object.entries(scores).find((scoreEntry) => {
    const [_, score] = scoreEntry;
    return score === REQUIRED_NUMBER_OF_WINS;
  });

  return winner ? winner[0] : winner;
}

function matchSummary() {
  const winner = detectMatchWinner();
  if (winner) resetScore();

  switch (winner) {
    case "player":
      prompt("You have won the match");
      break;
    case "dealer":
      prompt("Dealer has won the match");
      break;
    default:
      break;
  }
}

while (true) {
  prompt("Welcome to Twenty-One!");

  // declare and initialize vars
  let deck = initalizeDeck();
  let playerCards = [];
  let dealerCards = [];

  // initial deal
  playerCards.push(...popTwoFromDeck(deck));
  dealerCards.push(...popTwoFromDeck(deck));
  let playerTotal = total(playerCards);
  let dealerTotal = total(dealerCards);

  prompt(`Dealer has ${dealerCards[0]} and ?`);
  prompt(
    `You have: ${playerCards[0]} and ${playerCards[1]}, for a total of ${total(
      playerCards
    )}.`
  );

  // player turn
  while (true) {
    let playerTurn;
    while (true) {
      prompt("Would you like to (h)it or (s)tay?");
      playerTurn = readline.question().toLowerCase();
      if (["h", "s"].includes(playerTurn)) break;
      prompt("Sorry, must enter 'h' or 's'.");
    }

    if (playerTurn === "h") {
      playerCards.push(deck.pop());
      playerTotal = total(playerCards);
      prompt("You chose to hit!");
      prompt(`Your cards are now: ${hand(playerCards)}`);
      prompt(`Your total is now: ${playerTotal}`);
    }

    if (playerTurn === "s" || busted(playerTotal)) break;
  }

  playerTotal = total(playerCards);

  if (busted(playerTotal)) {
    roundSummary({ playerCards, dealerCards, playerTotal, dealerTotal });
    matchSummary();
    if (playAgain()) {
      continue;
    } else {
      break;
    }
  } else {
    prompt(`You stayed at ${playerTotal}`);
  }

  // dealer turn
  prompt("Dealer turn...");

  while (total(dealerCards) < DEALER_MINIMUM_TARGET) {
    prompt(`Dealer hits!`);
    dealerCards.push(deck.pop());
    prompt(`Dealer's cards are now: ${hand(dealerCards)}`);
  }

  dealerTotal = total(dealerCards);

  if (busted(dealerTotal)) {
    prompt(`Dealer total is now: ${dealerTotal}`);
    roundSummary({ playerCards, dealerCards, playerTotal, dealerTotal });
    matchSummary();
    if (playAgain()) {
      continue;
    } else {
      break;
    }
  } else {
    prompt(`Dealer stays at ${dealerTotal}`);
  }

  // both player and dealer stays - compare cards!
  roundSummary({ playerCards, dealerCards, playerTotal, dealerTotal });
  matchSummary();

  if (!playAgain()) break; // the first two calls to play again need to continue if the player wishes to play again to avoid finishing execution of the remaining code within the current loop
}
