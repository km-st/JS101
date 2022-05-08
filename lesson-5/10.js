let arr = [
  ["b", "c", "a"],
  [2, 11, -3],
  ["blue", "black", "green"],
];

const descending = arr.map((subArr) => {
  return subArr.slice().sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
});

console.log(descending);
