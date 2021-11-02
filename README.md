# Bytecode Deployer
Helper smart contract to make easier and safer usage of the `CREATE` Ethereum Virtual Machine (EVM) opcode. `CREATE`, in a way, does a built-in call. What actually happens is that the data passed to that call isn't the contract bytecode, it's the **init bytecode** (a.k.a. creation bytecode).

When the `CREATE` opcode is executed, the EVM creates a call frame in the context of the new contract (e.g. `address(this)` is the new contract's address). This executes the data passed to `CREATE` as the code, which in higher level languages is basically the constructor. At the end of this init stuff, it returns the actual code of the contract that is stored in the state trie.

The easiest way to think about it, which is also fairly accurate, is that the Solidity compiler takes all the executional code of the contract, compiles it to bytecode, and adds it as a return statement at the end of the constructor.

## Deployments
- Rinkeby: [0x31EE2C16B5c6d47195fb40020E979858740F9b93](https://rinkeby.etherscan.io/address/0x31ee2c16b5c6d47195fb40020e979858740f9b93)
- Ropsten: [0xf0Da2BC8c594f0cb975a67765709b8aa0F37B379](https://ropsten.etherscan.io/address/0xf0Da2BC8c594f0cb975a67765709b8aa0F37B379)
- Kovan: [0xd72c0cBC4B44957b2c46d6c21E897c50a2d71D79](https://kovan.etherscan.io/address/0xd72c0cBC4B44957b2c46d6c21E897c50a2d71D79)
- Goerli: [0xbf614762da866E0E55C273945C018f588E45B71b](https://goerli.etherscan.io/address/0xbf614762da866E0E55C273945C018f588E45B71b)
