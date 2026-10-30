import { http, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { botchain } from "./contractConfig";

export const wagmiConfig = createConfig({
  chains: [botchain],
  connectors: [
    injected({
      target: "metaMask",
    }),
    injected(),
  ],
  transports: {
    [botchain.id]: http(process.env.NEXT_PUBLIC_BOTCHAIN_RPC_URL || "https://rpc.botchain.ai"),
  },
  ssr: true,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
