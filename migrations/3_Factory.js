var Factory = artifacts.require('Factory.sol');

module.exports = function (deployer) {
  deployer.deploy(Factory, "ipfs://QmPFzAH4RCEV1Jzpe5URdaxfGVhMBVKLCnYAVjpQYfruWd"); //pointe vers lien IPFS, qui pointera vers un autre + tard
};
