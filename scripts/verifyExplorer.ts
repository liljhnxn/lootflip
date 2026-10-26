import fs from "fs";
import path from "path";

async function verifyOnExplorer() {
  const contractAddress = "0x12865e4081f7faaddab6061f2dac5726cb232e4d";
  const sourceCode = fs.readFileSync(path.resolve("./contracts/LootFlip.sol"), "utf-8");

  console.log(`Submitting source code verification to BohrScan for ${contractAddress}...`);

  const formData = new URLSearchParams();
  formData.append("module", "contract");
  formData.append("action", "verifysourcecode");
  formData.append("contractaddress", contractAddress);
  formData.append("sourceCode", sourceCode);
  formData.append("codeformat", "solidity-single-file");
  formData.append("contractname", "LootFlip");
  formData.append("compilerversion", "v0.8.24+commit.e11b9ed9");
  formData.append("optimizationUsed", "1");
  formData.append("runs", "200");
  formData.append("evmversion", "shanghai");
  formData.append("licenseType", "3"); // MIT

  const res = await fetch("https://scan.bohr.life/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  const text = await res.text();
  console.log("Response status:", res.status);
  console.log("Response body:", text);

  // If async GUID returned, poll for result
  try {
    const json = JSON.parse(text);
    if (json.status === "1" && json.result) {
      const guid = json.result;
      console.log(`Checking verification status for GUID: ${guid}...`);
      for (let i = 0; i < 10; i++) {
        await new Promise((r) => setTimeout(r, 3000));
        const checkRes = await fetch(
          `https://scan.bohr.life/api?module=contract&action=checkverifystatus&guid=${guid}`
        );
        const checkJson = await checkRes.json();
        console.log("Check result:", checkJson);
        if (checkJson.status === "1" || checkJson.result === "Pass - Verified") {
          console.log("🎉 Successfully verified on BohrScan!");
          break;
        }
      }
    }
  } catch (e) {
    console.error("Error parsing response:", e);
  }
}

verifyOnExplorer().catch(console.error);
