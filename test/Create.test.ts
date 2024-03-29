import { expect } from "chai";
import { ContractDeployTransaction } from "ethers";
import hre from "hardhat";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { Create } from "../typechain-types";

describe("Create", function () {
  const name = "MyToken";
  const symbol = "MTKN";
  const initialBalance = 100;

  let deployerAccount: SignerWithAddress;

  let create: Create;
  let createAddr: string;

  let creationBytecode: ContractDeployTransaction;

  beforeEach(async function () {
    [deployerAccount] = await hre.ethers.getSigners();

    create = await hre.ethers.deployContract("Create", deployerAccount);
    await create.waitForDeployment();
    createAddr = await create.getAddress();

    const ERC20Mock = await hre.ethers.getContractFactory("ERC20Mock");
    creationBytecode = await ERC20Mock.getDeployTransaction(
      name,
      symbol,
      deployerAccount,
      initialBalance,
    );
  });

  describe("computeAddress", function () {
    it("computes the correct contract address - case 1: nonce 0x00", async function () {
      const nonce = 0x00;
      const onChainComputed = await create.computeAddress(
        deployerAccount.address,
        nonce,
      );
      const offChainComputed = hre.ethers.getCreateAddress({
        from: deployerAccount.address,
        nonce: nonce,
      });
      expect(onChainComputed).to.equal(offChainComputed);
    });

    it("computes the correct contract address - case 2: nonce <= 0x7f", async function () {
      const nonce = 0x7f;
      const onChainComputed = await create.computeAddress(createAddr, nonce);
      const offChainComputed = hre.ethers.getCreateAddress({
        from: createAddr,
        nonce: nonce,
      });
      expect(onChainComputed).to.equal(offChainComputed);
    });

    it("computes the correct contract address - case 3: nonce <= uint8", async function () {
      const nonce = 0xff;
      const onChainComputed = await create.computeAddress(createAddr, nonce);
      const offChainComputed = hre.ethers.getCreateAddress({
        from: createAddr,
        nonce: nonce,
      });
      expect(onChainComputed).to.equal(offChainComputed);
    });

    it("computes the correct contract address - case 4: nonce <= uint16", async function () {
      const nonce = 0xffff;
      const onChainComputed = await create.computeAddress(createAddr, nonce);
      const offChainComputed = hre.ethers.getCreateAddress({
        from: createAddr,
        nonce: nonce,
      });
      expect(onChainComputed).to.equal(offChainComputed);
    });

    it("computes the correct contract address - case 5: nonce <= uint24", async function () {
      const nonce = 0xffffff;
      const onChainComputed = await create.computeAddress(createAddr, nonce);
      const offChainComputed = hre.ethers.getCreateAddress({
        from: createAddr,
        nonce: nonce,
      });
      expect(onChainComputed).to.equal(offChainComputed);
    });

    it("computes the correct contract address - case 6: nonce <= uint32", async function () {
      const nonce = 0xffffffff;
      const onChainComputed = await create.computeAddress(createAddr, nonce);
      const offChainComputed = hre.ethers.getCreateAddress({
        from: createAddr,
        nonce: nonce,
      });
      expect(onChainComputed).to.equal(offChainComputed);
    });

    it("computes the correct contract address - case 7: nonce <= uint40", async function () {
      const nonce = 0xffffffffff;
      const onChainComputed = await create.computeAddress(createAddr, nonce);
      const offChainComputed = hre.ethers.getCreateAddress({
        from: createAddr,
        nonce: nonce,
      });
      expect(onChainComputed).to.equal(offChainComputed);
    });

    it("computes the correct contract address - case 8: nonce <= uint48", async function () {
      const nonce = 0xffffffffffff;
      const onChainComputed = await create.computeAddress(createAddr, nonce);
      const offChainComputed = hre.ethers.getCreateAddress({
        from: createAddr,
        nonce: nonce,
      });
      expect(onChainComputed).to.equal(offChainComputed);
    });

    it("computes the correct contract address - case 9: nonce <= uint56", async function () {
      const nonce = 0xffffffffffffffn;
      const onChainComputed = await create.computeAddress(createAddr, nonce);
      const offChainComputed = hre.ethers.getCreateAddress({
        from: createAddr,
        nonce: nonce,
      });
      expect(onChainComputed).to.equal(offChainComputed);
    });

    it("computes the correct contract address - case 10: nonce < uint64", async function () {
      const nonce = 0xfffffffffffffffen;
      const onChainComputed = await create.computeAddress(createAddr, nonce);
      const offChainComputed = hre.ethers.getCreateAddress({
        from: createAddr,
        nonce: nonce,
      });
      expect(onChainComputed).to.equal(offChainComputed);
    });

    it("reverts if the nonce is larger than type(uint64).max - 1", async function () {
      await expect(create.computeAddress(createAddr, 0xffffffffffffffffn))
        .to.be.revertedWithCustomError(create, "InvalidNonceValue")
        .withArgs(createAddr);
    });
  });

  describe("deploy", function () {
    it("deploys an ERC20Mock with correct balances", async function () {
      const offChainComputed = hre.ethers.getCreateAddress({
        from: createAddr,
        nonce: 1,
      });
      expect(await create.deploy(0, creationBytecode.data))
        .to.emit(create, "ContractCreation")
        .withArgs(offChainComputed);
      const erc20 = await hre.ethers.getContractAt(
        "ERC20Mock",
        offChainComputed,
      );
      expect(await erc20.balanceOf(deployerAccount.address)).to.equal(
        initialBalance,
      );
    });

    it("deploys a contract with funds deposited in the factory", async function () {
      const deposit = hre.ethers.parseEther("2");
      await deployerAccount.sendTransaction({ to: createAddr, value: deposit });
      expect(await hre.ethers.provider.getBalance(createAddr)).to.equal(
        deposit,
      );
      const offChainComputed = hre.ethers.getCreateAddress({
        from: createAddr,
        nonce: 1,
      });
      expect(await create.deploy(deposit, creationBytecode.data))
        .to.emit(create, "ContractCreation")
        .withArgs(offChainComputed);
      expect(await hre.ethers.provider.getBalance(offChainComputed)).to.equal(
        deposit,
      );
    });

    it("fails deploying a contract with invalid constructor bytecode", async function () {
      await expect(create.deploy(0, "0x01"))
        .to.be.revertedWithCustomError(create, "Failed")
        .withArgs(createAddr);
    });

    it("fails deploying a contract if the bytecode length is zero", async function () {
      await expect(create.deploy(0, "0x"))
        .to.be.revertedWithCustomError(create, "ZeroBytecodeLength")
        .withArgs(createAddr);
    });

    it("fails deploying a contract if factory contract does not have sufficient balance", async function () {
      await expect(create.deploy(1, creationBytecode.data))
        .to.be.revertedWithCustomError(create, "InsufficientBalance")
        .withArgs(createAddr);
    });
  });
});
