const fs = require("fs");
let input;
let inputRange;
let inputList;
try {
  input = fs.readFileSync("./input.txt", "utf-8").split("\n");
  inputRange = input.slice(0, input.indexOf(""));
  inputList = input.slice(input.indexOf("")).filter((i) => i);
} catch (err) {
  console.error("Error al leer el archivo:", err.message);
}

const ss = [];
for (const range of inputRange) {
  const [s, e] = range.split("-").map(Number);
  ss.push(...[...inputList].map(Number).filter((i) => s <= i && i <= e));
}
console.log("RES1:", new Set(ss).size);
const sorted = inputRange
  .map((i) => i.split("-").map(Number))
  .sort(([i], [x]) => i - x);
for (let i = 1; i < sorted.length; i++) {
  const [s, e] = sorted[i];
  const [sp, ep] = sorted[i - 1];

  if (ep >= s && ep < e) {
    sorted[i - 1] = [sp, e];
    sorted.splice(i, 1);
    i--;
  }
  if (ep >= s && ep >= e) {
    sorted.splice(i, 1);
    i--;
  }
}
const sum = sorted.reduce((acc, [x, y]) => acc + (y - x + 1), 0);
console.log("RES2:", sum);
