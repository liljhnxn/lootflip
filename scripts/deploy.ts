import { createWalletClient, createPublicClient, http, defineChain } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

// Define Botchain Testnet chain
export const botchainTestnet = defineChain({
  id: 968,
  name: "Botchain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BOT",
    symbol: "BOT",
  },
  rpcUrls: {
    default: {
      http: [process.env.BOTCHAIN_RPC_URL || "https://rpc.bohr.life"],
    },
  },
  blockExplorers: {
    default: {
      name: "BohrScan",
      url: "https://scan.bohr.life",
    },
  },
});

async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    console.error("❌ Error: PRIVATE_KEY not found in .env or environment.");
    console.error("Please set PRIVATE_KEY=0x... in .env before deploying to Botchain Testnet.");
    process.exit(1);
  }

  const formattedKey = (privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`) as `0x${string}`;
  const account = privateKeyToAccount(formattedKey);

  console.log(`🚀 Deploying LootFlip to Botchain Testnet (Chain ID 968)...`);
  console.log(`Deployer Address: ${account.address}`);

  const publicClient = createPublicClient({
    chain: botchainTestnet,
    transport: http(process.env.BOTCHAIN_RPC_URL || "https://rpc.bohr.life"),
  });

  const walletClient = createWalletClient({
    account,
    chain: botchainTestnet,
    transport: http(process.env.BOTCHAIN_RPC_URL || "https://rpc.bohr.life"),
  });

  // Load contract artifact
  const artifactPath = path.resolve("./artifacts/contracts/LootFlip.sol/LootFlip.json");
  if (!fs.existsSync(artifactPath)) {
    console.error("❌ Artifact not found. Run 'npm run compile' first.");
    process.exit(1);
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf-8"));
  const abi = artifact.abi;
  const bytecode = artifact.bytecode?.object || artifact.bytecode;

  console.log("Submitting deployment transaction...");
  const hash = await walletClient.deployContract({
    abi,
    bytecode: bytecode as `0x${string}`,
  });

  console.log(`Transaction hash: ${hash}`);
  console.log(`Waiting for confirmation on BohrScan (https://scan.bohr.life/tx/${hash})...`);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  const contractAddress = receipt.contractAddress;

  if (!contractAddress) {
    throw new Error("Contract address not returned in receipt");
  }

  console.log(`\n🎉 LootFlip deployed successfully!`);
  console.log(`📍 Contract Address: ${contractAddress}`);
  console.log(`🔍 Explorer: https://scan.bohr.life/address/${contractAddress}`);

  // Automatically update contract config if lib/contractConfig.ts exists
  const configPath = path.resolve("./lib/contractConfig.ts");
  if (fs.existsSync(configPath)) {
    let content = fs.readFileSync(configPath, "utf-8");
    content = content.replace(
      /export const LOOTFLIP_CONTRACT_ADDRESS = ".*?";/,
      `export const LOOTFLIP_CONTRACT_ADDRESS = "${contractAddress}";`
    );
    fs.writeFileSync(configPath, content);
    console.log(`Updated lib/contractConfig.ts with deployed address.`);
  }
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exit(1);
});
