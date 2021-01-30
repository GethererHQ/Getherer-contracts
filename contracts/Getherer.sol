// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IERC20.sol";

import "hardhat/console.sol";

contract Getherer {
    IUniswapV2Router02 private router;

    constructor(address _routerAddress) public {
        router = IUniswapV2Router02(_routerAddress);
    }

    function swap(
        address token,
        address user,
        uint256 amountIn
    ) external {
        // Transfer user funds to contract
        IERC20(token).transferFrom(user, address(this), amountIn);

        uint256 tokenBalance = IERC20(token).balanceOf(address(this));
        console.log("Token Balance", tokenBalance);

        address[] memory path = new address[](2);
        path[0] = token;
        path[1] = router.WETH();

        IERC20(token).approve(address(router), amountIn);
        router.swapExactTokensForETH(amountIn, 1, path, user, block.timestamp);
    }
}
