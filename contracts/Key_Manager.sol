// SPDX-License-Identifier: MIT
pragma solidity >=0.8.13 <0.9.0;

import "@fhenixprotocol/contracts/FHE.sol";

contract Key_Manager {
    mapping(address => euint32) public _encKeys;

    function add_key(address _address, euint32 _key) public {
        require(_address != address(0x0), "Invalid address");

        _encKeys[_address] = _key;
    }

    function get_key(address _address) public view returns (euint32) {
        require(_address != address(0x0), "Invalid address");

        return _encKeys[_address];
    }
}