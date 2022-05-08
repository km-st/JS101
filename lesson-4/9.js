let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237,
};

const agesSum = Object.values(ages).reduce((a, b) => a + b);

console.log(agesSum);
