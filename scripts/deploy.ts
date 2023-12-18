import hre from "hardhat";

// Colour codes for terminal prints
const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const create = await hre.ethers.deployContract("Create");

  await create.waitForDeployment();
  const createAddress = await create.getAddress();

  console.log("Create deployed to: " + `${GREEN}${createAddress}${RESET}\n`);

  console.log(
    "Waiting 30 seconds before beginning the contract verification to allow the block explorer to index the contract...\n",
  );
  await delay(30000); // Wait for 30 seconds before verifying the contract

  await hre.run("verify:verify", {
    address: createAddress,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
