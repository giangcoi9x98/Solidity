const { expect, assert } = require("chai");
const { ethers, artifacts } = require("hardhat");

const ACCOUNT_0 = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
const ACCOUNT_1 = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"


describe("Token", async () => {
 
  it("BalanceOf", async function () {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    const instance = await token.deployed();
    const balanceOfOwner = await instance.balanceOf(ACCOUNT_0)
    assert.equal(balanceOfOwner.toNumber(), 1000000000000, 'total supply is wrong');  
  });

  it("Mint", async function () {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    const instance = await token.deployed();
    await instance.mint(ACCOUNT_1, 100)
    const balanceOfAccount1 = await instance.balanceOf(ACCOUNT_1)
    assert.equal(balanceOfAccount1.toNumber(), 100, 'mint token failed');  
  });

  it("Approve", async function () {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    const instance = await token.deployed();

    await instance.approve(ACCOUNT_1, 100);
    const allowances = await instance.allowances(ACCOUNT_1)
    assert.equal(allowances.toNumber(), 100, 'delegate failed');  
  });

  it("RemoveAllowances", async function () {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    const instance = await token.deployed();

    await instance.approve(ACCOUNT_1, 100);
    const allowances = await instance.allowances(ACCOUNT_1)

    await instance.removeAllowances(ACCOUNT_1);
    const newAllowances = await instance.allowances(ACCOUNT_1)

    assert.equal(newAllowances.toNumber(), 0, 'remove allowance failed');  
  });
  
  it("updateBalancePerBlock", async function () {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    const instance = await token.deployed();

    const mint = await instance.mint(ACCOUNT_0, 100);
    await mint.wait();

    const blockNumber = instance.deployTransaction.blockNumber
    const balancePerBlock = await instance.getBalancePerBlock(blockNumber + 2);
    // assert.equal(balancePerBlock.toNumber(), 100, 'invalid current balances');
    // console.log(`object`, await instance.balanceOf(ACCOUNT_0,))
  });

});

