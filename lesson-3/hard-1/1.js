function first() {
  return {
    prop1: "hi there",
  };
}

function second() {
  return;
  {
    prop1: "hi there";
  }
}

console.log(first());
console.log(second());

/*
  no, the second function returns undefined because the return statement has its own line
  the javascript engine automatically inserts a semicolon after it, returning the function with undefined
*/
