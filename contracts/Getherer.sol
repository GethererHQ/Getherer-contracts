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

    SwapOrder[] public swaporder;

    mapping(address => SwapOrder[]) private _swapOrders;

    struct SwapOrder {
        address user;
        uint256 amountIn;
    }

    receive() external payable {}

    constructor(address _routerAddress) public {
        router = IUniswapV2Router02(_routerAddress);
    }

    function poolSwapETH(address _token) external payable {
        _swapOrders[_token].push(SwapOrder({ user: msg.sender, amountIn: msg.value }));
    }

    function multiswapETHToToken(address _token) external {
        uint256 total;
        for (uint256 i = 0; i < _swapOrders[_token].length; i++) {
            total += _swapOrders[_token][i].amountIn;
        }

        address[] memory path = new address[](2);
        path[0] = router.WETH();
        path[1] = _token;

        uint256[] memory amountOut = getEstimatedTokenForETH(total, path);

        uint256[] memory amounts =
            router.swapExactETHForTokens{ value: total }(amountOut[1], path, address(this), block.timestamp);

        uint256 receivedBalance = amounts[amounts.length - 1];

        for (uint256 i = 0; i < _swapOrders[_token].length; i++) {
            uint256 payout = receivedBalance.mul(_swapOrders[_token][i].amountIn).div(total);
            IERC20(_token).transfer(_swapOrders[_token][i].user, payout);
        }
        delete _swapOrders[_token];
    }

    function multiswapTokenToETH(
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

    function getEstimatedTokenForETH(uint256 amountIn, address[] memory path) public view returns (uint256[] memory) {
        return router.getAmountsOut(amountIn, path);
    }
}
