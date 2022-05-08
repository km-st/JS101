let obj = {
  first: ["the", "quick"],
  second: ["brown", "fox"],
  third: ["jumped"],
  fourth: ["over", "the", "lazy", "dog"],
};

const VOWELS = "aeiou";

Object.values(obj).forEach((value) => {
  value.forEach((word) => {
    word.split("").forEach((character) => {
      if (VOWELS.includes(character)) console.log(character);
    });
  });
});
