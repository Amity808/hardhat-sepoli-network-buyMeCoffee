require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("@nomicfoundation/hardhat-verify")
require("hardhat-gas-reporter")
require("solidity-coverage")

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    // alfajores: {
    //   url: "https://alfajores-forno.celo-testnet.org",
    //   accounts: {
    //     mnemonic: process.env.MNEMONIC,
    //     path: "m/44'/60'/0'/0",
    //   },
    //   chainId: 44787,
    // },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true,
    // currency: 'USD',
  }
};
