import UniswapV2Pair from "@uniswap/v2-core/build/UniswapV2Pair.json";
import UniswapV2Factory from "@uniswap/v2-core/build/UniswapV2Factory.json";
import UniswapV2Router02 from "@uniswap/v2-periphery/build/UniswapV2Router02.json";
import ERC20 from "@uniswap/v2-periphery/build/ERC20.json";
import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import weth from "@uniswap/v2-periphery/build/WETH9.json";
import { Getherer__factory } from "../typechain";

chai.use(solidity);
const { expect } = chai;

const TOTALSUPPLY = ethers.utils.parseEther("1000");

describe("Uniswap", () => {
  it.only("Swap Token to ETH", async function () {
    const [deployer, user, relay] = await ethers.getSigners();

    // Deploy token
    const ERC20Factory = new ethers.ContractFactory(ERC20.abi, ERC20.bytecode, deployer);
    const tokenAContract = await ERC20Factory.deploy(TOTALSUPPLY);
    // Transfers some tokens to the user
    await tokenAContract.transfer(user.address, ethers.utils.parseEther("20"));

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
    let getherer = await getherFactory.deploy(router.address);

    // Supply liquidity
    const toSupply = ethers.utils.parseEther("500");
    await tokenAContract.approve(router.address, toSupply);
    const deadline = 2000000000;
    await router.addLiquidityETH(tokenAContract.address, toSupply, 1, 1, deployer.address, deadline, {
      value: ethers.utils.parseEther("10"),
    });

    // Attempt to swap
    const toSwap = ethers.utils.parseEther("20");
    const userToken = tokenAContract.connect(user);
    await userToken.approve(getherer.address, toSwap);

    const userBalanceBefore = await ethers.provider.getBalance(user.address);

    getherer = getherer.connect(relay);
    await getherer.swap(tokenAContract.address, user.address, toSwap);

    const userBalanceAfter = await ethers.provider.getBalance(user.address);

    expect(ethers.utils.formatEther(userBalanceAfter.sub(userBalanceBefore))).to.equal("0.383505789129514944");
  });
});
