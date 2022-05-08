// can simplify with single array of numbers and letters as shown in the solution

const getRandomNumberUnder = (max) => () => Math.floor(Math.random() * max);
const randomNumberUnderNine = getRandomNumberUnder(9);

const POSSIBLE_LETTERS = "abcdef";
const randomLetterIndex = getRandomNumberUnder(POSSIBLE_LETTERS.length - 1);

const oneOrZero = () => Math.round(Math.random() * 1);

const randomNumberOrLetter = () =>
  Boolean(oneOrZero())
    ? POSSIBLE_LETTERS[randomLetterIndex()]
    : randomNumberUnderNine();

const UUID_SECTION_LENGTHS = [8, 4, 4, 4, 12];

const generateUUID = () => {
  let uuid = "";

  UUID_SECTION_LENGTHS.forEach((sectionLength, index) => {
    for (let index = 0; index < sectionLength; index++) {
      uuid += randomNumberOrLetter();
    }
    if (index !== UUID_SECTION_LENGTHS.length - 1) uuid += "-";
  });

  return uuid;
};

console.log(generateUUID());
console.log(generateUUID());
