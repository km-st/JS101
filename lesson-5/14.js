let obj = {
  grape: { type: "fruit", colors: ["red", "green"], size: "small" },
  carrot: { type: "vegetable", colors: ["orange"], size: "medium" },
  apple: { type: "fruit", colors: ["red", "green"], size: "medium" },
  apricot: { type: "fruit", colors: ["orange"], size: "medium" },
  marrow: { type: "vegetable", colors: ["green"], size: "large" },
};

const newArray = Object.values(obj).map(({ type, colors, size }) => {
  if (type === "fruit")
    return colors.map((color) => `${color[0].toUpperCase()}${color.slice(1)}`);
  if (type === "vegetable") return size.toUpperCase();
});

console.log(newArray);
