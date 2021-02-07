import UniswapV2Pair from "@uniswap/v2-core/build/UniswapV2Pair.json";
import UniswapV2Factory from "@uniswap/v2-core/build/UniswapV2Factory.json";
import UniswapV2Router02 from "@uniswap/v2-periphery/build/UniswapV2Router02.json";
import ERC20 from "@uniswap/v2-periphery/build/ERC20.json";

// If anyone has a good idea how to consolidate this, please do
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { Contract } from "ethers";

import chai from "chai";
import { solidity } from "ethereum-waffle";
import weth from "@uniswap/v2-periphery/build/WETH9.json";
import { Getherer__factory } from "../typechain";

chai.use(solidity);
const { expect } = chai;

const TOTALSUPPLY = ethers.utils.parseEther("10000");

describe("Getherer", () => {
  let getherer: Contract;
  let tokenA: Contract;
  let tokenB: Contract;
  let tokenC: Contract;
  let tokenD: Contract;
  let tokenE: Contract;

  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let user3: SignerWithAddress;
  let user4: SignerWithAddress;
  let relay: SignerWithAddress;

  beforeEach(async () => {
    [deployer, user1, user2, user3, user4, relay] = await ethers.getSigners();
    // Deploy token
    const ERC20Factory = new ethers.ContractFactory(ERC20.abi, ERC20.bytecode, deployer);
    tokenA = await ERC20Factory.deploy(TOTALSUPPLY);
    tokenB = await ERC20Factory.deploy(TOTALSUPPLY);
    tokenC = await ERC20Factory.deploy(TOTALSUPPLY);
    tokenD = await ERC20Factory.deploy(TOTALSUPPLY);
    tokenE = await ERC20Factory.deploy(TOTALSUPPLY);

    // Transfers some tokens to the users
    // tokenA transfers 100ETH worth of Tokens to userX
    await tokenA.transfer(user1.address, ethers.utils.parseEther("100"));
    await tokenA.transfer(user2.address, ethers.utils.parseEther("100"));
    await tokenA.transfer(user3.address, ethers.utils.parseEther("100"));
    await tokenA.transfer(user4.address, ethers.utils.parseEther("100"));

    await tokenB.transfer(user1.address, ethers.utils.parseEther("100"));
    await tokenB.transfer(user2.address, ethers.utils.parseEther("100"));
    await tokenB.transfer(user3.address, ethers.utils.parseEther("100"));
    await tokenB.transfer(user4.address, ethers.utils.parseEther("100"));

    await tokenC.transfer(user1.address, ethers.utils.parseEther("100"));
    await tokenC.transfer(user2.address, ethers.utils.parseEther("100"));
    await tokenC.transfer(user3.address, ethers.utils.parseEther("100"));
    await tokenC.transfer(user4.address, ethers.utils.parseEther("100"));

    await tokenD.transfer(user1.address, ethers.utils.parseEther("100"));
    await tokenD.transfer(user2.address, ethers.utils.parseEther("100"));
    await tokenD.transfer(user3.address, ethers.utils.parseEther("100"));
    await tokenD.transfer(user4.address, ethers.utils.parseEther("100"));

    await tokenE.transfer(user1.address, ethers.utils.parseEther("100"));
    await tokenE.transfer(user2.address, ethers.utils.parseEther("100"));
    await tokenE.transfer(user3.address, ethers.utils.parseEther("100"));
    await tokenE.transfer(user4.address, ethers.utils.parseEther("100"));

    // Deploy Weth
    const WethFactory = new ethers.ContractFactory(weth.abi, weth.bytecode, deployer);
    const wethContract = await WethFactory.deploy();

    // Deploy Factory
    const UniswapFactory = new ethers.ContractFactory(UniswapV2Factory.abi, UniswapV2Factory.bytecode, deployer);
    const uniswapFactoryContract = await UniswapFactory.deploy(deployer.address);

    // Deploy Router
    const UniswapV2Router02Factory = new ethers.ContractFactory(
      UniswapV2Router02.abi,
      UniswapV2Router02.bytecode,
      deployer,
    );
    const router = await UniswapV2Router02Factory.deploy(uniswapFactoryContract.address, wethContract.address);

    // Deploy Getherer
    const getherFactory = new Getherer__factory(relay);
    getherer = await getherFactory.deploy(router.address);

    // Supply liquidity TokenA / ETH
    const toSupply = ethers.utils.parseEther("500");
    const deadline = 2000000000;
    await tokenA.approve(router.address, toSupply);
    await router.addLiquidityETH(tokenA.address, toSupply, 1, 1, deployer.address, deadline, {
      value: ethers.utils.parseEther("10"),
    });

    // Supply liquidity for Token <> Token pairs
    // Pair B / C
    await tokenB.approve(router.address, toSupply);
    await tokenC.approve(router.address, toSupply);

    // Pair D / E
    await tokenD.approve(router.address, toSupply);
    await tokenE.approve(router.address, toSupply);

    await router.addLiquidity(tokenB.address, tokenC.address, toSupply, toSupply, 1, 1, deployer.address, deadline);
    await router.addLiquidity(tokenD.address, tokenE.address, toSupply, toSupply, 1, 1, deployer.address, deadline);

  });

  it("Swap Token to ETH", async function () {
    // Attempt to swap
    const toSwap = ethers.utils.parseEther("20");
    const block = await ethers.provider.getBlock('latest');
    const deadline = block.timestamp + 600;

    const userToken = tokenA.connect(user1);
    await userToken.approve(getherer.address, toSwap);

    const userBalanceBefore = await ethers.provider.getBalance(user1.address);

    getherer = getherer.connect(relay);
    await getherer.multiswapTokenToETH(tokenA.address, [user1.address], [toSwap], deadline);

    const userBalanceAfter = await ethers.provider.getBalance(user1.address);

    expect(ethers.utils.formatEther(userBalanceAfter.sub(userBalanceBefore))).to.equal("0.383505789129514944");
  });

  it("Swap Multi users Token to ETH", async function () {
    // Attempt to swap
    const toSwap = ethers.utils.parseEther("20");
    const block = await ethers.provider.getBlock('latest');
    const deadline = block.timestamp + 600;

    let userToken = tokenA.connect(user1);
    await userToken.approve(getherer.address, toSwap);

    userToken = tokenA.connect(user2);
    await userToken.approve(getherer.address, toSwap);

    const userBalanceBefore = await ethers.provider.getBalance(user1.address);

    getherer = getherer.connect(relay);
    // TODO: consider checking the allowanc in contract instead of passing param
    await getherer.multiswapTokenToETH(tokenA.address, [user1.address, user2.address], [toSwap, toSwap], deadline);

    const user1BalanceAfter = await ethers.provider.getBalance(user1.address);
    const user2BalanceAfter = await ethers.provider.getBalance(user2.address);

    console.log("User1 balance", user1BalanceAfter);
    console.log("User2 balance", user2BalanceAfter);
  });

  it("Swap Multi users Token to Token", async function () {
    // Attempt to swap
    const toSwap = ethers.utils.parseEther("20");
    const block = await ethers.provider.getBlock('latest');
    const deadline = block.timestamp + 600;

    // User1 approves tokenB for getherer
    let userTokenB = tokenB.connect(user1);
    await userTokenB.approve(getherer.address, toSwap);

    // User2 approves tokenB for getherer
    userTokenB = tokenB.connect(user2);
    await userTokenB.approve(getherer.address, toSwap);

    // User3 approves tokenB for getherer
    userTokenB = tokenB.connect(user3);
    await userTokenB.approve(getherer.address, toSwap);

    const userBalanceBefore = await ethers.provider.getBalance(user1.address);

    getherer = getherer.connect(relay);
    // TODO: consider checking the allowance in contract instead of passing param

    await getherer.multiswapTokenToToken(tokenB.address, tokenC.address, [user1.address, user2.address, user3.address], [toSwap, toSwap, toSwap], deadline);

    const user1BalanceAfter = await ethers.provider.getBalance(user1.address);
    const user2BalanceAfter = await ethers.provider.getBalance(user2.address);
    const user3BalanceAfter = await ethers.provider.getBalance(user3.address);

    console.log('tokenB to tokenC swapped!')
    console.log("User1 balance", user1BalanceAfter);
    console.log("User2 balance", user2BalanceAfter);
    console.log("User3 balance", user3BalanceAfter);

    // User4 approves tokenD for getherer
    let userTokenD = tokenD.connect(user4);
    await userTokenD.approve(getherer.address, toSwap);

    // User3 approves tokenD for getherer
    userTokenD = tokenD.connect(user3);
    await userTokenD.approve(getherer.address, toSwap);

    await getherer.multiswapTokenToToken(tokenD.address, tokenE.address, [user4.address, user3.address], [toSwap, toSwap], deadline);

    const user4BalanceAfterToken = await ethers.provider.getBalance(user4.address);
    const user3BalanceAfterToken = await ethers.provider.getBalance(user3.address);

    console.log('tokenD to tokenE swapped!')
    console.log("User1 balance", user4BalanceAfterToken);
    console.log("User2 balance", user3BalanceAfterToken);

  });


  it("Multiswap uneven ammounts", async function () {
    // Attempt to swap
    const toSwap1 = ethers.utils.parseEther("10");
    const toSwap2 = ethers.utils.parseEther("20");
    const toSwap3 = ethers.utils.parseEther("30");
    const block = await ethers.provider.getBlock('latest');
    const deadline = block.timestamp + 600;

    let userToken = tokenA.connect(user1);
    await userToken.approve(getherer.address, toSwap1);

    userToken = tokenA.connect(user2);
    await userToken.approve(getherer.address, toSwap2);

    userToken = tokenA.connect(user3);
    await userToken.approve(getherer.address, toSwap3);

    const userBalanceBefore = await ethers.provider.getBalance(user1.address);

    getherer = getherer.connect(relay);
    // TODO: consider checking the allowanc in contract instead of passing param
    await getherer.multiswapTokenToETH(
      tokenA.address,
      [user1.address, user2.address, user3.address],
      [toSwap1, toSwap2, toSwap3],
      deadline
    );

    const user1BalanceAfter = await ethers.provider.getBalance(user1.address);
    const user2BalanceAfter = await ethers.provider.getBalance(user2.address);
    const user3BalanceAfter = await ethers.provider.getBalance(user3.address);

    console.log("User1 balance", ethers.utils.formatEther(user1BalanceAfter));
    console.log("User2 balance", ethers.utils.formatEther(user2BalanceAfter));
    console.log("User3 balance", ethers.utils.formatEther(user3BalanceAfter));
  });

  it("Multiswap ETH to Token, when input smaller than 1ETH", async function () {
    // Attempt to swap
    const toSwap1 = ethers.utils.parseEther("0.33");
    const block = await ethers.provider.getBlock('latest');
    const deadline = block.timestamp + 600;

    // 3x poolSwap call from user
    const userArray = [user1, user2, user3];

    for (const user of userArray) {
      getherer = getherer.connect(user);

      await getherer.poolSwapETH(tokenA.address, deadline, { value: toSwap1 });
    }
    getherer = getherer.connect(relay);

    await getherer.multiswapETHToToken(tokenA.address, deadline);

    const user1BalanceAfter = await tokenA.balanceOf(user1.address);
    const user2BalanceAfter = await tokenA.balanceOf(user2.address);
    const user3BalanceAfter = await tokenA.balanceOf(user3.address);

    const poolBalance = await tokenA.balanceOf(getherer.address);
    // expect(ethers.utils.formatEther(poolBalance)).to.equal("0");

    console.log("User1 balance", ethers.utils.formatEther(user1BalanceAfter));
    console.log("User2 balance", ethers.utils.formatEther(user2BalanceAfter));
    console.log("User3 balance", ethers.utils.formatEther(user3BalanceAfter));
  });

  it("Multiswap ETH to Token, when input bigger than 1ETH", async function () {
    // Attempt to swap
    const toSwap1 = ethers.utils.parseEther("1.33");
    const block = await ethers.provider.getBlock('latest');
    const deadline = block.timestamp + 600;

    // 3x poolswap call from user
    const userArray = [user1, user2, user3];

    for (const users of userArray) {
      getherer = getherer.connect(users);

      await getherer.poolSwapETH(tokenA.address, deadline, { value: toSwap1 });
    }

    getherer = getherer.connect(relay);

    await getherer.multiswapETHToToken(tokenA.address, deadline);

    const user1BalanceAfter = await tokenA.balanceOf(user1.address);
    const user2BalanceAfter = await tokenA.balanceOf(user2.address);
    const user3BalanceAfter = await tokenA.balanceOf(user3.address);

    console.log("User1 balance", ethers.utils.formatEther(user1BalanceAfter));
    console.log("User2 balance", ethers.utils.formatEther(user2BalanceAfter));
    console.log("User3 balance", ethers.utils.formatEther(user3BalanceAfter));
  });
});
