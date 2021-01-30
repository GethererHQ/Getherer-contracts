// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

import "hardhat/console.sol";

contract Getherer {
    using Address for address payable;
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    IUniswapV2Router02 private router;

    receive() external payable {}

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

        address[] memory path = new address[](2);
        path[0] = token;
        path[1] = router.WETH();

        IERC20(token).approve(address(router), amountIn);
        router.swapExactTokensForETH(amountIn, 1, path, user, block.timestamp);
    }

    function multiswap(
        address token,
        address payable[] calldata users,
        uint256[] calldata amountsIn
    ) external {
        uint256 total = 0;
        // Transfer user funds to contract
        for (uint256 i = 0; i < users.length; i++) {
            bool success = IERC20(token).transferFrom(users[i], address(this), amountsIn[i]);
            // NOTE XXX: ease requirement and/or filter out unsuccesful transfers offline
            require(success);

            // NOTE XXX: consider checkout token balance before and after and returning to user
            total = total.add(amountsIn[i]);
        }

        address[] memory path = new address[](2);
        path[0] = token;
        path[1] = router.WETH();

        IERC20(token).approve(address(router), total);
        // Transfer
        uint256[] memory amounts = router.swapExactTokensForETH(total, 1, path, address(this), block.timestamp);

        uint256 receivedBalance = amounts[amounts.length - 1];

        for (uint256 i = 0; i < users.length; i++) {
            uint256 payout = receivedBalance.mul(amountsIn[i]).div(total);
            users[i].sendValue(payout);
        }
    }
}
