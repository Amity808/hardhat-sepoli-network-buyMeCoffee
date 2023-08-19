# Sample Hardhat Project

## Deploying smart contract on sepolia network

Deploying with hardhat and contract verification configuration
on Sepolia etherscan network.

## To run the project local on your network

***git clone** `git clone [repo link]`
**To install the node modules**

`yarn add`

**Add this to your env** 
SEPOLIA_RPC_URL= you can get this on alchemy
PRIVATE_KEY= Your wallet private key
ETHERSCAN_API_KEY= get this on your etherscan for verification

**Deploy on the Sepolia network**

`yarn hardhat run scripts/deploy.js --network sepolia`

## To Run Test
```yarn hardhat test```