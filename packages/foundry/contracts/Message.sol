// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Message {
    string public message;
    
    event MessageUpdated(string newMessage);

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
        emit MessageUpdated(newMessage);
    }
}
