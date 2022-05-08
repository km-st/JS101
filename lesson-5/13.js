let arr = [
  [1, 6, 7],
  [1, 5, 3],
  [1, 8, 3],
];

const isOdd = (number) => number % 2 !== 0;
const getTotalOfOddNumbers = (array) =>
  array.reduce((total, next) => (isOdd(next) ? total + next : total), 0);

const newArray = arr.slice().sort((a, b) => {
  return getTotalOfOddNumbers(a) - getTotalOfOddNumbers(b);
});

console.log(newArray);
