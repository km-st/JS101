let str1 = "hello there";
let str2 = str1;
str2 = "goodbye!";
console.log(str1); // hello there, str2 is a new variable and doesn't reference str1 as a primitive, so reassignment doesn't affect str1
