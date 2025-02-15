// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {Message} from "../contracts/Message.sol";

contract DeployMessage is Script {
    function run() external {
        vm.startBroadcast();
        new Message("Hello, Scaffold-ETH!");
        vm.stopBroadcast();
    }
}