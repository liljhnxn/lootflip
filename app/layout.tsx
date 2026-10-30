import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../components/Providers";

export const metadata: Metadata = {
  title: "LootFlip 🎁 | Every Box Holds a Surprise - Web3 Mystery Box",
  description:
    "Open free mystery boxes on Botchain Mainnet, discover digital collectibles across Common, Rare, Epic, and Legendary rarities, and record your loot on-chain.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className="bg-zinc-950 text-zinc-100 antialiased min-h-screen"
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
