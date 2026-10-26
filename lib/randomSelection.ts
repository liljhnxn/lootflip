import { COLLECTIBLES, Collectible, Rarity } from "./collectibles";

/**
 * Generates an unbiased random integer in the range [0, maxExclusive)
 * using Web Crypto API and rejection sampling to eliminate modulo bias.
 *
 * @param maxExclusive The upper bound (exclusive).
 * @returns An unbiased integer in [0, maxExclusive - 1].
 */
export function getUnbiasedCryptoRandomInt(maxExclusive: number): number {
  if (maxExclusive <= 1) return 0;

  // 32-bit unsigned integer range: [0, 2^32 - 1]
  const MAX_UINT32 = 0x100000000; // 4,294,967,296
  const limit = Math.floor(MAX_UINT32 / maxExclusive) * maxExclusive;
  const buffer = new Uint32Array(1);

  let randomValue: number;
  do {
    if (typeof window !== "undefined" && window.crypto) {
      window.crypto.getRandomValues(buffer);
    } else if (typeof globalThis !== "undefined" && globalThis.crypto) {
      globalThis.crypto.getRandomValues(buffer);
    } else {
      throw new Error("Web Crypto API (crypto.getRandomValues) is not available in this environment.");
    }
    randomValue = buffer[0];
  } while (randomValue >= limit); // Reject if it falls in the biased remainder

  return randomValue % maxExclusive;
}

export interface RollResult {
  collectible: Collectible;
  rarity: Rarity;
  rollNumber: number; // 0 to 99
  timestamp: number;
}

/**
 * Rolls for a mystery box collectible using the Web Crypto API.
 * Intended probabilities:
 * - COMMON (0..59): 60%
 * - RARE (60..84): 25%
 * - EPIC (85..96): 12%
 * - LEGENDARY (97..99): 3%
 *
 * Note: As stated in the application guidelines, this randomness is client-generated
 * and recorded on Botchain Testnet for demonstration purposes. It does not use an
 * on-chain oracle or claim provably fair cryptographic verification.
 */
export function rollRandomCollectible(): RollResult {
  // Uniform roll from 0 to 99 using rejection sampling
  const roll = getUnbiasedCryptoRandomInt(100);

  let chosenRarity: Rarity;
  if (roll < 60) {
    chosenRarity = Rarity.COMMON;
  } else if (roll < 85) {
    chosenRarity = Rarity.RARE;
  } else if (roll < 97) {
    chosenRarity = Rarity.EPIC;
  } else {
    chosenRarity = Rarity.LEGENDARY;
  }

  // Filter collectibles for this rarity tier
  const candidates = COLLECTIBLES.filter((c) => c.rarity === chosenRarity);

  // Pick one of the matching candidates with unbiased selection
  const itemIndex = getUnbiasedCryptoRandomInt(candidates.length);
  const selected = candidates[itemIndex];

  return {
    collectible: selected,
    rarity: chosenRarity,
    rollNumber: roll,
    timestamp: Date.now(),
  };
}
