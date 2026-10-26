import React from "react";
import { RARITY_CONFIG, Rarity } from "../lib/collectibles";
import { Sparkles, Info } from "lucide-react";

export function RarityRates() {
  const rarities = [
    { key: Rarity.COMMON, ...RARITY_CONFIG[Rarity.COMMON] },
    { key: Rarity.RARE, ...RARITY_CONFIG[Rarity.RARE] },
    { key: Rarity.EPIC, ...RARITY_CONFIG[Rarity.EPIC] },
    { key: Rarity.LEGENDARY, ...RARITY_CONFIG[Rarity.LEGENDARY] },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 px-4">
      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-purple-950/40 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">
              Mystery Box Drop Rates & Collectible Tiers
            </span>
          </div>
          <span className="text-[11px] text-zinc-400">12 Collectibles (3 per tier)</span>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {rarities.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between px-3 py-2 rounded-xl border transition-all"
              style={{
                backgroundColor: item.badgeBg,
                borderColor: item.borderColor,
              }}
            >
              <div className="flex items-center space-x-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-bold" style={{ color: item.badgeText }}>
                  {item.name}
                </span>
              </div>
              <span className="text-xs font-mono font-bold" style={{ color: item.badgeText }}>
                {item.weight}%
              </span>
            </div>
          ))}
        </div>

        {/* Client-Generated Randomness Notice */}
        <div className="mt-3 pt-2.5 border-t border-zinc-800/60 flex items-start space-x-2 text-[11px] text-zinc-400 leading-relaxed">
          <Info className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
          <p>
            <span className="font-semibold text-zinc-300">Client-Generated Demo:</span> Drop
            outcomes are generated in-browser using the Web Crypto API (
            <code className="text-purple-300 bg-purple-950/50 px-1 py-0.5 rounded">crypto.getRandomValues</code>
            ) with unbiased rejection sampling. Results are verified and recorded on Botchain Testnet.
            Percentages reflect demo intended distributions, not an on-chain oracle guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}
