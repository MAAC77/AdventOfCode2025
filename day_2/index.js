const fs = require("fs");
let input;
try {
  input = fs
    .readFileSync("./input.txt", "utf-8")
    .split(",")
    .filter((i) => i)
    .map((i) => i.replace("\n", ""));
} catch (err) {
  console.error("Error al leer el archivo:", err.message);
}

const check = (input) => {
  if (input.length % 2 !== 0) return false;
  const valA = input.slice(0, input.length / 2);
  const valB = input.slice(input.length / 2);
  return valA === valB;
};

const checkSequence = (input) => {
  const m = new Map();
  for (let i = 1; i < input.length; i++) {
    const temp = [];
    for (let j = 0; j < input.length; j += i) {
      temp.push(input.slice(j, j + i));
    }
    const noRepeat = [...new Set(temp)];
    if (temp.every((item) => item.length === i) && noRepeat.length === 1) {
      m.set(i, temp);
    }
  }
  return m.size !== 0;
};

let sum = 0;
let sum2 = 0;
for (const range of input) {
  const [init, end] = range.split("-");
  for (let i = +init; i <= +end; i++) {
    if (check(String(i))) sum += i;
    if (checkSequence(String(i))) sum2 += i;
  }
}
console.log("RES1:", sum);
console.log("RES2:", sum2);
