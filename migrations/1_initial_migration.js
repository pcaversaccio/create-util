// eslint-disable-next-line no-undef
const Migrations = artifacts.require("Migrations");

// eslint-disable-next-line func-names
module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
