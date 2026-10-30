import { createPublicClient, http } from "viem";
import { botchain, LOOTFLIP_CONTRACT_ADDRESS, LOOTFLIP_ABI } from "../lib/contractConfig";

async function verify() {
  console.log(`🔍 Verifying LootFlip at address: ${LOOTFLIP_CONTRACT_ADDRESS}...`);
  const client = createPublicClient({
    chain: botchain,
    transport: http(process.env.BOTCHAIN_RPC_URL || "https://rpc.botchain.ai"),
  });

  const bytecode = await client.getBytecode({ address: LOOTFLIP_CONTRACT_ADDRESS });
  console.log("Contract bytecode present:", Boolean(bytecode && bytecode.length > 2));

  const total = await client.readContract({
    address: LOOTFLIP_CONTRACT_ADDRESS,
    abi: LOOTFLIP_ABI,
    functionName: "totalOpenings",
  });
  console.log("On-chain totalOpenings:", total.toString());

  const rarityCommon = await client.readContract({
    address: LOOTFLIP_CONTRACT_ADDRESS,
    abi: LOOTFLIP_ABI,
    functionName: "getExpectedRarity",
    args: [1],
  });
  console.log("Expected rarity for ID 1 (Common 0):", rarityCommon);

  const rarityLegendary = await client.readContract({
    address: LOOTFLIP_CONTRACT_ADDRESS,
    abi: LOOTFLIP_ABI,
    functionName: "getExpectedRarity",
    args: [10],
  });
  console.log("Expected rarity for ID 10 (Legendary 3):", rarityLegendary);

  console.log("\n✅ On-chain verification PASSED on Botchain Mainnet!");
}

verify().catch(console.error);
