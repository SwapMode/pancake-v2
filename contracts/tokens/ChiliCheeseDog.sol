// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ChiliCheeseDogToken is ERC20, Ownable {
    constructor() ERC20("Chili Cheese Dog", "CCD") {
        _mint(msg.sender, 10000 ether);
    }

    function mintTokens(uint256 _amount) external onlyOwner {
        _mint(msg.sender, _amount);
    }
}
