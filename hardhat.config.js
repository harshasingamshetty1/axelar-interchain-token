require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    fantom: {
      url: "https://rpc.ankr.com/fantom_testnet",
      chainId: 4002,
      accounts: [PRIVATE_KEY],
    },
    //mainnet
    polygon_mainnet: {
      url: "https://polygon-pokt.nodies.app	",
      chainId: 137,
      accounts: [PRIVATE_KEY],
    },
  },
};
