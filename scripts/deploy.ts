import { createWalletClient, createPublicClient, http, defineChain, formatEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

// Define Botchain Mainnet
export const botchainMainnet = defineChain({
  id: 677,
  name: "Botchain",
  nativeCurrency: {
    decimals: 18,
    name: "BOT",
    symbol: "BOT",
  },
  rpcUrls: {
    default: {
      http: [process.env.BOTCHAIN_RPC_URL || "https://rpc.botchain.ai"],
    },
  },
  blockExplorers: {
    default: {
      name: "BotScan",
      url: process.env.NEXT_PUBLIC_BOTCHAIN_EXPLORER_URL || "https://scan.botchain.ai",
    },
  },
});

async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    console.error("❌ Error: PRIVATE_KEY not found in .env or environment.");
    console.error("Please set PRIVATE_KEY in .env before deploying to Botchain Mainnet.");
    process.exit(1);
  }

  const formattedKey = (privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`) as `0x${string}`;
  const account = privateKeyToAccount(formattedKey);

  const rpcUrl = process.env.BOTCHAIN_RPC_URL || "https://rpc.botchain.ai";
  console.log(`\n======================================================`);
  console.log(`🚀 Deploying LootFlip to Botchain Mainnet (Chain ID 677)`);
  console.log(`📍 RPC: ${rpcUrl}`);
  console.log(`👛 Deployer Address: ${account.address}`);
  console.log(`======================================================\n`);

  const publicClient = createPublicClient({
    chain: botchainMainnet,
    transport: http(rpcUrl),
  });

  const walletClient = createWalletClient({
    account,
    chain: botchainMainnet,
    transport: http(rpcUrl),
  });

  // Verify deployer balance
  const balance = await publicClient.getBalance({ address: account.address });
  console.log(`Deployer BOT Balance: ${formatEther(balance)} BOT`);

  if (balance === 0n) {
    console.error("\n❌ Error: Deployer account has 0 BOT.");
    console.error(`Please fund ${account.address} with BOT tokens on Botchain Mainnet (Chain ID 677) before deploying.`);
    process.exit(1);
  }

  // Load contract artifact
  const artifactPath = path.resolve("./artifacts/contracts/LootFlip.sol/LootFlip.json");
  if (!fs.existsSync(artifactPath)) {
    console.error("❌ Artifact not found. Run 'npm run compile' first.");
    process.exit(1);
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf-8"));
  const abi = artifact.abi;
  const bytecode = (artifact.bytecode?.object || artifact.bytecode) as `0x${string}`;

  // Gas Fee Optimization
  console.log("\n⚡ Optimizing Gas Fees...");
  const gasPrice = await publicClient.getGasPrice();
  console.log(`Current Network Gas Price: ${gasPrice.toString()} wei (${Number(gasPrice) / 1e9} gwei)`);

  let gasLimit: bigint | undefined;
  try {
    const estimated = await publicClient.estimateGas({
      account: account.address,
      data: bytecode,
    });
    // Add small 5% buffer to guarantee execution without wasting gas
    gasLimit = (estimated * 105n) / 100n;
    const estimatedCost = estimated * gasPrice;
    console.log(`Estimated Deployment Gas: ${estimated.toString()} units`);
    console.log(`Estimated Deployment Cost: ${formatEther(estimatedCost)} BOT (Ultra-low gas)`);
  } catch (err: any) {
    console.log("Could not accurately estimate gas, will let network determine minimum safe gas:", err?.message || err);
  }

  console.log("\nSubmitting deployment transaction with minimal gas price...");
  const hash = await walletClient.deployContract({
    abi,
    bytecode,
    gasPrice,
    gas: gasLimit,
  });

  console.log(`Transaction hash: ${hash}`);
  console.log(`Waiting for confirmation on BotScan (https://scan.botchain.ai/tx/${hash})...`);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  const contractAddress = receipt.contractAddress;

  if (!contractAddress) {
    throw new Error("Contract address not returned in receipt");
  }

  const actualGasUsed = receipt.gasUsed;
  const effectiveGasPrice = receipt.effectiveGasPrice || gasPrice;
  const actualCost = actualGasUsed * effectiveGasPrice;

  console.log(`\n🎉 LootFlip deployed successfully to Botchain Mainnet!`);
  console.log(`📍 Contract Address: ${contractAddress}`);
  console.log(`⛽ Actual Gas Used: ${actualGasUsed.toString()} units`);
  console.log(`💰 Actual Gas Fee Paid: ${formatEther(actualCost)} BOT`);
  console.log(`🔍 Explorer: https://scan.botchain.ai/address/${contractAddress}`);

  // Automatically update contract config if lib/contractConfig.ts exists
  const configPath = path.resolve("./lib/contractConfig.ts");
  if (fs.existsSync(configPath)) {
    let content = fs.readFileSync(configPath, "utf-8");
    content = content.replace(
      /export const LOOTFLIP_CONTRACT_ADDRESS: `0x\$\{string\}` =\s*\(process\.env\.NEXT_PUBLIC_LOOTFLIP_CONTRACT_ADDRESS as `0x\$\{string\}`\) \|\|\s*"0x[a-fA-F0-9]+";/,
      `export const LOOTFLIP_CONTRACT_ADDRESS: \`0x\${string}\` =\n  (process.env.NEXT_PUBLIC_LOOTFLIP_CONTRACT_ADDRESS as \`0x\${string}\`) ||\n  "${contractAddress}";`
    );
    fs.writeFileSync(configPath, content);
    console.log(`\nUpdated lib/contractConfig.ts with deployed address.`);
  }

  // Update .env and .env.local
  const envFiles = [path.resolve("./.env"), path.resolve("./.env.local")];
  for (const envPath of envFiles) {
    if (fs.existsSync(envPath)) {
      let content = fs.readFileSync(envPath, "utf-8");
      content = content.replace(
        /NEXT_PUBLIC_LOOTFLIP_CONTRACT_ADDRESS=".*?"/,
        `NEXT_PUBLIC_LOOTFLIP_CONTRACT_ADDRESS="${contractAddress}"`
      );
      fs.writeFileSync(envPath, content);
      console.log(`Updated ${path.basename(envPath)} with deployed address.`);
    }
  }

  console.log("\n✅ Mainnet deployment and configuration completed!");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});
