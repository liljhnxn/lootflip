import React from "react";
import { Collectible, Rarity, RARITY_CONFIG } from "../lib/collectibles";
import { CollectibleIllustration } from "./CollectibleIllustration";
import { ExternalLink, Sparkles, RefreshCw } from "lucide-react";

interface Props {
  collectible: Collectible;
  txHash?: string;
  onOpenAnother: () => void;
}

export function ResultCard({ collectible, txHash, onOpenAnother }: Props) {
  const isLegendary = collectible.rarity === Rarity.LEGENDARY;
  const rarityInfo = RARITY_CONFIG[collectible.rarity];

  return (
    <div className="w-full max-w-lg mx-auto my-6 p-6 rounded-3xl bg-zinc-900/90 border border-purple-900/50 shadow-2xl relative overflow-hidden backdrop-blur-md animate-fade-in">
      {/* Background radial accent glow */}
      <div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-40"
        style={{ backgroundColor: rarityInfo.color }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Rarity & Header Badge */}
        <div className="flex items-center space-x-2 mb-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border flex items-center space-x-1.5 shadow-sm"
            style={{
              backgroundColor: rarityInfo.badgeBg,
              color: rarityInfo.badgeText,
              borderColor: rarityInfo.borderColor,
            }}
          >
            {isLegendary && <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />}
            <span>{collectible.rarityName} COLLECTIBLE</span>
          </span>
          <span className="text-xs font-mono text-zinc-400">ID #{collectible.id}</span>
        </div>

        {/* Collectible Large Illustration */}
        <div className="my-2">
          <CollectibleIllustration
            collectible={collectible}
            size="lg"
            isLegendaryGlow={isLegendary}
          />
        </div>

        {/* Collectible Name */}
        <h3 className="text-2xl font-black text-white tracking-tight mt-2">
          {collectible.name}
        </h3>

        {/* Category & Drop Chance */}
        <p className="text-xs text-purple-300/80 mt-1 font-mono">
          Category: {collectible.category} · {collectible.probabilityLabel}
        </p>

        {/* Lore Description */}
        <p className="text-sm text-zinc-300 mt-3 max-w-md leading-relaxed px-2">
          {collectible.description}
        </p>

        {/* Transaction Explorer Link */}
        {txHash && (
          <div className="mt-4 pt-3 border-t border-zinc-800/80 w-full flex items-center justify-center">
            <a
              href={`${process.env.NEXT_PUBLIC_BOTCHAIN_EXPLORER_URL || "https://scan.botchain.ai"}/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-purple-400 hover:text-purple-300 font-mono transition-colors"
            >
              <span>Recorded on BotScan: {txHash.slice(0, 10)}...{txHash.slice(-8)}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Open Another Box Button */}
        <button
          onClick={onOpenAnother}
          className="mt-6 w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/40 transition-all cursor-pointer flex items-center justify-center space-x-2 active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>OPEN ANOTHER BOX</span>
        </button>
      </div>
    </div>
  );
}
