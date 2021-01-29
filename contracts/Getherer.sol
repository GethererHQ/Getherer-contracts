// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract Getherer {
    IUniswapV2Router02 private router;

    constructor(address _routerAddress) public {
        router = IUniswapV2Router02(_routerAddress);
    }

    function swap(address token, uint256 amountIn) external {
        address[] memory path = new address[](2);
        path[0] = address(token);
        path[1] = router.WETH();
        router.swapExactTokensForETH(amountIn, 1, path, msg.sender, block.timestamp);
    }
    // }
}
