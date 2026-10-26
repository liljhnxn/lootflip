export enum Rarity {
  COMMON = 0,
  RARE = 1,
  EPIC = 2,
  LEGENDARY = 3,
}

export interface Collectible {
  id: number;
  name: string;
  rarity: Rarity;
  rarityName: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
  probabilityLabel: string;
  description: string;
  category: string;
  themeColor: {
    border: string;
    bg: string;
    badgeBg: string;
    badgeText: string;
    glow: string;
    accent: string;
    gradient: string;
  };
  svgType: string;
}

export const RARITY_CONFIG: Record<
  Rarity,
  {
    name: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
    weight: number;
    color: string;
    badgeBg: string;
    badgeText: string;
    borderColor: string;
    glowColor: string;
    description: string;
  }
> = {
  [Rarity.COMMON]: {
    name: "COMMON",
    weight: 60,
    color: "#94a3b8", // Slate 400
    badgeBg: "rgba(148, 163, 184, 0.15)",
    badgeText: "#cbd5e1",
    borderColor: "rgba(148, 163, 184, 0.3)",
    glowColor: "rgba(148, 163, 184, 0.2)",
    description: "Everyday gear discovered across the frontier realms.",
  },
  [Rarity.RARE]: {
    name: "RARE",
    weight: 25,
    color: "#38bdf8", // Sky 400
    badgeBg: "rgba(56, 189, 248, 0.15)",
    badgeText: "#7dd3fc",
    borderColor: "rgba(56, 189, 248, 0.4)",
    glowColor: "rgba(56, 189, 248, 0.3)",
    description: "Infused with elemental sorcery and rare alloy work.",
  },
  [Rarity.EPIC]: {
    name: "EPIC",
    weight: 12,
    color: "#c084fc", // Purple 400
    badgeBg: "rgba(192, 132, 252, 0.18)",
    badgeText: "#e9d5ff",
    borderColor: "rgba(192, 132, 252, 0.45)",
    glowColor: "rgba(192, 132, 252, 0.4)",
    description: "Forged in the heart of arcane rifts, brimming with mystical energy.",
  },
  [Rarity.LEGENDARY]: {
    name: "LEGENDARY",
    weight: 3,
    color: "#fbbf24", // Amber 400
    badgeBg: "rgba(251, 191, 36, 0.2)",
    badgeText: "#fef08a",
    borderColor: "rgba(251, 191, 36, 0.6)",
    glowColor: "rgba(251, 191, 36, 0.5)",
    description: "Mythical artifacts of catastrophic power whispered in ancient prophecies.",
  },
};

