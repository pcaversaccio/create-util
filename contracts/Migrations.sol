// SPDX-License-Identifier: MIT
// solhint-disable compiler-version
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
    address public owner = msg.sender;
    uint256 public last_completed_migration; // solhint-disable var-name-mixedcase

    modifier restricted() {
        // solhint-disable reason-string
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    function setCompleted(uint256 completed) public restricted {
        last_completed_migration = completed;
    }
}
