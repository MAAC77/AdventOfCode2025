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

const mat = input.map((i) => i.split(""));
for (let i = 0; i < mat.length; i++) {
  for (let j = 0; j < mat[i].length; j++) {
    if (mat[i][j] === "S") {
      mat[i + 1][j] = "|";
    }
    if (mat[i - 1]?.[j] === "|" && mat[i][j] !== "^") {
      mat[i][j] = "|";
    }
    if (mat[i][j] === "^") {
      mat[i][j - 1] = "|";
      mat[i][j + 1] = "|";
    }
  }
}
let sum = 0;
for (let i = 0; i < mat.length; i++) {
  for (let j = 0; j < mat[i].length; j++) {
    if (mat[i][j] === "^" && mat[i - 1]?.[j] === "|") {
      sum++;
    }
  }
}
console.log("RES1:", sum);

for (let i = 0; i < mat.length; i++) {
  for (let j = 0; j < mat[i].length; j++) {
    if (mat[i][j] === "|" && i === 1) {
      mat[i][j] = 1;
    }
    if (mat[i][j] === ".") {
      mat[i][j] = 0;
    }
  }
}
for (let i = 0; i < mat.length; i++) {
  for (let j = 0; j < mat[i].length; j++) {
    if (mat[i][j] === "|") {
      if (!isNaN(mat[i - 1][j]) && mat[i][j] !== "^" && mat[i - 1][j] !== 0) {
        mat[i][j] = mat[i - 1][j];
      }
      if (mat[i][j + 1] === "^" && mat[i][j - 1] !== "^") {
        mat[i][j] = +mat[i - 1][j] + mat[i - 1][j + 1];
      }
      if (mat[i][j - 1] === "^" && mat[i][j + 1] !== "^") {
        mat[i][j] = mat[i - 1][j - 1] + mat[i - 1][j];
      }
      if (mat[i][j - 1] === "^" && mat[i][j + 1] === "^") {
        mat[i][j] = mat[i - 1][j - 1] + mat[i - 1][j] + mat[i - 1][j + 1];
      }
    }
  }
}
const last = mat
  .slice(-1)
  .map((i) => i.filter((x) => !isNaN(x)).reduce((acc, v) => acc + v, 0))[0];
console.log("RES2:", last);
