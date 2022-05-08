let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];

const multiplesOfThree = arr.map((subArray) => {
  return subArray.filter((number) => number % 3 === 0);
});

console.log(multiplesOfThree);
