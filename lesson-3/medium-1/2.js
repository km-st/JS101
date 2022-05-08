let munstersDescription = "The Munsters are creepy and spooky.";

const capitalRegex = /[A-Z]/;

const reverseCaptilize = (string) =>
  string
    .split("")
    .map((character) => {
      if (capitalRegex.test(character)) {
        return character.toLowerCase();
      }
      return character.toUpperCase();
    })
    .join("");

console.log(reverseCaptilize(munstersDescription));
