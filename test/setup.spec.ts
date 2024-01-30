import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { awesomeFixture } from './fixtures/awesome.fixture';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { getBlockTime } from './utils';
import { MAX_UINT256 } from './constants';

describe('PancakeSwap', () => {
  it('deploy', async () => {
    const { pair, TREASURY, signer: user, userLPAmount, router, WETH, BSWAP } = await loadFixture(awesomeFixture);

    // TODO: Fork mainnet and use a pool
    // Impersonate treasury, add liquidity,
    // see what the amount sent to feeTo is relative to current state of pool (reserves, K, etc)
    // What would the multipliers needed to have been to return/give to "To take it all"
    // Can also just pull real pool values and run local calcs in test function above too (compare to stock/current fee sent)

    const rezs = await pair.getReserves();
    const ts = await pair.totalSupply();
    const tBalance = await pair.balanceOf(TREASURY);

    const reserves0 = formatUnits(rezs._reserve0); // (ETH)
    const reserves1 = formatUnits(rezs._reserve1); // (BSWAP)
    // kLast = 268083724039849358609443167918347428963222622
    const totalSupply = formatUnits(ts);
    const treasuryBalance = formatUnits(tBalance);

    console.log(formatUnits(await pair.balanceOf(user.address)));

    console.log(`
    reserves0: ${reserves0}
    reserves1: ${reserves1}
    totalSupply: ${totalSupply}
    treasuryBalance: ${treasuryBalance}
    user: ${formatUnits(await pair.balanceOf(user.address))}
    `);

    // address tokenA,
    // address tokenB,
    // uint256 liquidity,
    // uint256 amountAMin,
    // uint256 amountBMin,
    // address to,
    // uint256 deadline

    // await BSWAP.approve(router.address, MAX_UINT256)
    await pair.approve(router.address, MAX_UINT256);

    await router
      .connect(user)
      .removeLiquidityETH(
        BSWAP.address,
        userLPAmount.div(90),
        0,
        0,
        user.address,
        (await getBlockTime(ethers.provider)) + 5
      );

    // TODO: Add liquidity, check fees to treasury
    // Use local contract math to see what it should be to give us "all"
    // Instead of 8/25(32%)

    // Need to add liquidity or burn and then run ops
    // _mintFee always happens with current reserves/k before running rest of calcs for current caller

    //  _mintFee(_reserve0, _reserve1) happens before anything
    // Uses current reserves

    // await pair.setReserves(parseUnits('10'), parseUnits('10'), parseUnits('10'));
    // const fees = await pair.getFeeAmount(parseUnits('15'), parseUnits('15'));
    // console.log(formatUnits(fees)); // 1.194029850746268656

    // const res0 = parseUnits('10');
    // const res1 = parseUnits('10');
    // const _kLast = res0.mul(res1);

    // const _newReserve0 = parseUnits('10');
    // const _newReserve1 = parseUnits('10');
    // const totalSupply = parseUnits('10');

    // const fees = await pair.getFeeAmount(_newReserve0, _newReserve1, _kLast, totalSupply);
    // console.log(formatUnits(fees));
  });
});
