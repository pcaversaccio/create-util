# Bytecode Deployer

Helper smart contract to make easier and safer usage of the `CREATE` Ethereum Virtual Machine (EVM) opcode. `CREATE`, in a way, does a built-in call. What actually happens is that the data passed to that call isn't the contract bytecode, it's the **init bytecode** (a.k.a. creation bytecode).

When the `CREATE` opcode is executed, the EVM creates a call frame in the context of the new contract (e.g. `address(this)` is the new contract's address). This executes the data passed to `CREATE` as the code, which in higher level languages is basically the constructor. At the end of this init stuff, it returns the actual code of the contract that is stored in the state trie.

The easiest way to think about it, which is also fairly accurate, is that the Solidity compiler takes all the executional code of the contract, compiles it to bytecode, and adds it as a return statement at the end of the constructor.

## Deployments

- Rinkeby: [`0x0d085df71B0A581200D9411A80E668BFA1A01814`](https://rinkeby.etherscan.io/address/0x0d085df71B0A581200D9411A80E668BFA1A01814)
- Ropsten: [`0x64cFD0214fA15Fff2A612C31e493769556A14017`](https://ropsten.etherscan.io/address/0x64cFD0214fA15Fff2A612C31e493769556A14017)
- Kovan: [`0xCB1F0aD565b8647f6253dBCBD9A4C1cA111D21f1`](https://kovan.etherscan.io/address/0xCB1F0aD565b8647f6253dBCBD9A4C1cA111D21f1)
- Goerli: [`0x05ECaD99862F05585B6C9ba0dA72513b31FdF9A8`](https://goerli.etherscan.io/address/0x05ECaD99862F05585B6C9ba0dA72513b31FdF9A8)
