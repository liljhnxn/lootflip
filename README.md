# LootFlip 🎁 — Every Box Holds a Surprise

> A clean, responsive Web3 digital mystery-box application on **Botchain Testnet**. Connect your wallet, crack open free mystery boxes, discover 12 digital collectibles across four rarity tiers, and permanently record your loot on-chain.

---

## ⚡ Key Highlights

- **Single-Page Simplicity**: Entire application fits seamlessly on one page without extra routes or bloated dashboards.
- **12 Unique Collectibles**: Predefined items categorized across 4 rarity tiers:
  - **COMMON (60% intended)**: Rusty Iron Dagger (#1), Old Miner's Lantern (#2), Copper Guild Badge (#3)
  - **RARE (25% intended)**: Arcane Chrono Ring (#4), Phantom Silk Cloak (#5), Frostforged Flail (#6)
  - **EPIC (12% intended)**: Dragon Heart Prism (#7), Voidwalker's Compass (#8), Solaris Aegis (#9)
  - **LEGENDARY (3% intended)**: Crown of the Astral King (#10), Celestial Godblade (#11), Genesis Singularity Core (#12)
- **True Web Crypto Randomness**: Browser-side selection uses `crypto.getRandomValues()` with unbiased rejection sampling (no `Math.random()`, no modulo bias). Clearly states client-side generation without misleading claims of provably fair oracles.
- **On-Chain Solidity Contract**: `LootFlip.sol` validates inputs, assigns unique opening IDs, and emits events. Query functions support pagination for fast loading.
- **Zero Cost / Zero Hidden Fees**: All box openings are 100% free (only testnet gas). No tokens, staking, or marketplace complexity.

---

## 🌐 Botchain Testnet Network Details

| Parameter | Value |
| :--- | :--- |
| **Network Name** | Botchain Testnet |
| **Chain ID** | `968` |
| **RPC URL** | [https://rpc.bohr.life](https://rpc.bohr.life) |
| **Block Explorer** | [https://scan.bohr.life](https://scan.bohr.life) |
| **Currency Symbol** | `BOT` |

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, custom CSS vector illustrations and gaming animations
- **Web3 Integration**: wagmi v2, viem v2, MetaMask / Injected Provider, TanStack React Query
- **Smart Contract**: Solidity `^0.8.24`, Hardhat 3

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Compile Smart Contracts
```bash
npm run compile
```

### 3. Run Contract Test Suite
```bash
npm run test
```
Runs 7 comprehensive Solidity tests checking:
- Initial state verification
- Valid openings across all 4 rarity tiers (IDs 1 through 12)
- Wallet isolation across multiple callers
- Input rejection on invalid collectible IDs (< 1 or > 12)
- Rejection on mismatched rarity
- Pagination and query boundaries

---

## 📦 Deploying to Botchain Testnet

1. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```
2. Add your deployer wallet private key:
```env
PRIVATE_KEY="0xYOUR_TESTNET_PRIVATE_KEY"
BOTCHAIN_RPC_URL="https://rpc.bohr.life"
```
3. Run the automated deployment script:
```bash
npm run deploy:botchain
```
This script:
- Connects to Botchain Testnet (Chain ID 968)
- Deploys `LootFlip.sol`
- Waits for transaction confirmation on BohrScan
- Prints the verified contract address and BohrScan explorer URL
- Updates `lib/contractConfig.ts` with the deployed address automatically

4. Set the deployed address in `.env.local` for Next.js:
```env
NEXT_PUBLIC_LOOTFLIP_CONTRACT_ADDRESS="0xYOUR_DEPLOYED_CONTRACT_ADDRESS"
```

---

## 💻 Running the Frontend Locally

Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

To verify a production build:
```bash
npm run build
npm run start
```

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub or GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Environment Variable in Vercel Project Settings:
   - `NEXT_PUBLIC_LOOTFLIP_CONTRACT_ADDRESS`: Your deployed LootFlip contract address on Botchain Testnet.
4. Click **Deploy**. Vercel will build and host the single-page application.
