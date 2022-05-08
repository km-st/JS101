[1, 2, 3].map((num) => {
  num * num;
});

/*
  [undefined, undefined, undefined]
  map transforms based on return value, undefined is being returned for each iteration
*/
