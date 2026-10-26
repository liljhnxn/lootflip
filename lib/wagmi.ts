import { http, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { botchainTestnet } from "./contractConfig";

export const wagmiConfig = createConfig({
  chains: [botchainTestnet],
  connectors: [
    injected({
      target: "metaMask",
    }),
    injected(),
  ],
  transports: {
    [botchainTestnet.id]: http("https://rpc.bohr.life"),
  },
  ssr: true,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
