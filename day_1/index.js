const fs = require("fs");
let input;
try {
  input = fs
    .readFileSync("./input.txt", "utf-8")
    .split("\n")
    .filter((i) => i);
} catch (err) {
  console.error("Error al leer el archivo:", err.message);
}

let zeros = 0;
let dial = 50;
let zerosCross = 0;
for (const i of input) {
  const rot = i.slice(0, 1);
  let times = +i.slice(1);

  while (times > 100) {
    times -= 100;
    zerosCross++;
  }

  const mod = times % 100;
  if (rot === "L") {
    const diff = dial - mod;
    const b = dial;
    dial = diff < 0 ? 100 + diff : diff;
    if (diff < 0 && b !== 0 && dial !== 0) {
      zerosCross++;
    }
  }
  if (rot === "R") {
    const diff = dial + mod;
    const b = dial;
    dial = diff > 99 ? diff - 100 : dial + mod;
    if (diff > 99 && b !== 0 && dial !== 0) {
      zerosCross++;
    }
  }
  if (dial === 0) {
    zeros++;
  }
}
console.log("RES1:", zeros);
console.log("RES2:", zerosCross + zeros);
