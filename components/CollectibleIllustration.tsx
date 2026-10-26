import React from "react";
import { Collectible, Rarity } from "../lib/collectibles";

interface Props {
  collectible: Collectible;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  isLegendaryGlow?: boolean;
}

export function CollectibleIllustration({
  collectible,
  size = "md",
  className = "",
  isLegendaryGlow = false,
}: Props) {
  const sizeMap = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-36 h-36",
    xl: "w-48 h-48",
  };

  const isLegendary = collectible.rarity === Rarity.LEGENDARY;

  return (
    <div
      className={`relative flex items-center justify-center rounded-2xl p-2 select-none transition-all duration-300 ${
        sizeMap[size]
      } ${
        isLegendary || isLegendaryGlow
          ? "ring-2 ring-amber-400/50 shadow-[0_0_25px_rgba(251,191,36,0.25)]"
          : ""
      } ${className}`}
      style={{
        background: `radial-gradient(circle at 50% 40%, ${
          collectible.rarity === Rarity.LEGENDARY
            ? "rgba(251, 191, 36, 0.18)"
            : collectible.rarity === Rarity.EPIC
            ? "rgba(192, 132, 252, 0.15)"
            : collectible.rarity === Rarity.RARE
            ? "rgba(56, 189, 248, 0.15)"
            : "rgba(148, 163, 184, 0.1)"
        }, transparent 75%)`,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id={`grad-legendary-${collectible.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <linearGradient id={`grad-epic-${collectible.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e9d5ff" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#7e22ce" />
          </linearGradient>

          <linearGradient id={`grad-rare-${collectible.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          <linearGradient id={`grad-common-${collectible.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          <filter id={`glow-${collectible.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1: Rusty Iron Dagger */}
        {collectible.svgType === "dagger" && (
          <g transform="translate(10, 10) rotate(15 40 40)">
            {/* Blade */}
            <path
              d="M40 8 L50 22 L45 54 L35 54 L30 22 Z"
              fill={`url(#grad-common-${collectible.id})`}
              stroke="#64748b"
              strokeWidth="1.5"
            />
            {/* Ridge */}
            <line x1="40" y1="10" x2="40" y2="52" stroke="#334155" strokeWidth="1.2" />
            {/* Guard */}
            <rect x="24" y="54" width="32" height="6" rx="2" fill="#78350f" stroke="#b45309" strokeWidth="1" />
            {/* Hilt */}
            <rect x="36" y="60" width="8" height="18" rx="1.5" fill="#451a03" />
            <line x1="36" y1="64" x2="44" y2="64" stroke="#78350f" strokeWidth="1" />
            <line x1="36" y1="69" x2="44" y2="69" stroke="#78350f" strokeWidth="1" />
            <line x1="36" y1="74" x2="44" y2="74" stroke="#78350f" strokeWidth="1" />
            {/* Pommel */}
            <circle cx="40" cy="81" r="5" fill="#92400e" stroke="#f59e0b" strokeWidth="1" />
          </g>
        )}

        {/* 2: Old Miner's Lantern */}
        {collectible.svgType === "lantern" && (
          <g transform="translate(15, 10)">
            {/* Handle */}
            <path d="M22 24 C22 10, 48 10, 48 24" fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
            {/* Top cap */}
            <path d="M25 24 L45 24 L48 30 L22 30 Z" fill="#92400e" stroke="#b45309" strokeWidth="1" />
            <rect x="32" y="20" width="6" height="4" rx="1" fill="#d97706" />
            {/* Glass body */}
            <rect x="22" y="30" width="26" height="34" rx="4" fill="rgba(251, 191, 36, 0.25)" stroke="#78350f" strokeWidth="2" />
            {/* Inner Flame with pulse */}
            <path
              d="M35 56 C30 52, 30 42, 35 38 C40 42, 40 52, 35 56 Z"
              fill="#fbbf24"
              filter={`url(#glow-${collectible.id})`}
            />
            <circle cx="35" cy="48" r="3" fill="#ffffff" />
            {/* Base */}
            <rect x="20" y="64" width="30" height="8" rx="2" fill="#78350f" stroke="#b45309" strokeWidth="1" />
          </g>
        )}

        {/* 3: Copper Guild Badge */}
        {collectible.svgType === "badge" && (
          <g transform="translate(15, 15)">
            <polygon
              points="35,5 60,18 60,50 35,66 10,50 10,18"
              fill={`url(#grad-common-${collectible.id})`}
              stroke="#b45309"
              strokeWidth="2"
            />
            <polygon
              points="35,12 53,22 53,46 35,58 17,46 17,22"
              fill="rgba(180, 83, 9, 0.15)"
              stroke="#d97706"
              strokeWidth="1"
            />
            {/* Oak branch emblem */}
            <path d="M35 25 L35 48 M28 32 L35 38 L42 32 M29 42 L35 45 L41 42" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* 4: Arcane Chrono Ring */}
        {collectible.svgType === "ring" && (
          <g transform="translate(15, 15)">
            {/* Outer ring */}
            <circle cx="35" cy="35" r="28" stroke="url(#grad-rare-4)" strokeWidth="5" fill="rgba(56, 189, 248, 0.1)" />
            {/* Inner gears */}
            <circle cx="35" cy="35" r="20" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 3" />
            {/* Center gem */}
            <polygon points="35,24 43,35 35,46 27,35" fill="#38bdf8" filter={`url(#glow-${collectible.id})`} />
            <circle cx="35" cy="35" r="4" fill="#ffffff" />
            {/* Hour tick marks */}
            <line x1="35" y1="10" x2="35" y2="15" stroke="#7dd3fc" strokeWidth="2" />
            <line x1="35" y1="55" x2="35" y2="60" stroke="#7dd3fc" strokeWidth="2" />
            <line x1="10" y1="35" x2="15" y2="35" stroke="#7dd3fc" strokeWidth="2" />
            <line x1="55" y1="35" x2="60" y2="35" stroke="#7dd3fc" strokeWidth="2" />
          </g>
        )}

        {/* 5: Phantom Silk Cloak */}
        {collectible.svgType === "cloak" && (
          <g transform="translate(15, 12)">
            {/* Cloak folds */}
            <path
              d="M35 15 C26 15, 15 25, 12 65 C22 60, 28 68, 35 63 C42 68, 48 60, 58 65 C55 25, 44 15, 35 15 Z"
              fill="url(#grad-rare-5)"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            {/* Hood / Cowl */}
            <path
              d="M26 18 C26 8, 44 8, 44 18 C44 26, 26 26, 26 18 Z"
              fill="#0c4a6e"
              stroke="#0ea5e9"
              strokeWidth="1.5"
            />
            {/* Rune clasp */}
            <circle cx="35" cy="28" r="4" fill="#7dd3fc" filter={`url(#glow-${collectible.id})`} />
            {/* Mystical shadow lines */}
            <path d="M24 35 Q28 50 25 60" stroke="#0284c7" strokeWidth="1.5" fill="none" />
            <path d="M46 35 Q42 50 45 60" stroke="#0284c7" strokeWidth="1.5" fill="none" />
          </g>
        )}

        {/* 6: Frostforged Flail */}
        {collectible.svgType === "flail" && (
          <g transform="translate(10, 10)">
            {/* Handle */}
            <line x1="20" y1="75" x2="45" y2="50" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
            <line x1="18" y1="77" x2="26" y2="69" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
            {/* Chain links */}
            <circle cx="48" cy="46" r="3" fill="none" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="53" cy="40" r="3" fill="none" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="58" cy="33" r="3" fill="none" stroke="#94a3b8" strokeWidth="2" />
            {/* Spiked Frost Ball */}
            <g transform="translate(68, 22)">
              <circle cx="0" cy="0" r="14" fill="url(#grad-rare-6)" stroke="#bae6fd" strokeWidth="2" />
              {/* Spikes */}
              <polygon points="0,-14 -3,-22 3,-22" fill="#7dd3fc" />
              <polygon points="0,14 -3,22 3,22" fill="#7dd3fc" />
              <polygon points="-14,0 -22,-3 -22,3" fill="#7dd3fc" />
              <polygon points="14,0 22,-3 22,3" fill="#7dd3fc" />
              <polygon points="-10,-10 -18,-18 -12,-18" fill="#7dd3fc" />
              <polygon points="10,10 18,18 12,18" fill="#7dd3fc" />
              <polygon points="10,-10 18,-18 18,-12" fill="#7dd3fc" />
              <polygon points="-10,10 -18,18 -18,12" fill="#7dd3fc" />
              <circle cx="0" cy="0" r="5" fill="#ffffff" filter={`url(#glow-${collectible.id})`} />
            </g>
          </g>
        )}

        {/* 7: Dragon Heart Prism */}
        {collectible.svgType === "prism" && (
          <g transform="translate(18, 12)">
            {/* Crystal Shard Polygon */}
            <polygon
              points="32,6 54,26 46,62 32,72 18,62 10,26"
              fill="url(#grad-epic-7)"
              stroke="#e9d5ff"
              strokeWidth="2"
              filter={`url(#glow-${collectible.id})`}
            />
            {/* Facet lines */}
            <polygon points="32,6 32,72 46,62 54,26" fill="rgba(126, 34, 206, 0.4)" />
            <polygon points="32,22 42,34 32,54 22,34" fill="#f43f5e" />
            <line x1="32" y1="6" x2="32" y2="72" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="10" y1="26" x2="32" y2="22" stroke="#c084fc" strokeWidth="1" />
            <line x1="54" y1="26" x2="32" y2="22" stroke="#c084fc" strokeWidth="1" />
            <line x1="18" y1="62" x2="32" y2="54" stroke="#c084fc" strokeWidth="1" />
            <line x1="46" y1="62" x2="32" y2="54" stroke="#c084fc" strokeWidth="1" />
            {/* Core ember */}
            <circle cx="32" cy="38" r="5" fill="#fef08a" />
          </g>
        )}

        {/* 8: Voidwalker's Compass */}
        {collectible.svgType === "compass" && (
          <g transform="translate(15, 15)">
            {/* Outer casing */}
            <circle cx="35" cy="35" r="28" fill="#1e1b4b" stroke="url(#grad-epic-8)" strokeWidth="3.5" />
            <circle cx="35" cy="35" r="23" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Rotating nebula swirl */}
            <circle cx="35" cy="35" r="16" fill="rgba(192, 132, 252, 0.2)" />
            {/* Compass Needle */}
            <polygon points="35,12 40,35 35,32 30,35" fill="#f43f5e" filter={`url(#glow-${collectible.id})`} />
            <polygon points="35,58 40,35 35,38 30,35" fill="#818cf8" />
            {/* Pivot */}
            <circle cx="35" cy="35" r="4" fill="#ffffff" stroke="#c084fc" strokeWidth="1.5" />
            {/* Cosmic star ticks */}
            <circle cx="35" cy="15" r="1.5" fill="#e9d5ff" />
            <circle cx="35" cy="55" r="1.5" fill="#e9d5ff" />
            <circle cx="15" cy="35" r="1.5" fill="#e9d5ff" />
            <circle cx="55" cy="35" r="1.5" fill="#e9d5ff" />
          </g>
        )}

        {/* 9: Solaris Aegis */}
        {collectible.svgType === "shield" && (
          <g transform="translate(15, 12)">
            {/* Shield Outline */}
            <path
              d="M35 10 C50 10, 60 16, 60 36 C60 56, 44 68, 35 74 C26 68, 10 56, 10 36 C10 16, 20 10, 35 10 Z"
              fill="url(#grad-epic-9)"
              stroke="#fbbf24"
              strokeWidth="2.5"
            />
            {/* Inner rim */}
            <path
              d="M35 16 C46 16, 54 21, 54 36 C54 52, 42 61, 35 66 C28 61, 16 52, 16 36 C16 21, 24 16, 35 16 Z"
              fill="#2e1065"
              stroke="#c084fc"
              strokeWidth="1.5"
            />
            {/* Sunburst emblem */}
            <circle cx="35" cy="38" r="8" fill="#fbbf24" filter={`url(#glow-${collectible.id})`} />
            {/* Sun rays */}
            <line x1="35" y1="24" x2="35" y2="28" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="35" y1="48" x2="35" y2="52" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="21" y1="38" x2="25" y2="38" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="45" y1="38" x2="49" y2="38" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="25" y1="28" x2="28" y2="31" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
            <line x1="42" y1="45" x2="45" y2="48" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
            <line x1="45" y1="28" x2="42" y2="31" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
            <line x1="28" y1="45" x2="25" y2="48" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* 10: Crown of the Astral King */}
        {collectible.svgType === "crown" && (
          <g transform="translate(10, 15)">
            {/* Starlight beams aura */}
            <path d="M40 5 L40 18 M16 22 L24 28 M64 22 L56 28" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
            {/* Crown base structure */}
            <path
              d="M12 55 L16 30 L28 42 L40 18 L52 42 L64 30 L68 55 Z"
              fill="url(#grad-legendary-10)"
              stroke="#fef08a"
              strokeWidth="2.5"
              filter={`url(#glow-${collectible.id})`}
            />
            {/* Crown band */}
            <rect x="10" y="55" width="60" height="10" rx="3" fill="#78350f" stroke="#fbbf24" strokeWidth="2" />
            {/* Band jewels */}
            <circle cx="20" cy="60" r="3" fill="#38bdf8" />
            <circle cx="40" cy="60" r="4" fill="#ec4899" />
            <circle cx="60" cy="60" r="3" fill="#38bdf8" />
            {/* Peak Gems */}
            <circle cx="40" cy="18" r="4" fill="#ffffff" />
            <circle cx="16" cy="30" r="3" fill="#fde047" />
            <circle cx="64" cy="30" r="3" fill="#fde047" />
          </g>
        )}

        {/* 11: Celestial Godblade */}
        {collectible.svgType === "godblade" && (
          <g transform="translate(10, 10) rotate(25 40 40)">
            {/* Godblade aura */}
            <path
              d="M40 2 L47 20 L44 60 L36 60 L33 20 Z"
              fill="url(#grad-legendary-11)"
              stroke="#fef08a"
              strokeWidth="2"
              filter={`url(#glow-${collectible.id})`}
            />
            {/* Core stellar energy channel */}
            <line x1="40" y1="6" x2="40" y2="58" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            {/* Crossguard with winged celestial motifs */}
            <path
              d="M18 58 Q40 54 62 58 Q40 68 18 58 Z"
              fill="#78350f"
              stroke="#fbbf24"
              strokeWidth="2"
            />
            <circle cx="40" cy="60" r="4" fill="#38bdf8" />
            {/* Grip */}
            <rect x="37" y="64" width="6" height="18" rx="1.5" fill="#451a03" />
            <line x1="37" y1="68" x2="43" y2="68" stroke="#f59e0b" strokeWidth="1" />
            <line x1="37" y1="74" x2="43" y2="74" stroke="#f59e0b" strokeWidth="1" />
            {/* Stellar star pommel */}
            <polygon points="40,83 42,88 47,88 43,91 45,96 40,93 35,96 37,91 33,88 38,88" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
          </g>
        )}

        {/* 12: Genesis Singularity Core */}
        {collectible.svgType === "singularity" && (
          <g transform="translate(15, 15)">
            {/* Outer cosmic orbital ring */}
            <ellipse
              cx="35"
              cy="35"
              rx="30"
              ry="12"
              fill="none"
              stroke="url(#grad-legendary-12)"
              strokeWidth="3"
              transform="rotate(-25 35 35)"
              filter={`url(#glow-${collectible.id})`}
            />
            {/* Second counter-orbital ring */}
            <ellipse
              cx="35"
              cy="35"
              rx="30"
              ry="12"
              fill="none"
              stroke="#c084fc"
              strokeWidth="2"
              transform="rotate(35 35 35)"
            />
            {/* Central Event Horizon */}
            <circle cx="35" cy="35" r="14" fill="#09090b" stroke="#fbbf24" strokeWidth="3" />
            {/* Quantum spark core */}
            <circle cx="35" cy="35" r="6" fill="#fef08a" filter={`url(#glow-${collectible.id})`} />
            <circle cx="35" cy="35" r="2.5" fill="#ffffff" />
            {/* Radiating quantum flux pulses */}
            <circle cx="16" cy="22" r="2" fill="#fde047" />
            <circle cx="54" cy="48" r="2" fill="#fde047" />
            <circle cx="50" cy="18" r="2" fill="#38bdf8" />
            <circle cx="20" cy="52" r="2" fill="#c084fc" />
          </g>
        )}
      </svg>
    </div>
  );
}
