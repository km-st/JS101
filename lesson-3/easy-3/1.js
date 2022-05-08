let numbers1 = [1, 2, 3, 4];

numbers1.length = 0;

let numbers2 = [1, 2, 3, 4];
numbers2.splice(0, numbers2.length);

let numbers3 = [1, 2, 3, 4];
while (numbers3.length) {
  numbers3.pop();
}

console.log(numbers1);
console.log(numbers2);
console.log(numbers3);
