import { readFileSync, writeFileSync } from "fs";

const dataPath = "./src/data.json";

export function readData() {
  return JSON.parse(readFileSync(dataPath, "utf-8"));
}

export function writeData(data) {
  writeFileSync(dataPath, JSON.stringify(data, null, 2));
}
