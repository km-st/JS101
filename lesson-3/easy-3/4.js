let arr1 = [{ first: "value1" }, { second: "value2" }, 3, 4, 5];
let arr2 = arr1.slice();
arr2[0].first = 42;
console.log(arr1);

// gets mutated as we are creating a shallow copy of arr1 with .slice(), therefore, the copy's nested objects still reference the original objects nested objects
