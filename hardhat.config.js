/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-truffle5");
require("@nomicfoundation/hardhat-chai-matchers");

module.exports = {
  solidity: {
    // Only use Solidity versions `>=0.8.20` for EVM networks that support the opcode `PUSH0`
    // Otherwise, use the versions `<=0.8.19`
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
    },
  },
};
