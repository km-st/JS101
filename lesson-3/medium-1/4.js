const myBuffer1 = [];
const myBuffer2 = ["1"];
const maxBufferSize = 4;
const newElements = ["1", "2", "3", "4", "5", "6", "7"];

function addToRollingBuffer1(buffer, maxBufferSize, newElement) {
  buffer.push(newElement);
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  return buffer;
}

function addToRollingBuffer2(buffer, maxBufferSize, newElement) {
  buffer = buffer.concat(newElement);
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  return buffer;
}

const newBuffer1 = newElements.reduce((buffer, element) => {
  return addToRollingBuffer1(buffer, maxBufferSize, element);
}, myBuffer1);
const newBuffer2 = newElements.reduce((buffer, element) => {
  return addToRollingBuffer2(buffer, maxBufferSize, element);
}, myBuffer2);

console.log(myBuffer1);
console.log(myBuffer2);
console.log(newBuffer1);
console.log(newBuffer2);

/*
  They produce the same output, however addToRollingBuffer1 mutates the original array
  with .push and .shift, where as addToRollingBuffer2 doesn't because it utilizes the 
  .concat method 
*/
