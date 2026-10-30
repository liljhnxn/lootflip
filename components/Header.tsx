"use client";

import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain, useChainId } from "wagmi";
import { botchain } from "../lib/contractConfig";
import { Wallet, LogOut, AlertTriangle, ShieldCheck, ChevronDown } from "lucide-react";

export function Header() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const chainId = useChainId();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isCorrectNetwork = chainId === botchain.id;

  const truncateAddress = (addr?: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleConnect = () => {
    // Prefer MetaMask or first available connector
    const connector = connectors.find((c) => c.name.toLowerCase().includes("metamask")) || connectors[0];
    if (connector) {
      connect({ connector });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-950/40 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-950 p-[1px] shadow-lg shadow-purple-900/30">
            <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center">
              <span className="text-xl">🎁</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-black tracking-tight text-white font-mono">
                LOOT<span className="text-purple-400">FLIP</span>
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                BOTCHAIN MAINNET
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">
              Chain ID: {botchain.id}
            </p>
          </div>
        </div>

        {/* Right Action: BOT Chain Links, Wallet & Network */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* BOT Chain Website Link */}
          <a
            href="https://botchain.ai"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900/90 text-purple-300 border border-purple-900/50 hover:border-purple-500/70 hover:text-white transition-all shadow-sm"
          >
            <img src="/botchain-logo.png" alt="BOT Chain" className="w-3.5 h-3.5 rounded-sm object-cover" />
            <span>BOT Chain</span>
            <span className="text-[10px] text-zinc-500">↗</span>
          </a>

          {/* BOT Chain Explorer Link */}
          <a
            href="https://scan.botchain.ai"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900/90 text-emerald-300 border border-emerald-900/50 hover:border-emerald-500/70 hover:text-white transition-all shadow-sm"
          >
            <img src="/botchain-logo.png" alt="BOT Chain" className="w-3.5 h-3.5 rounded-sm object-cover" />
            <span>Explorer</span>
            <span className="text-[10px] text-zinc-500">↗</span>
          </a>

          {/* Verified Mainnet Contract Badge */}
          <a
            href="https://scan.botchain.ai/address/0xc62a73e4bf4cca16ff2352d1307554274aa7df9e"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono bg-zinc-900/80 text-amber-300/90 border border-amber-900/40 hover:border-amber-500/60 transition-all shadow-sm"
            title="View verified contract on BotScan"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>0xc62a...df9e (Verified ✓)</span>
          </a>

          {mounted && isConnected ? (
            <div className="relative">
              {!isCorrectNetwork ? (
                <button
                  onClick={() => switchChain({ chainId: botchain.id })}
                  disabled={isSwitching}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/40 hover:bg-amber-900/80 transition-all cursor-pointer shadow-md shadow-amber-950/30"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{isSwitching ? "Switching..." : "Switch to Botchain"}</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-900/90 text-zinc-200 border border-purple-900/40 hover:border-purple-600/60 hover:bg-zinc-800 transition-all cursor-pointer"
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-mono">{truncateAddress(address)}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl p-2 z-50">
                        <div className="px-2 py-1.5 border-b border-zinc-800/80 mb-1">
                          <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Connected Wallet</p>
                          <p className="text-xs font-mono text-zinc-200 truncate mt-0.5">{address}</p>
                        </div>
                        <a
                          href={`https://scan.botchain.ai/address/${address}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs text-zinc-300 hover:bg-zinc-800 transition-colors"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                          <span>View on BotScan</span>
                        </a>
                        <button
                          onClick={() => {
                            disconnect();
                            setDropdownOpen(false);
                          }}
                          className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-rose-950/30 transition-colors text-left cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Disconnect</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-900/30 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
