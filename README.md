# Bytecode Deployer

Helper smart contract to make easier and safer usage of the `CREATE` Ethereum Virtual Machine (EVM) opcode. `CREATE`, in a way, does a built-in call. What actually happens is that the data passed to that call isn't the contract bytecode, it's the **init bytecode** (a.k.a. creation bytecode).

When the `CREATE` opcode is executed, the EVM creates a call frame in the context of the new contract (e.g. `address(this)` is the new contract's address). This executes the data passed to `CREATE` as the code, which in higher level languages is basically the constructor. At the end of this init stuff, it returns the actual code of the contract that is stored in the state trie.

The easiest way to think about it, which is also fairly accurate, is that the Solidity compiler takes all the executional code of the contract, compiles it to bytecode, and adds it as a return statement at the end of the constructor.

## Deployments

- Rinkeby: [`0xa46Fd83F1197506d39DBe870Dec21f078DF8265f`](https://rinkeby.etherscan.io/address/0xa46Fd83F1197506d39DBe870Dec21f078DF8265f)
- Ropsten: [`0x74E022542823C69E7D28974cB8d310Acf8E747D4`](https://ropsten.etherscan.io/address/0x74E022542823C69E7D28974cB8d310Acf8E747D4)
- Kovan: [`0xCbCAD8702Ce84D2B6eC0cD5E68ED81A81A09a945`](https://kovan.etherscan.io/address/0xCbCAD8702Ce84D2B6eC0cD5E68ED81A81A09a945)
- Goerli: [`0x470301ed535B83Ee46B9D3f7c9Db1E0c69448f13`](https://goerli.etherscan.io/address/0x470301ed535B83Ee46B9D3f7c9Db1E0c69448f13)
