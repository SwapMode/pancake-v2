// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0;

import "./IFeeSharing.sol";

interface IProtocolToken {
    function feeShareContract() external view returns (IFeeSharing);

    function feeShareTokenId() external view returns (uint256);
}
