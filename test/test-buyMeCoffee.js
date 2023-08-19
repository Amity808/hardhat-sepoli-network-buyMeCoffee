// writting test for our buy me coffe
const {ethers} = require('hardhat')
const {expect, assert} = require('chai')

describe("BuyMeCoffee", function () {
  let buyMeCoffeFacctory;
  let buyMeCoffee
  beforeEach(async function () {
    buyMeCoffeFacctory = await ethers.getContractFactory("BuyMeCoffee")
    buyMeCoffee = await buyMeCoffeFacctory.deploy()    
  }
  )
  it("Should Start with getting the numbers of coffee lenght of 0", async function () {
    const currentLenght = await buyMeCoffee.getBuyCoffeeLenght()
    const expectedResult = "0"
    assert.equal(currentLenght.toString(), expectedResult)
  })
  it("It should update when we call", async function () {
    const writeBuyCoffe = await buyMeCoffee.buyCoffee(
      "img",
      "Bolarinwa",
      "I'm a lover of tech",
      "FullStack"
    )
    const currentLenghts = await buyMeCoffee.getBuyCoffeeLenght()
    const expectedResults = "1"
    assert.equal(currentLenghts.toString(), expectedResults)
  })

})