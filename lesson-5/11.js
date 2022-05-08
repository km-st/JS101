let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

const newArray = arr.map((object) => {
  return Object.entries(object).reduce((newObject, next) => {
    const [key, value] = next;
    return { ...newObject, [key]: value + 1 };
  }, {});
});

console.log(newArray);
