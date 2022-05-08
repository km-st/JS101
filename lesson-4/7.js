["ant", "bear"].map((elem) => {
  if (elem.length > 3) {
    return elem;
  }
});

/*
  [undefined, bear]
  this is because ant does not pass the condition and thus the function returns undefined on that iteration
*/
