function factors(number) {
  let divisor = number;
  let factors = [];
  do {
    if (number % divisor === 0) {
      factors.push(number / divisor);
    }
    divisor -= 1;
  } while (divisor !== 0);
  return factors;
}

// number % divisor === 0 calculates whether the current divisor is a factor of number, indicated by a lack of a remainder

const factorsNew = (number) =>
  Array.from(Array(number + 1), (_, index) => index).filter(
    (index) => number % index === 0
  );

console.log(factorsNew(100));
