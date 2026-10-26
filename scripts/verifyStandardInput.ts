import fs from "fs";
import path from "path";

async function verifyStandardInput() {
  const contractAddress = "0x12865e4081f7faaddab6061f2dac5726cb232e4d";
  const buildInfoPath = path.resolve("./artifacts/build-info/solc-0_8_24-1419ded93ae3182f9a1e57c80b7eac430b90f05a.json");
  const buildInfo = JSON.parse(fs.readFileSync(buildInfoPath, "utf-8"));

  const standardInput = buildInfo.input;

  // Test submitting standard input to Blockscout v2
  const payload = {
    compiler_version: "v0.8.24+commit.e11b9ed9",
    contract_name: "project/contracts/LootFlip.sol:LootFlip",
    autodetect_constructor_args: true,
    input: standardInput
  };

  console.log("Submitting standard-input verification to BohrScan...");
  const res = await fetch(
    `https://scan.bohr.life/api/v2/smart-contracts/${contractAddress}/verification/via/standard-input`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Response:", text);
}

verifyStandardInput().catch(console.error);
