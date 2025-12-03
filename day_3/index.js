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
  const arr = item.split("").map(Number);
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (+`${arr[i]}${arr[j]}` > max) max = +`${arr[i]}${arr[j]}`;
    }
  }
  sum += max;
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
