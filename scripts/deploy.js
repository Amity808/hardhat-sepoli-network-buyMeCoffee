const hre = require('hardhat')
const { run, network } = require('hardhat')


async function main () {
  // const [ deployer ] = hre.ethers.getSigner()

  // console.log(`deployer address ${deployer}`);
  const buYMeCoffeFactory = await hre.ethers.deployContract('BuyMeCoffee')

  console.log("Deploying Contract......")

  const buyMeCoffee = await buYMeCoffeFactory.waitForDeployment()
  // we need to await the deploy
  await buyMeCoffee;

  console.log(`Deploy contract to ${buYMeCoffeFactory.target}`);
  // console.log(`Deploy contract to `); 
  // console.log(network.config())
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("waiting for blocks transactions....");
    await buyMeCoffee.deploymentTransaction(6)
    await verify(buYMeCoffeFactory.target, [])
  }

  // interaction with the smart contracts
  const getCoffeLenght = await buyMeCoffee.getBuyCoffeeLenght();
  console.log(`The lenght of BuyMeCoffe is ${getCoffeLenght}`);

  const writeBuyCoffe = await buyMeCoffee.buyCoffee(
    "img",
    "Bolarinwa",
    "I'm a lover of tech",
    "FullStack"
  )
  await writeBuyCoffe.wait(1)
  const updatelength = await buyMeCoffee.getBuyCoffeeLenght();
  console.log(`The lenght of BuyMeCoffe is ${updatelength}`);

}

// to verify contr
// we can not run this on local network
async function verify(contractAddress, args) {
  console.log(`Verifying Contract....`)
  
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified")
    } else {
      console.log(e);
    }
  }
}

main().then(() => process.exit(0)).catch((error) => { 
  console.log(error)
process.exit})
