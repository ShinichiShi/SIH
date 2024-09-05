const MultiAgriConnect = artifacts.require("MultiAgriConnect");

module.exports = function (deployer) {
    // Deploy the MultiAgriConnect contract
    deployer.deploy(MultiAgriConnect);
};