export const COLLECTIBLES: Collectible[] = [
  // --- COMMON (IDs 1, 2, 3) ---
  {
    id: 1,
    name: "Rusty Iron Dagger",
    rarity: Rarity.COMMON,
    rarityName: "COMMON",
    probabilityLabel: "60% intended chance",
    category: "Weapon",
    description: "A weathered blade once carried by fledgling adventurers across the forgotten borders.",
    themeColor: {
      border: "border-slate-600/40",
      bg: "bg-slate-900/60",
      badgeBg: "bg-slate-800/80",
      badgeText: "text-slate-300",
      glow: "shadow-slate-500/10",
      accent: "#94a3b8",
      gradient: "from-slate-800/50 via-slate-900/50 to-zinc-950/80",
    },
    svgType: "dagger",
  },
  {
    id: 2,
    name: "Old Miner's Lantern",
    rarity: Rarity.COMMON,
    rarityName: "COMMON",
    probabilityLabel: "60% intended chance",
    category: "Utility",
    description: "Emits a flickering amber flame that has guided treasure seekers through damp cavern depths.",
    themeColor: {
      border: "border-slate-600/40",
      bg: "bg-slate-900/60",
      badgeBg: "bg-slate-800/80",
      badgeText: "text-slate-300",
      glow: "shadow-amber-500/10",
      accent: "#d97706",
      gradient: "from-amber-950/30 via-slate-900/50 to-zinc-950/80",
    },
    svgType: "lantern",
  },
  {
    id: 3,
    name: "Copper Guild Badge",
    rarity: Rarity.COMMON,
    rarityName: "COMMON",
    probabilityLabel: "60% intended chance",
    category: "Relic",
    description: "An antique token stamped with the crest of the humble Wayfarers Guild.",
    themeColor: {
      border: "border-slate-600/40",
      bg: "bg-slate-900/60",
      badgeBg: "bg-slate-800/80",
      badgeText: "text-slate-300",
      glow: "shadow-orange-500/10",
      accent: "#b45309",
      gradient: "from-orange-950/30 via-slate-900/50 to-zinc-950/80",
    },
    svgType: "badge",
  },

  // --- RARE (IDs 4, 5, 6) ---
  {
    id: 4,
    name: "Arcane Chrono Ring",
    rarity: Rarity.RARE,
    rarityName: "RARE",
    probabilityLabel: "25% intended chance",
    category: "Accessory",
    description: "Forged with spinning azure gears that faintly murmur seconds of compressed time.",
    themeColor: {
      border: "border-sky-500/40",
      bg: "bg-sky-950/30",
      badgeBg: "bg-sky-900/50",
      badgeText: "text-sky-300",
      glow: "shadow-sky-500/20",
      accent: "#38bdf8",
      gradient: "from-sky-900/40 via-slate-900/60 to-zinc-950/90",
    },
    svgType: "ring",
  },
  {
    id: 5,
    name: "Phantom Silk Cloak",
    rarity: Rarity.RARE,
    rarityName: "RARE",
    probabilityLabel: "25% intended chance",
    category: "Armor",
    description: "Woven from twilight mist, dampening sound and blending into moonlit shadows.",
    themeColor: {
      border: "border-sky-500/40",
      bg: "bg-sky-950/30",
      badgeBg: "bg-sky-900/50",
      badgeText: "text-sky-300",
      glow: "shadow-cyan-500/20",
      accent: "#06b6d4",
      gradient: "from-cyan-950/40 via-slate-900/60 to-zinc-950/90",
    },
    svgType: "cloak",
  },
  {
    id: 6,
    name: "Frostforged Flail",
    rarity: Rarity.RARE,
    rarityName: "RARE",
    probabilityLabel: "25% intended chance",
    category: "Weapon",
    description: "The spiked orb remains perpetually frozen, leaving faint hoarfrost in its wake.",
    themeColor: {
      border: "border-sky-500/40",
      bg: "bg-sky-950/30",
      badgeBg: "bg-sky-900/50",
      badgeText: "text-sky-300",
      glow: "shadow-blue-500/20",
      accent: "#60a5fa",
      gradient: "from-blue-950/40 via-slate-900/60 to-zinc-950/90",
    },
    svgType: "flail",
  },

  // --- EPIC (IDs 7, 8, 9) ---
  {
    id: 7,
    name: "Dragon Heart Prism",
    rarity: Rarity.EPIC,
    rarityName: "EPIC",
    probabilityLabel: "12% intended chance",
    category: "Artifact",
    description: "A pulsating crimson shard encapsulating the untamed molten fury of an ancient wyrm.",
    themeColor: {
      border: "border-purple-500/50",
      bg: "bg-purple-950/30",
      badgeBg: "bg-purple-900/50",
      badgeText: "text-purple-300",
      glow: "shadow-purple-500/30",
      accent: "#c084fc",
      gradient: "from-purple-900/50 via-slate-900/60 to-zinc-950/90",
    },
    svgType: "prism",
  },
  {
    id: 8,
    name: "Voidwalker's Compass",
    rarity: Rarity.EPIC,
    rarityName: "EPIC",
    probabilityLabel: "12% intended chance",
    category: "Instrument",
    description: "Its obsidian needle points not North, but directly toward dimensional anomalies.",
    themeColor: {
      border: "border-purple-500/50",
      bg: "bg-purple-950/30",
      badgeBg: "bg-purple-900/50",
      badgeText: "text-purple-300",
      glow: "shadow-fuchsia-500/30",
      accent: "#e879f9",
      gradient: "from-fuchsia-950/50 via-slate-900/60 to-zinc-950/90",
    },
    svgType: "compass",
  },
  {
    id: 9,
    name: "Solaris Aegis",
    rarity: Rarity.EPIC,
    rarityName: "EPIC",
    probabilityLabel: "12% intended chance",
    category: "Shield",
    description: "Sun-blessed golden shield radiating divine warmth, impenetrable to chaotic spells.",
    themeColor: {
      border: "border-purple-500/50",
      bg: "bg-purple-950/30",
      badgeBg: "bg-purple-900/50",
      badgeText: "text-purple-300",
      glow: "shadow-violet-500/30",
      accent: "#a78bfa",
      gradient: "from-violet-950/50 via-slate-900/60 to-zinc-950/90",
    },
    svgType: "shield",
  },

  // --- LEGENDARY (IDs 10, 11, 12) ---
  {
    id: 10,
    name: "Crown of the Astral King",
    rarity: Rarity.LEGENDARY,
    rarityName: "LEGENDARY",
    probabilityLabel: "3% intended chance",
    category: "Regalia",
    description: "A coronet crafted from fallen star metal, commanding cosmic resonance and divine majesty.",
    themeColor: {
      border: "border-amber-400/60",
      bg: "bg-amber-950/30",
      badgeBg: "bg-amber-900/60",
      badgeText: "text-amber-300",
      glow: "shadow-amber-500/40",
      accent: "#fbbf24",
      gradient: "from-amber-900/60 via-purple-950/40 to-zinc-950/95",
    },
    svgType: "crown",
  },
  {
    id: 11,
    name: "Celestial Godblade",
    rarity: Rarity.LEGENDARY,
    rarityName: "LEGENDARY",
    probabilityLabel: "3% intended chance",
    category: "Weapon",
    description: "A mythic greatsword pulsating with supercharged starlight, cleaving through reality itself.",
    themeColor: {
      border: "border-amber-400/60",
      bg: "bg-amber-950/30",
      badgeBg: "bg-amber-900/60",
      badgeText: "text-amber-300",
      glow: "shadow-yellow-500/40",
      accent: "#f59e0b",
      gradient: "from-yellow-900/60 via-indigo-950/40 to-zinc-950/95",
    },
    svgType: "godblade",
  },
  {
    id: 12,
    name: "Genesis Singularity Core",
    rarity: Rarity.LEGENDARY,
    rarityName: "LEGENDARY",
    probabilityLabel: "3% intended chance",
    category: "Cosmic Source",
    description: "The primordial spark of creation itself, hovering in a state of perpetual quantum flux.",
    themeColor: {
      border: "border-amber-400/60",
      bg: "bg-amber-950/30",
      badgeBg: "bg-amber-900/60",
      badgeText: "text-amber-300",
      glow: "shadow-amber-400/50",
      accent: "#fbbf24",
      gradient: "from-amber-800/60 via-purple-900/50 to-zinc-950/95",
    },
    svgType: "singularity",
  },
];

export function getCollectibleById(id: number): Collectible {
  const found = COLLECTIBLES.find((c) => c.id === id);
  if (!found) {
    return COLLECTIBLES[0];
  }
  return found;
}
