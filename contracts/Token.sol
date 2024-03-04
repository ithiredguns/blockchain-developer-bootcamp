// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;
import "hardhat/console.sol";
contract Token {
    string public name = "Sam's Token!";
    string public symbol = "SN";
    //Decimals
    uint256 public decimals = 18;
    //Total Supply
    uint256 public totalSupply=1000000 * (10**decimals);

    constructor(string memory _name, string memory _symbol,
                uint256 _totalSupply) {
         name = _name;
         symbol = _symbol;
         totalSupply = _totalSupply * (10**decimals);
    }
}
