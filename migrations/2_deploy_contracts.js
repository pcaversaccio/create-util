const DeployBytecode = artifacts.require("DeployBytecode");

module.exports = function (deployer) {
  deployer.deploy(DeployBytecode);
};
