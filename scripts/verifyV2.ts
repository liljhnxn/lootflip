import fs from "fs";
import path from "path";

async function verifyBlockscoutV2() {
  const contractAddress = "0x12865e4081f7faaddab6061f2dac5726cb232e4d";
  const sourceCode = fs.readFileSync(path.resolve("./contracts/LootFlip.sol"), "utf-8");

  const payload = {
    compiler_version: "v0.8.24+commit.e11b9ed9",
    source_code: sourceCode,
    is_optimization_enabled: true,
    optimization_runs: 200,
    contract_name: "LootFlip",
    autodetect_constructor_args: true,
    evm_version: "shanghai",
    license_type: "mit"
  };

  console.log("Calling Blockscout v2 verification via flattened-code...");
  const res = await fetch(
    `https://scan.bohr.life/api/v2/smart-contracts/${contractAddress}/verification/via/flattened-code`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  console.log("HTTP status:", res.status);
  const text = await res.text();
  console.log("Response:", text);
}

verifyBlockscoutV2().catch(console.error);
