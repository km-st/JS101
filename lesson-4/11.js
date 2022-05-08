let statement = "The Flintstones Rock";

const characterFrequency = statement
  .split("")
  .filter((character) => character !== " ")
  .reduce((frequenciesObject, character) => {
    return {
      ...frequenciesObject,
      [character]: (frequenciesObject[character] ?? 0) + 1,
    };
  }, {});

console.log(characterFrequency);
