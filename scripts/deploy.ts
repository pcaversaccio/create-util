/* eslint-disable @typescript-eslint/no-unused-vars */
import hre, { ethers } from "hardhat";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const contract = await ethers.deployContract("Create");

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log("Create deployed to:", contractAddress);

  await delay(30000); // Wait for 30 seconds before verifying the contract

  await hre.run("verify:verify", {
    address: contractAddress,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
