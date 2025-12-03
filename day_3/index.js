const fs = require("fs");
let input;
try {
  input = fs
    .readFileSync("./input1.txt", "utf-8")
    .split("\n")
    .filter((i) => i);
} catch (err) {
  console.error("Error al leer el archivo:", err.message);
}

let sum = 0;
for (const item of input) {
  const val = [];
  const arr = item.split("").map(Number);
  let piv = 0;
  while (val.length < 2) {
    const chunk = [...arr.slice(piv, arr.length - (1 - val.length))];
    const max = Math.max(...chunk);
    val.push(max);
    piv = chunk.indexOf(max) + piv + 1;
  }
  sum += +val.join("");
}
console.log("RES1:", sum);

let sum2 = 0;
for (const item of input) {
  const val = [];
  const arr = item.split("").map(Number);
  let piv = 0;
  while (val.length < 12) {
    const chunk = [...arr.slice(piv, arr.length - (11 - val.length))];
    const max = Math.max(...chunk);
    val.push(max);
    piv = chunk.indexOf(max) + piv + 1;
  }
  sum2 += +val.join("");
}
console.log("RES2:", sum2);
