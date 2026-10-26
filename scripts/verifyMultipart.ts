import fs from "fs";
import path from "path";

async function verifyWithStandardJson() {
  const contractAddress = "0x12865e4081f7faaddab6061f2dac5726cb232e4d";
  const buildInfoPath = path.resolve("./artifacts/build-info/solc-0_8_24-1419ded93ae3182f9a1e57c80b7eac430b90f05a.json");
  const buildInfo = JSON.parse(fs.readFileSync(buildInfoPath, "utf-8"));

  const standardJson = JSON.stringify(buildInfo.input);
  const blob = new Blob([standardJson], { type: "application/json" });

  const formData = new FormData();
  formData.append("compiler_version", "v0.8.24+commit.e11b9ed9");
  formData.append("contract_name", "project/contracts/LootFlip.sol:LootFlip");
  formData.append("autodetect_constructor_args", "true");
  formData.append("files[0]", blob, "standard-input.json");

  console.log("Submitting standard-json multipart to BohrScan...");
  const res = await fetch(
    `https://scan.bohr.life/api/v2/smart-contracts/${contractAddress}/verification/via/standard-input`,
    {
      method: "POST",
      body: formData,
    }
  );

  console.log("HTTP status:", res.status);
  const text = await res.text();
  console.log("Response:", text);
}

verifyWithStandardJson().catch(console.error);
