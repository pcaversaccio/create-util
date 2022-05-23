# `CREATE` Factory

[![🕵️‍♂️ Test smart contracts](https://github.com/pcaversaccio/create-util/actions/workflows/test-contracts.yml/badge.svg)](https://github.com/pcaversaccio/create-util/actions/workflows/test-contracts.yml)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

Helper smart contract [`Create.sol`](./contracts/Create.sol) to make easier and safer usage of the `CREATE` Ethereum Virtual Machine (EVM) opcode. `CREATE`, in a way, does a built-in call. What actually happens is that the data passed to that call isn't the contract bytecode, it's the **init bytecode** (a.k.a. creation bytecode).

When the `CREATE` opcode is executed, the EVM creates a call frame in the context of the new contract (e.g. `address(this)` is the new contract's address). This executes the data passed to `CREATE` as the code, which in higher level languages is basically the constructor. At the end of this init stuff, it returns the actual code of the contract that is stored in the state trie.

The easiest way to think about it, which is also fairly accurate, is that the Solidity compiler takes all the executional code of the contract, compiles it to bytecode, and adds it as a return statement at the end of the constructor.

The smart contract [`Create.sol`](./contracts/Create.sol) also provides a function `computeAddress` that returns (via the Recursive Length Prefix (RLP) encoding scheme) the address where a contract will be stored if deployed via `CREATE`.

## Deployments

- Rinkeby: [`0x3e4BfDAa089dB5E854CfF9ABe1D9Dd3B8373E2e3`](https://rinkeby.etherscan.io/address/0x3e4BfDAa089dB5E854CfF9ABe1D9Dd3B8373E2e3)
- Ropsten: [`0x1f569322C9b88d61984b18D1251460C83d7B1D34`](https://ropsten.etherscan.io/address/0x1f569322C9b88d61984b18D1251460C83d7B1D34)
- Kovan: [`0x3a923885708E6431A5215C501eae42e1b2e72baE`](https://kovan.etherscan.io/address/0x3a923885708E6431A5215C501eae42e1b2e72baE)
- Goerli: [`0x14EBa15433A35085393D5fE77f186e20e64Fe133`](https://goerli.etherscan.io/address/0x14EBa15433A35085393D5fE77f186e20e64Fe133)
- Sepolia: [`0xc8851BFCbE379cc058608cb548BC733F86448B3B`](https://sepolia.etherscan.io/address/0xc8851BFCbE379cc058608cb548BC733F86448B3B)
