const readline = require("readline-sync");
const { prompt } = require("./utils");

function isInvalidNumber(number) {
  return (
    number.trim() === "" || Number(number) < 0 || Number.isNaN(Number(number))
  );
}

const mortgageCalculator = (
  loanAmount,
  annualPercentageRate,
  loanDurationYears,
  loanDurationMonths
) => {
  const annualInterestRate = Number(annualPercentageRate) / 100;
  const monthlyInterestRate = annualInterestRate / 12;
  const loanDurationInMonths =
    Number(loanDurationYears) * 12 +
    Number(loanDurationMonths ? loanDurationMonths : 0);
  let monthlyPayment;

  if (annualPercentageRate === 0) {
    monthlyPayment = `$${(loanAmount / loanDurationInMonths).toFixed(2)}`;
    return { monthlyPayment, loanDurationInMonths };
  }

  monthlyPayment =
    parseInt(loanAmount, 10) *
    (monthlyInterestRate /
      (1 - Math.pow(1 + monthlyInterestRate, -loanDurationInMonths)));

  return {
    monthlyPayment: `$${monthlyPayment.toFixed(2)}`,
    loanDurationInMonths,
  };
};

prompt("Welcome to Mortgage Calculator!");
while (true) {
  prompt("---------------------------------");
  prompt("What is the loan amount?");

  let amount = readline.question();
  while (isInvalidNumber(amount)) {
    prompt("Must enter a positive number");
    amount = readline.question();
  }

  prompt("What is the interest rate?");
  prompt("(Example: 5 for 5% or 2.5 for 2.5%)");
  let interestRate = readline.question();

  while (isInvalidNumber(interestRate)) {
    prompt("Must enter a positive number");
    interestRate = readline.question();
  }

  prompt("What is the loan duration?");
  prompt("Number of years:");
  let years = readline.question();
  while (isInvalidNumber(years)) {
    prompt("Must enter a positive number");
    years = readline.question();
  }

  prompt("Number of months:");
  let months = readline.question();
  while (isInvalidNumber(months)) {
    prompt("Must enter a positive number");
    months = readline.question();
  }

  const { monthlyPayment, loanDurationInMonths } = mortgageCalculator(
    amount,
    interestRate,
    years,
    months
  );

  prompt(`Your monthly payment is: ${monthlyPayment}`);
  prompt(`Your total number of repayments will be: ${loanDurationInMonths}`);

  prompt("Another calculation?");
  let answer = readline.question().toLowerCase();
  while (answer[0] !== "n" && answer[0] !== "y") {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  if (answer[0] === "n") break;
}
