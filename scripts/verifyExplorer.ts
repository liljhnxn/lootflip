import fs from "fs";
import path from "path";
import { LOOTFLIP_CONTRACT_ADDRESS } from "../lib/contractConfig";

async function verifyOnExplorer() {
  const contractAddress = LOOTFLIP_CONTRACT_ADDRESS;
  const sourceCode = fs.readFileSync(path.resolve("./contracts/LootFlip.sol"), "utf-8");

  console.log(`Submitting source code verification to BotScan for ${contractAddress}...`);

  const explorerApi = `${process.env.NEXT_PUBLIC_BOTCHAIN_EXPLORER_URL || "https://scan.botchain.ai"}/api`;
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
  formData.append("licenseType", "3"); // MIT

  const res = await fetch(explorerApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  const text = await res.text();
  console.log("Response status:", res.status);
  console.log("Response body:", text);
}

verifyOnExplorer().catch(console.error);
