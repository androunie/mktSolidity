var Auction = artifacts.require('Auction.sol');


module.exports = function (deployer) {
  // deployer.deploy(Auction(100, '', 'ipfs://QmPFzAH4RCEV1Jzpe5URdaxfGVhMBVKLCnYAVjpQYfruWd', 'ipfs://QmPFzAH4RCEV1Jzpe5URdaxfGVhMBVKLCnYAVjpQYfruWdaaaaaaaaaaa', '0xD21955ab4999d3989BAa45EE97c515b57F92948c',  100));
  deployer.deploy(Auction, 100, '', 'ipfs://QmPFzAH4RCEV1Jzpe5URdaxfGVhMBVKLCnYAVjpQYfruWd', 'ipfs://QmPFzAH4RCEV1Jzpe5URdaxfGVhMBVKLCnYAVjpQYfruWdaaaaaaaaaaa', '0x0ba60b789A73723F12779034c01d52ebD8B97e0F',  100);
};

