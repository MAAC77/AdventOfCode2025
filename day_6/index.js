const fs = require("fs");
let input;
try {
  input = fs
    .readFileSync("./input.txt", "utf-8")
    .split("\n")
    .filter((x) => x);
} catch (err) {
  console.error("Error al leer el archivo:", err.message);
}

const ope = input.slice(-1).map((i) => i.split(" ").filter((x) => x))[0];
const val = input.map((i) => i.match(/\d+/g)).filter((x) => x);

const mat = Object.keys(val[0]).map((colNumber) =>
  val.map((rowNumber) => {
    return rowNumber[colNumber];
  }),
);

const res = mat.map((item, idx) => {
  const sym = ope[idx];
  if (sym === "+") {
    return item.reduce((acc, val) => acc + +val, 0);
  }
  if (sym === "*") {
    return item.reduce((acc, val) => acc * +val, 1);
  }
});

const res1 = res.reduce((acc, val) => acc + val, 0);
console.log("RES1:", res1);

const ope2 = input
  .splice(input.length - 1, 1)
  .map((i) => i.split(" ").filter((x) => x))[0]
  .reverse();
const val2 = input.map((i) => i.split(""));
const mat2 = Object.keys(val2[0]).map((colNumber) =>
  val2.map((rowNumber) => {
    return rowNumber[colNumber];
  }),
);
let t = [];
let sum = 0;
mat2.unshift(Array(mat2[0].length).fill(" "));
for (const v of mat2.reverse()) {
  if (v.every((x) => x === " ")) {
    const sym = ope2.splice(0, 1)[0];
    if (sym === "+") {
      t
        .map((i) => i.join(""))
        .map(Number)
        .reduce((acc, val) => acc + +val, 0),
        (sum += t
          .map((i) => i.join(""))
          .map(Number)
          .reduce((acc, val) => acc + +val, 0));
    }
    if (sym === "*") {
      sum += t
        .map((i) => i.join(""))
        .map(Number)
        .reduce((acc, val) => acc * +val, 1);
    }
    t = [];
  } else {
    t.push(v);
  }
}
console.log("RES2:", sum);
