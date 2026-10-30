"use client";

import React, { useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { LOOTFLIP_CONTRACT_ADDRESS, LOOTFLIP_ABI } from "../lib/contractConfig";
import { getCollectibleById, RARITY_CONFIG, Rarity } from "../lib/collectibles";
import { CollectibleIllustration } from "./CollectibleIllustration";
import { Package, Clock, ExternalLink, Sparkles, Layers } from "lucide-react";

interface Props {
  lastUpdated?: number;
}

interface OpeningRecordData {
  openingId: bigint;
  opener: `0x${string}`;
  collectibleId: number;
  rarity: number;
  timestamp: bigint;
}

export function CollectionSection({ lastUpdated }: Props) {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isContractSet =
    LOOTFLIP_CONTRACT_ADDRESS &&
    LOOTFLIP_CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000";

  // Read user's openings from the smart contract
  const {
    data: rawUserOpenings,
    isLoading,
    refetch,
  } = useReadContract({
    address: LOOTFLIP_CONTRACT_ADDRESS,
    abi: LOOTFLIP_ABI,
    functionName: "getUserOpenings",
    args: address && isContractSet ? [address, 0n, 50n] : undefined,
    query: {
      enabled: Boolean(isConnected && address && isContractSet),
    },
  });

  // Re-fetch when lastUpdated changes (e.g. after a confirmed box opening)
  React.useEffect(() => {
    if (isConnected && isContractSet) {
      refetch();
    }
  }, [lastUpdated, isConnected, isContractSet, refetch]);

  const openings = (rawUserOpenings as unknown as OpeningRecordData[]) || [];

  const formatDate = (ts: bigint) => {
    if (!ts || ts === 0n) return "Just now";
    const date = new Date(Number(ts) * 1000);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 mt-16 mb-20">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800/80">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-purple-950/60 text-purple-400 border border-purple-800/40">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              MY COLLECTION
            </h2>
            <p className="text-xs text-zinc-400">
              On-chain collectibles discovered by your connected wallet
            </p>
          </div>
        </div>

        {mounted && isConnected && (
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-zinc-900 border border-purple-900/40 text-purple-300">
            {openings.length} {openings.length === 1 ? "Item" : "Items"} Discovered
          </span>
        )}
      </div>

      {/* Contract Unconfigured Notice */}
      {!isContractSet && (
        <div className="p-4 mb-6 rounded-2xl bg-amber-950/40 border border-amber-600/30 text-amber-200 text-xs">
          <p className="font-semibold mb-1">Contract Deployment Notice</p>
          <p className="text-amber-300/80">
            Smart contract address is not yet set in <code className="bg-black/40 px-1 py-0.5 rounded">NEXT_PUBLIC_LOOTFLIP_CONTRACT_ADDRESS</code>.
            Deploy the contract to Botchain using <code className="bg-black/40 px-1 py-0.5 rounded">npm run deploy:botchain</code> and set the address in your environment.
          </p>
        </div>
      )}

      {/* Wallet Not Connected State */}
      {!mounted || !isConnected ? (
        <div className="p-12 text-center rounded-3xl bg-zinc-900/40 border border-zinc-800/60 max-w-lg mx-auto">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-zinc-800/80 flex items-center justify-center text-zinc-400">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">Connect Your Wallet</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Connect your MetaMask or Web3 wallet to open mystery boxes and inspect your Botchain collectibles.
          </p>
        </div>
      ) : isLoading ? (
        <div className="p-12 text-center text-zinc-400">
          <div className="w-8 h-8 mx-auto mb-3 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs">Fetching your collection from Botchain...</p>
        </div>
      ) : openings.length === 0 ? (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-zinc-900/40 border border-zinc-800/60 max-w-lg mx-auto">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-purple-950/50 flex items-center justify-center text-purple-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">No Collectibles Discovered Yet</h3>
          <p className="text-xs text-zinc-400 leading-relaxed mb-4">
            Your vault is waiting! Open your first free mystery box above to reveal rare and legendary loot on Botchain Mainnet.
          </p>
        </div>
      ) : (
        /* Grid of Discovered Collectibles */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {openings.map((item) => {
            const collectible = getCollectibleById(item.collectibleId);
            const rarityInfo = RARITY_CONFIG[collectible.rarity];
            const isLegendary = collectible.rarity === Rarity.LEGENDARY;

            return (
              <div
                key={item.openingId.toString()}
                className={`relative p-4 rounded-2xl bg-zinc-900/80 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isLegendary
                    ? "border-amber-400/50 shadow-amber-500/10"
                    : "border-zinc-800 hover:border-purple-800/60 shadow-purple-950/20"
                }`}
              >
                {/* Rarity & Opening ID Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border"
                    style={{
                      backgroundColor: rarityInfo.badgeBg,
                      color: rarityInfo.badgeText,
                      borderColor: rarityInfo.borderColor,
                    }}
                  >
                    {collectible.rarityName}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    #{item.openingId.toString()}
                  </span>
                </div>

                {/* Illustration */}
                <div className="my-3 flex justify-center">
                  <CollectibleIllustration collectible={collectible} size="md" />
                </div>

                {/* Name & Details */}
                <h4 className="text-sm font-bold text-white truncate">
                  {collectible.name}
                </h4>
                <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1 leading-snug">
                  {collectible.description}
                </p>

                {/* Metadata & Date */}
                <div className="mt-4 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    <span>{formatDate(item.timestamp)}</span>
                  </span>
                  <a
                    href={`${process.env.NEXT_PUBLIC_BOTCHAIN_EXPLORER_URL || "https://scan.botchain.ai"}/address/${LOOTFLIP_CONTRACT_ADDRESS}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-purple-300 text-zinc-400 flex items-center space-x-0.5"
                    title="View contract on BotScan"
                  >
                    <span>BotScan</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* RECENT OPENINGS SECTION */}
      {mounted && isConnected && openings.length > 0 && (
        <div className="mt-14 pt-8 border-t border-zinc-800/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>RECENT OPENING LEDGER</span>
            </h3>
            <span className="text-xs text-zinc-400">Latest wallet activity</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-800/80 bg-zinc-900/50">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-950/80 text-zinc-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">Opening #</th>
                  <th className="py-3 px-4">Collectible</th>
                  <th className="py-3 px-4">Rarity</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4 text-right">Explorer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-mono">
                {openings.slice(0, 8).map((record) => {
                  const col = getCollectibleById(record.collectibleId);
                  const rInfo = RARITY_CONFIG[col.rarity];

                  return (
                    <tr key={record.openingId.toString()} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3 px-4 text-zinc-300 font-bold">
                        #{record.openingId.toString()}
                      </td>
                      <td className="py-3 px-4 text-white font-sans font-medium flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: rInfo.color }} />
                        <span>{col.name}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-bold"
                          style={{
                            backgroundColor: rInfo.badgeBg,
                            color: rInfo.badgeText,
                          }}
                        >
                          {col.rarityName}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-zinc-400">
                        {formatDate(record.timestamp)}
                      </td>
                      <td className="py-3 px-4 text-right font-sans">
                        <a
                          href={`${process.env.NEXT_PUBLIC_BOTCHAIN_EXPLORER_URL || "https://scan.botchain.ai"}/address/${LOOTFLIP_CONTRACT_ADDRESS}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-purple-400 hover:text-purple-300 inline-flex items-center space-x-1"
                        >
                          <span>BotScan</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
