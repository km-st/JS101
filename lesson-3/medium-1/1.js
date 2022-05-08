let indent = 0;

let string = "The Flintstones Rock!";

while (indent < 10) {
  console.log(string.padStart(string.length + indent, " "));
  indent++;
}
