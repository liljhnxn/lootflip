"use client";

import React, { useState } from "react";
import {
  useAccount,
  useChainId,
  useSwitchChain,
  useWriteContract,
  usePublicClient,
} from "wagmi";
import { botchainTestnet, LOOTFLIP_CONTRACT_ADDRESS, LOOTFLIP_ABI } from "../lib/contractConfig";
import { rollRandomCollectible, RollResult } from "../lib/randomSelection";
import { MysteryBoxIllustration } from "./MysteryBoxIllustration";
import { ResultCard } from "./ResultCard";
import { Sparkles, AlertCircle, Loader2, Wallet, RefreshCw, CheckCircle2 } from "lucide-react";

interface Props {
  onOpeningSuccess: () => void;
}

type BoxFlowState = "idle" | "generating" | "submitting" | "confirming" | "revealed" | "error";

export function MysteryBoxSection({ onOpeningSuccess }: Props) {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  const [flowState, setFlowState] = useState<BoxFlowState>("idle");
  const [currentRoll, setCurrentRoll] = useState<RollResult | null>(null);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isCorrectNetwork = chainId === botchainTestnet.id;
  const isContractSet =
    LOOTFLIP_CONTRACT_ADDRESS &&
    LOOTFLIP_CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000";

  const handleOpenBox = async () => {
    // 1. Verify wallet connection
    if (!isConnected) {
      setErrorMessage("Please connect your wallet first to open a mystery box.");
      return;
    }

    // 2. Verify network
    if (!isCorrectNetwork) {
      try {
        await switchChain({ chainId: botchainTestnet.id });
      } catch (err: unknown) {
        setErrorMessage("Please switch to Botchain Testnet in your wallet.");
        return;
      }
    }

    // 3. Verify contract is configured
    if (!isContractSet) {
      setErrorMessage(
        "LootFlip smart contract is not yet deployed or configured. Run 'npm run deploy:botchain' and configure NEXT_PUBLIC_LOOTFLIP_CONTRACT_ADDRESS."
      );
      return;
    }

    setErrorMessage(null);

    try {
      // 4. Generate collectible via Web Crypto API
      setFlowState("generating");
      const roll = rollRandomCollectible();
      setCurrentRoll(roll);

      // Short opening animation delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // 5. Submit transaction to smart contract
      setFlowState("submitting");
      const hash = await writeContractAsync({
        address: LOOTFLIP_CONTRACT_ADDRESS,
        abi: LOOTFLIP_ABI,
        functionName: "recordOpening",
        args: [roll.collectible.id, roll.rarity],
      });

      setTxHash(hash);
      setFlowState("confirming");

      // 6. Wait for transaction confirmation on Botchain Testnet
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({
          hash,
          confirmations: 1,
        });
      }

      // 7. Reveal collectible ONLY after on-chain confirmation
      setFlowState("revealed");
      onOpeningSuccess();
    } catch (err: unknown) {
      console.error("Box opening failed:", err);
      setFlowState("error");
      const errObj = err as { shortMessage?: string; message?: string };
      const msg = errObj?.shortMessage || errObj?.message || "Transaction was rejected or failed.";
      if (msg.toLowerCase().includes("user rejected")) {
        setErrorMessage("Transaction was cancelled in your wallet.");
      } else {
        setErrorMessage(msg);
      }
    }
  };

  const handleOpenAnother = () => {
    setFlowState("idle");
    setCurrentRoll(null);
    setTxHash(undefined);
    setErrorMessage(null);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 pt-10 pb-6 flex flex-col items-center">
      {/* HERO SECTION */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-950/70 border border-purple-800/40 text-purple-300 text-xs font-semibold mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Every Box Holds a Surprise</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-sans">
          LUCK IS IN <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">THE BOX.</span>
        </h1>
        <p className="text-base sm:text-lg font-medium text-purple-200/90 mt-3 max-w-xl mx-auto">
          Open your box. Discover your loot.
        </p>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-md mx-auto">
          Every box holds a surprise. What will you find?
        </p>
      </div>

      {/* RESULT OR BOX VIEW */}
      {flowState === "revealed" && currentRoll ? (
        <ResultCard
          collectible={currentRoll.collectible}
          txHash={txHash}
          onOpenAnother={handleOpenAnother}
        />
      ) : (
        <div className="flex flex-col items-center">
          {/* Mystery Box Illustration */}
          <MysteryBoxIllustration
            state={
              flowState === "submitting" || flowState === "confirming" || flowState === "generating"
                ? "opening"
                : "idle"
            }
            onClick={flowState === "idle" ? handleOpenBox : undefined}
          />

          {/* Status Message while Pending */}
          {(flowState === "generating" ||
            flowState === "submitting" ||
            flowState === "confirming") && (
            <div className="mt-5 flex items-center space-x-2 px-4 py-2 rounded-xl bg-purple-950/80 border border-purple-800/50 text-xs text-purple-200 animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
              <span>
                {flowState === "generating" && "Rolling cryptographic outcome..."}
                {flowState === "submitting" && "Confirm opening in your wallet..."}
                {flowState === "confirming" && "Recording opening on Botchain Testnet..."}
              </span>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-6 flex flex-col items-center space-y-2">
            {!mounted || !isConnected ? (
              <button
                onClick={handleOpenBox}
                className="px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-950/60 transition-all cursor-pointer flex items-center space-x-2 active:scale-95"
              >
                <Wallet className="w-4 h-4" />
                <span>CONNECT WALLET TO OPEN</span>
              </button>
            ) : !isCorrectNetwork ? (
              <button
                onClick={() => switchChain({ chainId: botchainTestnet.id })}
                disabled={isSwitching}
                className="px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider text-white bg-amber-600 hover:bg-amber-500 shadow-xl shadow-amber-950/50 transition-all cursor-pointer flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isSwitching ? "animate-spin" : ""}`} />
                <span>SWITCH TO BOTCHAIN TESTNET</span>
              </button>
            ) : (
              <button
                onClick={handleOpenBox}
                disabled={
                  flowState === "generating" ||
                  flowState === "submitting" ||
                  flowState === "confirming"
                }
                className="px-10 py-4 rounded-2xl font-black text-base uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-2xl shadow-purple-900/50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 active:scale-95"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>
                  {flowState === "generating"
                    ? "ROLLING..."
                    : flowState === "submitting"
                    ? "CHECK WALLET..."
                    : flowState === "confirming"
                    ? "CONFIRMING ON-CHAIN..."
                    : "OPEN BOX"}
                </span>
              </button>
            )}

            <p className="text-[11px] text-zinc-400 font-medium">
              Free opening · Testnet demo
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 p-3 rounded-xl bg-rose-950/50 border border-rose-800/50 text-rose-300 text-xs flex items-center space-x-2 max-w-md text-left">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
