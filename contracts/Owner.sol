// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Owner {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }
}
