let statement1 = "The Flintstones Rock!";
let statement2 = "Easy come, easy go.";

const findNumberOfMatchesAgainst = (match) => (string) => {
  const regex = new RegExp(match, "g");
  const matchResult = string.match(regex) ?? [];

  return matchResult.length;
};

const matchAgainstT = findNumberOfMatchesAgainst("t");

console.log(matchAgainstT(statement1));
console.log(matchAgainstT(statement2));
