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

    
    mapping(address =>uint256) public balanceOf;
    mapping(address => mapping(address=>uint256)) public allowance;
    
    event Transfer(
            address indexed from, 
            address indexed to, 
            uint256 value);

    event Approval
    (
        address indexed owner, 
        address indexed spender, 
        uint256 value
    );
    

    constructor(string memory _name, 
                string memory _symbol,
                uint256 _totalSupply) {
         name = _name;
         symbol = _symbol;
         totalSupply = _totalSupply * (10**decimals);
         balanceOf[msg.sender]= totalSupply;
    }

    function transfer(address _to, 
                    uint256 _value) 
        public 
        returns (bool success){

         //Require  that sender has enough tokens to spend

        require(balanceOf[msg.sender] >=_value)    ;
        require(_to != address(0));
        //Deduct tokens from spender
        balanceOf[msg.sender] = balanceOf[msg.sender] - _value;
       
        //Credit tokens to receiver        
        balanceOf[_to] = balanceOf[_to] + _value;

        //emit event

        emit Transfer(msg.sender, _to, _value);
        return true;
        
    }

    function approve(address _spender,  uint256 _value) 
                    public 
                    returns(bool success)
    {
        require(_spender != address(0));
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

}
