let a = 2;
let b = [5, 8];
let arr = [a, b];

arr[0] += 2;
arr[1][0] -= a;

/*
  a => 2
  b => [3, 8] 
*/

console.log(a, b);
