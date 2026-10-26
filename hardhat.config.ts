import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";

dotenv.config();

const BOTCHAIN_RPC_URL = process.env.BOTCHAIN_RPC_URL || "https://rpc.bohr.life";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    botchain: {
      type: "http",
      url: BOTCHAIN_RPC_URL,
      chainId: 968,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};

export default config;
