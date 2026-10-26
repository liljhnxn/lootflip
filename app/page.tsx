"use client";

import React, { useState } from "react";
import { Header } from "../components/Header";
import { MysteryBoxSection } from "../components/MysteryBoxSection";
import { RarityRates } from "../components/RarityRates";
import { CollectionSection } from "../components/CollectionSection";

export default function HomePage() {
  const [collectionUpdateTrigger, setCollectionUpdateTrigger] = useState<number>(Date.now());

  const handleOpeningSuccess = () => {
    // Trigger collection and recent openings re-fetch
    setCollectionUpdateTrigger(Date.now());
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-purple-600 selection:text-white">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-indigo-900/15 blur-[120px]" />
        <div className="absolute bottom-10 left-1/4 w-96 h-96 rounded-full bg-emerald-950/20 blur-[140px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* 1. Header */}
        <Header />

        {/* 2. Main One-Page Content */}
        <main className="flex-1">
          {/* Mystery Box & Hero */}
          <MysteryBoxSection onOpeningSuccess={handleOpeningSuccess} />

          {/* Rarity & Drop Rates Transparency */}
          <RarityRates />

          {/* User's Collection & Recent Openings Ledger */}
          <CollectionSection lastUpdated={collectionUpdateTrigger} />
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-zinc-900 bg-zinc-950/80 py-6 text-center text-xs text-zinc-400 font-mono">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-zinc-300 font-bold">LootFlip</span>
              <span>— Every Box Holds a Surprise</span>
            </div>
            <div className="flex items-center space-x-4 text-[11px]">
              <a
                href="https://scan.bohr.life"
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-400 transition-colors"
              >
                BohrScan Explorer
              </a>
              <span>·</span>
              <a
                href="https://rpc.bohr.life"
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-400 transition-colors"
              >
                Botchain RPC (968)
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
