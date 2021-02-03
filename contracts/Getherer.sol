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
    
    struct SwapOrder {
        address token;
        address user;
        uint256 amountOut;
        uint256 amounts;
    }

    receive() external payable {}

    constructor(address _routerAddress) public {
        router = IUniswapV2Router02(_routerAddress);
    }

    function poolswapETH(
        address _token,
        uint256 _amountOut
    ) external payable {

        // Store user data - could be different, e.g nested mapping

        swaporder.push(SwapOrder({
            token: _token, 
            user: msg.sender, 
            amountOut: _amountOut,  
            amounts: msg.value}));

        // emit event & issue token shares here
    }

    function multiswapETH(
        address _token
    ) external {
        uint256 total;
        for (uint256 i = 0; i < swaporder.length; i++) {
            total += swaporder[i].amountOut;
        }

        address[] memory path = new address[](2);
        path[0] = router.WETH();
        path[1] = _token;

        uint256[] memory amountOut = getEstimatedTokenForETH(total, path);

        uint256[] memory amounts = router.swapExactETHForTokens
        {value:address(this).balance}(
            amountOut[1], 
            path, 
            address(this), 
            block.timestamp);


        uint256 receivedBalance = amounts[amounts.length - 1];

        IERC20(_token).approve(address(this), receivedBalance);
        uint256 SwapAmount = 0;

        for (uint256 i = 0; i < swaporder.length; i++){
            // This division will work only if pooled swaps are below 1e18 wei!
            // There should be nicer way to do this, here or when matching swaps together
            SwapAmount += swaporder[i].amounts;
            if (SwapAmount > 1e18) {
                uint256 payout = receivedBalance.mul(swaporder[i].amounts).div(1e19);
                IERC20(_token).transferFrom(address(this), swaporder[i].user, payout);
            } else {
                uint256 payout = receivedBalance.mul(swaporder[i].amounts).div(1e18);
                IERC20(_token).transferFrom(address(this), swaporder[i].user, payout);
            }
        }

        // clean for new swappool
        delete swaporder;

        
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

    function getEstimatedTokenForETH(uint256 amountIn, address[] memory path) public view returns (uint[] memory) {
        return router.getAmountsOut(amountIn, path);
    }

    function debugETH() public view returns (uint256 ethAmount) {

        // Just to debug balance, should be deleted

        ethAmount = address(this).balance;
        return (ethAmount);
    }
    
    function debugToken(address _token) public view returns (uint256 tokenAmount) {
        
        // Just to debug balance, should be deleted
        
        tokenAmount = IERC20(_token).balanceOf(address(this));
        return (tokenAmount);
    }

}
