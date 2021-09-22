// SPDX-License-Identifier: MIT

pragma solidity >=0.6.11;

interface IFraxAMOMinterOld {
  function FRAX() external view returns(address);
  function FXS() external view returns(address);
  function acceptOwnership() external;
  function addAMO(address amo_address, bool sync_too) external;
  function allAMOAddresses() external view returns(address[] memory);
  function allAMOsLength() external view returns(uint256);
  function amoProfit(address amo_address) external view returns(int256);
  function amos(address) external view returns(bool);
  function amos_array(uint256) external view returns(address);
  function burnFXS(uint256 amount) external;
  function burnFraxFromAMO(uint256 frax_amount) external;
  function burnFxsFromAMO(uint256 fxs_amount) external;
  function col_idx() external view returns(uint256);
  function collatDollarBalance() external view returns(uint256);
  function collatDollarBalanceStored() external view returns(uint256);
  function collat_borrow_cap() external view returns(int256);
  function collat_borrowed_balances(address) external view returns(int256);
  function collat_borrowed_sum() external view returns(int256);
  function collateral_address() external view returns(address);
  function collateral_token() external view returns(address);
  function custodian_address() external view returns(address);
  function fraxDollarBalanceStored() external view returns(uint256);
  function giveCollatToAMO(address destination_amo, uint256 collat_amount) external;
  function min_cr() external view returns(uint256);
  function mintFraxForAMO(address destination_amo, uint256 frax_amount) external;
  function mint_balances(address) external view returns(int256);
  function mint_cap() external view returns(int256);
  function mint_sum() external view returns(int256);
  function missing_decimals() external view returns(uint256);
  function nominateNewOwner(address _owner) external;
  function nominatedOwner() external view returns(address);
  function override_collat_balance() external view returns(bool);
  function override_collat_balance_amount() external view returns(uint256);
  function owner() external view returns(address);
  function pool() external view returns(address);
  function receiveCollatFromAMO(uint256 usdc_amount) external;
  function recoverERC20(address tokenAddress, uint256 tokenAmount) external;
  function removeAMO(address amo_address, bool sync_too) external;
  function setCustodian(address _custodian_address) external;
  function setFraxPool(address _pool_address) external;
  function setMinimumCollateralRatio(uint256 _min_cr) external;
  function setMintCap(uint256 _mint_cap) external;
  function setOverrideCollatBalance(bool _state, uint256 _balance) external;
  function setTimelock(address new_timelock) external;
  function syncDollarBalances() external;
  function timelock_address() external view returns(address);
  function unspentProfitGlobal() external view returns(int256);
}