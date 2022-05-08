let numbers = [1, 2, 3, 4, 5];
const copy1 = numbers.slice();
copy1.reverse();
console.log(copy1); // [ 5, 4, 3, 2, 1 ]

const copy2 = [...numbers];
copy2.sort((num1, num2) => num2 - num1);
console.log(copy2); // [ 5, 4, 3, 2, 1 ]

console.log(numbers); // [1, 2, 3, 4, 5]
