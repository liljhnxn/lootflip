import React from "react";

interface Props {
  state: "idle" | "opening" | "opened";
  rarityGlow?: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
  className?: string;
  onClick?: () => void;
}

export function MysteryBoxIllustration({
  state,
  rarityGlow,
  className = "",
  onClick,
}: Props) {
  const isOpening = state === "opening";
  const isOpened = state === "opened";

  const glowColors = {
    COMMON: "rgba(148, 163, 184, 0.4)",
    RARE: "rgba(56, 189, 248, 0.5)",
    EPIC: "rgba(192, 132, 252, 0.6)",
    LEGENDARY: "rgba(251, 191, 36, 0.8)",
  };

  const currentGlow = rarityGlow ? glowColors[rarityGlow] : "rgba(168, 85, 247, 0.45)";

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center select-none cursor-pointer transition-transform duration-300 ${
        state === "idle" ? "hover:scale-105 active:scale-95" : ""
      } ${className}`}
    >
      {/* Background radial ambient aura */}
      <div
        className={`absolute w-72 h-72 rounded-full pointer-events-none transition-all duration-700 blur-3xl ${
          isOpening ? "animate-pulse scale-125 opacity-90" : "opacity-60"
        }`}
        style={{
          background: `radial-gradient(circle, ${currentGlow} 0%, transparent 70%)`,
        }}
      />

      {/* SVG Mystery Box */}
      <div
        className={`relative w-56 h-56 sm:w-64 sm:h-64 transition-all duration-500 ${
          isOpening ? "animate-bounce" : state === "idle" ? "hover:-translate-y-2" : ""
        }`}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-2xl overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Box Body Gradients */}
            <linearGradient id="box-front" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2e1065" />
              <stop offset="50%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="box-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#581c87" />
              <stop offset="100%" stopColor="#3b0764" />
            </linearGradient>

            <linearGradient id="box-side" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#090d16" />
            </linearGradient>

            {/* Gold Trim Gradients */}
            <linearGradient id="gold-trim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="45%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            {/* Neon Seam Glow Filter */}
            <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Cast Shadow */}
          <ellipse
            cx="100"
            cy="180"
            rx={isOpening ? "65" : "75"}
            ry="18"
            fill="rgba(0, 0, 0, 0.6)"
            className="transition-all duration-300"
          />

          {/* Light Rays if Opened */}
          {isOpened && (
            <g opacity="0.8" className="animate-pulse">
              <polygon points="100,50 30,0 60,0" fill="url(#gold-trim)" opacity="0.4" />
              <polygon points="100,50 140,0 170,0" fill="url(#gold-trim)" opacity="0.4" />
              <polygon points="100,50 85,-20 115,-20" fill="#fef08a" opacity="0.7" />
            </g>
          )}

          {/* MAIN BOX BASE */}
          <g transform="translate(0, 15)">
            {/* Front Panel */}
            <path
              d="M45 85 L100 115 L155 85 L155 145 L100 175 L45 145 Z"
              fill="url(#box-front)"
              stroke="#581c87"
              strokeWidth="2"
            />

            {/* Left face facet */}
            <path
              d="M45 85 L100 115 L100 175 L45 145 Z"
              fill="#18181b"
              fillOpacity="0.35"
            />

            {/* Front Gold Band Vertical */}
            <path
              d="M94 118 L106 112 L106 172 L94 178 Z"
              fill="url(#gold-trim)"
            />

            {/* Front Gold Band Horizontal */}
            <path
              d="M45 112 L100 142 L155 112 L155 120 L100 150 L45 120 Z"
              fill="url(#gold-trim)"
              opacity="0.8"
            />

            {/* Arcane Core Gem / Lock on Chest Face */}
            <g transform="translate(100, 142)">
              <polygon
                points="0,-12 10,0 0,12 -10,0"
                fill={isOpening ? "#f43f5e" : "#c084fc"}
                stroke="#fef08a"
                strokeWidth="2"
                filter="url(#neon-glow)"
              />
              <circle cx="0" cy="0" r="3" fill="#ffffff" />
            </g>

            {/* Corner Reinforcement Brackets */}
            <polygon points="45,140 45,145 60,153 60,148" fill="url(#gold-trim)" />
            <polygon points="155,140 155,145 140,153 140,148" fill="url(#gold-trim)" />
            <polygon points="95,172 100,175 105,172 105,166 95,166" fill="url(#gold-trim)" />
          </g>

          {/* BOX LID */}
          <g
            className="transition-all duration-500 origin-center"
            transform={
              isOpened
                ? "translate(0, -25) rotate(-15 100 50)"
                : isOpening
                ? "translate(0, -6)"
                : "translate(0, 0)"
            }
          >
            {/* Lid Top Hexagon / Diamond Plate */}
            <polygon
              points="100,30 165,65 100,100 35,65"
              fill="url(#box-top)"
              stroke="url(#gold-trim)"
              strokeWidth="2.5"
            />

            {/* Lid Front Lip */}
            <polygon
              points="35,65 100,100 100,112 35,77"
              fill="#3b0764"
              stroke="#581c87"
              strokeWidth="1.5"
            />
            <polygon
              points="100,100 165,65 165,77 100,112"
              fill="#1e1b4b"
              stroke="#581c87"
              strokeWidth="1.5"
            />

            {/* Lid Gold Rim Edge */}
            <polygon
              points="35,75 100,110 165,75 165,79 100,114 35,79"
              fill="url(#gold-trim)"
            />

            {/* Lid Crest: Arcane Cross Pattern */}
            <line x1="100" y1="35" x2="100" y2="95" stroke="url(#gold-trim)" strokeWidth="3" />
            <line x1="42" y1="65" x2="158" y2="65" stroke="url(#gold-trim)" strokeWidth="3" />

            {/* Center Crown Latch */}
            <g transform="translate(100, 65)">
              <circle
                cx="0"
                cy="0"
                r="10"
                fill="#2e1065"
                stroke="url(#gold-trim)"
                strokeWidth="2"
              />
              <polygon
                points="0,-6 6,0 0,6 -6,0"
                fill={isOpening ? "#fbbf24" : "#a855f7"}
                filter="url(#neon-glow)"
              />
            </g>
          </g>

          {/* Energy Sparks during Opening */}
          {isOpening && (
            <g className="animate-spin origin-center" opacity="0.9">
              <circle cx="65" cy="50" r="2.5" fill="#fef08a" />
              <circle cx="140" cy="55" r="3" fill="#a855f7" />
              <circle cx="80" cy="110" r="2" fill="#38bdf8" />
              <circle cx="130" cy="120" r="2.5" fill="#fbbf24" />
              <circle cx="100" cy="30" r="3" fill="#ffffff" />
            </g>
          )}
        </svg>
      </div>

      {/* Runic Ambient Indicator */}
      <div className="mt-3 flex items-center space-x-2 text-xs font-medium tracking-wider text-purple-300/80">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>BOTCHAIN MYSTERY BOX</span>
      </div>
    </div>
  );
}
