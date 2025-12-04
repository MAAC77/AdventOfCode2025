const fs = require("fs");
let input;
try {
  input = fs
    .readFileSync("./input.txt", "utf-8")
    .split("\n")
    .filter((i) => i)
    .map((i) => i.split(""));
} catch (err) {
  console.error("Error al leer el archivo:", err.message);
}

const check = (x, y, mat) => {
  let times = 0;
  const sym = "@";
  if (mat?.[x - 1]?.[y - 1] === sym) times++;
  if (mat?.[x]?.[y - 1] === sym) times++;
  if (mat?.[x + 1]?.[y - 1] === sym) times++;
  if (mat?.[x - 1]?.[y] === sym) times++;
  if (mat?.[x + 1]?.[y] === sym) times++;
  if (mat?.[x - 1]?.[y + 1] === sym) times++;
  if (mat?.[x]?.[y + 1] === sym) times++;
  if (mat?.[x + 1]?.[y + 1] === sym) times++;
  return times < 4;
};

const func = (mat) => {
  let sum = 0;
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      if (mat[i][j] === "@" && check(i, j, mat)) {
        sum++;
      }
    }
  }
  return sum;
};

const funcRec = (mat) => {
  const changes = [];
  let sum = 0;
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      if (mat[i][j] === "@" && check(i, j, mat)) {
        sum++;
        changes.push([i, j]);
      }
    }
  }
  for (const change of changes) {
    const [x, y] = change;
    mat[x][y] = ".";
  }
  return sum + (changes.length > 0 ? funcRec(mat) : 0);
};
const res1 = func(input);
console.log("RES1:", res1);

const res2 = funcRec(input);
console.log("RES2:", res2);
