require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const config = require("./network-config.json");

module.exports = {
  // Configure our networks
  networks: {
    development: {
      host: config.development.host,
      port: config.development.port,
      network_id: config.development.network_id,
    },
    mainnet: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: { phrase: process.env.SEEDPHRASE },
          providerOrUrl: `${config.mainnet.url}/${process.env.PROJECTID}`,
        }),
      network_id: config.mainnet.network_id,
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: { phrase: process.env.SEEDPHRASE },
          providerOrUrl: `${config.rinkeby.url}/${process.env.PROJECTID}`,
        }),
      network_id: config.rinkeby.network_id,
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: { phrase: process.env.SEEDPHRASE },
          providerOrUrl: `${config.ropsten.url}/${process.env.PROJECTID}`,
        }),
      network_id: config.ropsten.network_id,
    },
    kovan: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: { phrase: process.env.SEEDPHRASE },
          providerOrUrl: `${config.kovan.url}/${process.env.PROJECTID}`,
        }),
      network_id: config.kovan.network_id,
    },
    goerli: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: { phrase: process.env.SEEDPHRASE },
          providerOrUrl: `${config.goerli.url}/${process.env.PROJECTID}`,
        }),
      network_id: config.goerli.network_id,
    },
    sepolia: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: { phrase: process.env.SEEDPHRASE },
          providerOrUrl: `${config.sepolia.url}`,
        }),
      network_id: config.sepolia.network_id,
    },
  },

  // Configure our compilers
  compilers: {
    solc: {
      version: "0.8.17",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
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
