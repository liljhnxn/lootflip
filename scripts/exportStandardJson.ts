import fs from "fs";
import path from "path";

const buildInfoPath = path.resolve("./artifacts/build-info/solc-0_8_24-1419ded93ae3182f9a1e57c80b7eac430b90f05a.json");
const buildInfo = JSON.parse(fs.readFileSync(buildInfoPath, "utf-8"));
fs.writeFileSync(path.resolve("./contracts/standard-json-input.json"), JSON.stringify(buildInfo.input, null, 2));
console.log("Successfully generated contracts/standard-json-input.json");
