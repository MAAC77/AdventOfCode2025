const fs = require("fs");
let input;
try {
  input = fs
    .readFileSync("./input.txt", "utf-8")
    .split("\n")
    .filter((x) => x)
    .map((i) => i.split(",").map(Number).reverse());
} catch (err) {
  console.error("Error al leer el archivo:", err.message);
}
let max = 0;
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input.length; j++) {
    const area =
      (Math.abs(input[i][0] - input[j][0]) + 1) *
      (Math.abs(input[i][1] - input[j][1]) + 1);
    if (area > max) {
      max = area;
    }
  }
}
console.log("RES1:", max);
const max_x = Math.max(...input.map(([x]) => x)) + 1;
const max_y = Math.max(...input.map(([, y]) => y)) + 1;
const m = Array.from(Array(max_x), () => new Array(max_y).fill("."));

for (const [x, y] of input) {
  m[x][y] = "#";
}

const temp = new Map();
for (const [x, y] of input) {
  temp.set(x, [...(temp.get(x) ?? []), y]);
}
const tempY = new Map();
for (const [x, y] of input) {
  tempY.set(y, [...(tempY.get(y) ?? []), x]);
}

temp.forEach((value, key) => {
  const max = Math.max(...value);
  const min = Math.min(...value);
  for (let i = min; i <= max; i++) {
    m[key][i] = "X";
  }
});
tempY.forEach((value, key) => {
  const max = Math.max(...value);
  const min = Math.min(...value);
  for (let i = min; i <= max; i++) {
    m[i][key] = "X";
  }
});

for (let i = 0; i < m.length; i++) {
  const first = m[i].indexOf("X");
  const last = m[i].length - [...m[i]].reverse().indexOf("X") - 1;
  if (first >= 0 && last >= 0) {
    for (let j = first; j <= last; j++) {
      m[i][j] = "X";
    }
  }
}
max = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input.length; j++) {
    const [x1, y1] = input[i];
    const [x2, y2] = input[j];
    const maxX = Math.max(x1, x2);
    const minX = Math.min(x1, x2);
    const maxY = Math.max(y1, y2);
    const minY = Math.min(y1, y2);
    const valid = m
      .slice(minX, maxX)
      .map((i) => i.slice(minY, maxY).every((t) => t === "X"))
      .every((x) => x === true);
    if (valid) {
      const area = (x1 - x2 + 1) * (y1 - y2 + 1);
      if (area > max) {
        max = area;
      }
    }
  }
}
console.log("RES2:", max);
