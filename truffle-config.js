require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  // Configure our networks
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*",
    },
    mainnet: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: { phrase: process.env.SEEDPHRASE },
          providerOrUrl: process.env.ETH_MAINNET_URL,
        }),
    },
    goerli: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: { phrase: process.env.SEEDPHRASE },
          providerOrUrl: process.env.ETH_GOERLI_TESTNET_URL,
        }),
    },
    sepolia: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: { phrase: process.env.SEEDPHRASE },
          providerOrUrl: process.env.ETH_SEPOLIA_TESTNET_URL,
        }),
    },
  },

  // Configure our compiler settings
  compilers: {
    solc: {
      version: "0.8.19",
      settings: {
        optimizer: {
          enabled: true,
          runs: 999999,
        },
      },
    },
  },

  // Configure our plugins
  plugins: ["truffle-plugin-verify"],

  // Configure our API keys
  api_keys: {
    etherscan: process.env.ETHERSCANKEY,
  },
};
