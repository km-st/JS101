let flintstones = ["Fred", "Wilma", ["Barney", "Betty"], ["Bambam", "Pebbles"]];

flintstones = flintstones.reduce((accum, element) => {
  return accum.concat(element);
}, []);

console.log(flintstones);
