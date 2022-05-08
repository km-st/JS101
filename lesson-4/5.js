[1, 2, 3].every((num) => {
  return (num = num * 2);
});

/*
  callback return values are 2, 4, 6 - the expression on the right hand side of the assignment gets returned
  every will return true as all return values are truthy
*/
