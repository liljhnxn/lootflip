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
        {/* Top Ecosystem Bar: Website, Explorer & Verified Contract */}
        <div className="w-full bg-gradient-to-r from-purple-950/80 via-zinc-950 to-purple-950/80 border-b border-purple-900/40 py-2.5 px-4 text-xs">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-zinc-300">
            {/* BOT Chain Brand with Official Logo */}
            <div className="flex items-center space-x-2.5">
              <img
                src="/botchain-logo.png"
                alt="BOT Chain"
                className="w-5 h-5 rounded object-cover shadow-sm ring-1 ring-emerald-500/40"
              />
              <span className="font-bold text-white tracking-wide">BOT Chain Mainnet</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400 font-mono text-[11px]">Chain ID: 677</span>
            </div>

            {/* Links with BOT Chain Logo at the front */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 text-xs font-medium">
              <a
                href="https://botchain.ai"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-zinc-900 border border-purple-900/40 text-purple-300 hover:text-white hover:border-purple-500/70 transition-all shadow-sm"
              >
                <img
                  src="/botchain-logo.png"
                  alt="BOT Chain Logo"
                  className="w-3.5 h-3.5 rounded-sm object-cover"
                />
                <span>BOT Chain Website</span>
                <span className="text-[10px] text-zinc-500">↗</span>
              </a>

              <a
                href="https://scan.botchain.ai"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-zinc-900 border border-emerald-900/40 text-emerald-300 hover:text-white hover:border-emerald-500/70 transition-all shadow-sm"
              >
                <img
                  src="/botchain-logo.png"
                  alt="BOT Chain Logo"
                  className="w-3.5 h-3.5 rounded-sm object-cover"
                />
                <span>BOT Chain Explorer</span>
                <span className="text-[10px] text-zinc-500">↗</span>
              </a>

              <a
                href="https://scan.botchain.ai/address/0xc62a73e4bf4cca16ff2352d1307554274aa7df9e"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-amber-950/40 border border-amber-900/50 text-amber-300 hover:text-amber-200 transition-all font-mono text-[11px]"
                title="View verified contract on BotScan"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>0xc62a...df9e</span>
                <span className="text-emerald-400 font-sans text-[10px] ml-0.5 font-bold">✓ Verified</span>
              </a>
            </div>
          </div>
        </div>

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

        {/* Footer & Botchain Ecosystem Section */}
        <footer className="w-full border-t border-purple-950/40 bg-zinc-950/90 py-8 text-xs text-zinc-400 font-mono">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Project Info */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-sm shadow-md shadow-purple-950/50">
                  🎁
                </div>
                <span className="text-zinc-200 font-black text-sm tracking-tight font-sans">
                  LOOT<span className="text-purple-400">FLIP</span>
                </span>
              </div>
              <span className="hidden sm:inline text-zinc-700">|</span>
              <span className="text-zinc-400 text-xs font-sans">Every Box Holds a Surprise</span>
            </div>

            {/* BOT Chain Ecosystem Links & Branding */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-sans">
              <a
                href="https://botchain.ai"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-purple-900/40 text-purple-300 hover:text-white hover:border-purple-500/60 transition-all shadow-sm"
              >
                <img
                  src="/botchain-logo.png"
                  alt="BOT Chain Logo"
                  className="w-4 h-4 rounded object-cover shadow-sm ring-1 ring-emerald-500/40"
                />
                <span>BOT Chain Website</span>
                <span className="text-zinc-500">↗</span>
              </a>
              <a
                href="https://scan.botchain.ai"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-emerald-900/40 text-emerald-300 hover:text-white hover:border-emerald-500/60 transition-all shadow-sm"
              >
                <img
                  src="/botchain-logo.png"
                  alt="BOT Chain Logo"
                  className="w-4 h-4 rounded object-cover shadow-sm ring-1 ring-emerald-500/40"
                />
                <span>BOT Chain Explorer</span>
                <span className="text-zinc-500">↗</span>
              </a>
              <a
                href="https://scan.botchain.ai/address/0xc62a73e4bf4cca16ff2352d1307554274aa7df9e"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-amber-900/40 text-amber-300/90 hover:text-amber-200 hover:border-amber-600/60 transition-all font-mono text-[11px]"
              >
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Mainnet Contract: 0xc62a73e4bf4cca16ff2352d1307554274aa7df9e</span>
                <span className="text-zinc-500">↗</span>
              </a>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 mt-6 pt-4 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 gap-2 font-sans">
            <p>© {new Date().getFullYear()} LootFlip on BOT Chain Mainnet. Built for on-chain entertainment.</p>
            <p className="flex items-center space-x-1 text-zinc-400">
              <span>Chain ID: 677</span>
              <span>·</span>
              <span>Native Token: BOT</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
