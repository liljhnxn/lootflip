import { defineChain } from "viem";

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
      http: ["https://rpc.bohr.life"],
    },
  },
  blockExplorers: {
    default: {
      name: "BohrScan",
      url: "https://scan.bohr.life",
    },
  },
  testnet: true,
});

// Configure deployed contract address on Botchain Testnet
// Set NEXT_PUBLIC_LOOTFLIP_CONTRACT_ADDRESS in .env.local after running `npm run deploy:botchain`
export const LOOTFLIP_CONTRACT_ADDRESS: `0x${string}` =
  (process.env.NEXT_PUBLIC_LOOTFLIP_CONTRACT_ADDRESS as `0x${string}`) ||
  "0x12865e4081f7faaddab6061f2dac5726cb232e4d";

export const LOOTFLIP_ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "index", type: "uint256" },
      { internalType: "uint256", name: "length", type: "uint256" },
    ],
    name: "IndexOutOfBounds",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint8", name: "collectibleId", type: "uint8" }],
    name: "InvalidCollectibleId",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint8", name: "rarity", type: "uint8" }],
    name: "InvalidRarity",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint8", name: "collectibleId", type: "uint8" },
      { internalType: "uint8", name: "rarity", type: "uint8" },
    ],
    name: "MismatchedRarity",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "openingId", type: "uint256" }],
    name: "OpeningNotFound",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "openingId", type: "uint256" },
      { indexed: true, internalType: "address", name: "opener", type: "address" },
      { indexed: true, internalType: "uint8", name: "collectibleId", type: "uint8" },
      { indexed: false, internalType: "enum LootFlip.Rarity", name: "rarity", type: "uint8" },
      { indexed: false, internalType: "uint64", name: "timestamp", type: "uint64" },
    ],
    name: "OpeningRecorded",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint8", name: "collectibleId", type: "uint8" }],
    name: "getExpectedRarity",
    outputs: [{ internalType: "enum LootFlip.Rarity", name: "", type: "uint8" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "openingId", type: "uint256" }],
    name: "getOpening",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "openingId", type: "uint256" },
          { internalType: "address", name: "opener", type: "address" },
          { internalType: "uint8", name: "collectibleId", type: "uint8" },
          { internalType: "enum LootFlip.Rarity", name: "rarity", type: "uint8" },
          { internalType: "uint64", name: "timestamp", type: "uint64" },
        ],
        internalType: "struct LootFlip.OpeningRecord",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "getUserOpeningByIndex",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "openingId", type: "uint256" },
          { internalType: "address", name: "opener", type: "address" },
          { internalType: "uint8", name: "collectibleId", type: "uint8" },
          { internalType: "enum LootFlip.Rarity", name: "rarity", type: "uint8" },
          { internalType: "uint64", name: "timestamp", type: "uint64" },
        ],
        internalType: "struct LootFlip.OpeningRecord",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getUserOpeningCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "uint256", name: "offset", type: "uint256" },
      { internalType: "uint256", name: "limit", type: "uint256" },
    ],
    name: "getUserOpenings",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "openingId", type: "uint256" },
          { internalType: "address", name: "opener", type: "address" },
          { internalType: "uint8", name: "collectibleId", type: "uint8" },
          { internalType: "enum LootFlip.Rarity", name: "rarity", type: "uint8" },
          { internalType: "uint64", name: "timestamp", type: "uint64" },
        ],
        internalType: "struct LootFlip.OpeningRecord[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint8", name: "collectibleId", type: "uint8" },
      { internalType: "uint8", name: "rarity", type: "uint8" },
    ],
    name: "recordOpening",
    outputs: [{ internalType: "uint256", name: "openingId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalOpenings",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
