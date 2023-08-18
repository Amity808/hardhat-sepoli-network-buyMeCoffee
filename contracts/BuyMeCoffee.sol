// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;


interface IERC20Token {
    function transfer(address, uint256) external returns (bool);
    function approve(address, uint256) external returns (bool);
    function transferFrom(address, address, uint256) external returns (bool);
    function totalSupply() external view  returns (uint256);
    function balanceOf(address) external view  returns (uint256);
    function allowance(address, address) external view  returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract BuyMeCoffee {

    // celo cUSD testnet

    address internal cUsdTokenAddress = 0x4b0B17CE6c6DD5fd3a53f9e18E2d31B9F62F1362;
    // Event to emit when a memo is created

    event NewCoffee (
        address payable owner,
        string imageUrl,
        string name,
        string stackRole,
        string message

    );
    
    // the event struct
    struct Coffee{
        address payable owner;
        string imageUrl;
        string name;
        string stackRole;
        string message;
    }

    // address of the person that deploy the contract we need to make it payable 
    

    uint256 coffeLenght;

    mapping (uint256 => Coffee) coffees;


    function buyCoffee(string memory _imageUrl,string memory _name, string memory _message, string memory _StackRole) external  {
        
        coffees[coffeLenght++] = Coffee(
            payable (msg.sender),
            _imageUrl,
            _name,
            _StackRole,
            _message
        );

        // we need to emit the event that happened here
        emit NewCoffee(
            payable(msg.sender),
            _imageUrl,
            _name,
            _StackRole,
            _message
        );
    }

    function coffeeDonator (uint256 id) public view returns (
        address payable,
        string memory,
        string memory,
        string memory,
        string memory
    ) {
        return (
            coffees[id].owner,
            coffees[id].imageUrl,
            coffees[id].name,
            coffees[id].stackRole,
            coffees[id].message
        );
    }

    

    function buyMeCoffee(uint256 _id, uint256 amount) public payable  {
        // require(msg.value > 0, "The Amount sending must be greater the zero 0");
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                coffees[_id].owner,
                amount
            ),
            "Transfer Failed"
        );

    }

    function getBuyCoffeeLenght() public view returns (uint) {
        return (coffeLenght);
    }

}