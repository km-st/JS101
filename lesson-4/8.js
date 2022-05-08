let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];

const object = {};

flintstones.forEach((name, index) => {
  object[name] = index;
});

console.log(object);
