import UniswapV2Pair from "@uniswap/v2-core/build/UniswapV2Pair.json";
import UniswapV2Factory from "@uniswap/v2-core/build/UniswapV2Factory.json";
import UniswapV2Router02 from "@uniswap/v2-periphery/build/UniswapV2Router02.json";
import ERC20 from "@uniswap/v2-periphery/build/ERC20.json";
import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import weth from "@uniswap/v2-periphery/build/WETH9.json";

chai.use(solidity);
const { expect } = chai;

const TOTALSUPPLY = ethers.utils.parseEther("1000");

describe("Uniswap", () => {
  // beforeEach(async () => {
  //   const [deployer, user] = await ethers.getSigners();
  //   const ERC20Factory = new ethers.ContractFactory(ERC20.abi, ERC20.bytecode, deployer);

  //   const tokenContract = await ERC20Factory.deploy(TOTALSUPPLY);
  // });
  it("Deploy a token", async function () {
    const [deployer] = await ethers.getSigners();
    const ERC20Factory = new ethers.ContractFactory(ERC20.abi, ERC20.bytecode, deployer);

    const tokenAContract = await ERC20Factory.deploy(TOTALSUPPLY);

    const balance = await tokenAContract.functions.totalSupply();
    expect(await tokenAContract.totalSupply()).to.eq(TOTALSUPPLY);
  });

  it("Deploy a token pair", async function () {
    const [deployer, user] = await ethers.getSigners();

    // Deploy token
    const ERC20Factory = new ethers.ContractFactory(ERC20.abi, ERC20.bytecode, deployer);
    const tokenAContract = await ERC20Factory.deploy(TOTALSUPPLY);

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

    const toSupply = ethers.utils.parseEther("500");

    await tokenAContract.approve(router.address, toSupply);

    const deadline = 2000000000;

    await router.addLiquidityETH(tokenAContract.address, toSupply, 1, 1, deployer.address, deadline, {
      value: ethers.utils.parseEther("10"),
    });

    // let pairAddress = await uniswapFactoryContract.getPair(tokenAContract.address, wethContract.address);

    // const PairFactory = new ethers.ContractFactory(UniswapV2Pair.abi, UniswapV2Pair.bytecode, deployer);

    // let pair = PairFactory.attach(pairAddress).connect(deployer);

    const toSwap = ethers.utils.parseEther("1");

    const userRouter = router.connect(user);

    // Call the tx but not execute
    const swapTx = await userRouter.populateTransaction.swapExactETHForTokens(
      1,
      [wethContract.address, tokenAContract.address],
      user.address,
      deadline,
      {
        value: toSwap,
      },
    );
    const res = await user.call(swapTx);
    console.log(res);
  });
});
