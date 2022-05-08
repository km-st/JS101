let munstersDescription = "the Munsters are CREEPY and Spooky.";
// => The munsters are creepy and spooky.

const capitalizedString = `${munstersDescription[0].toUpperCase()}${munstersDescription
  .slice(1)
  .toLowerCase()}`;

console.log(capitalizedString);
