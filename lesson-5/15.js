let arr = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];

const newArray = arr.filter((object) => {
  return Object.values(object).every((subArray) =>
    subArray.every((number) => number % 2 === 0)
  );
});

console.log(newArray);
