import { ethers } from 'hardhat';
import { FEE_RECEIVER } from '../../scripts/deploy';
import { deployFactory, deployMockToken, deployRouter, deployToken } from '../../scripts/utils/deploy.utils';
import { TOKENS } from '../../scripts/data/token';
import { createPool } from '../../scripts/utils/pool.utils';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { approveTokens, getBlockTime, getERC20 } from '../utils';
import { Contract } from 'ethers';

export async function awesomeFixture() {
  await ethers.provider.ready;

  const signer = (await ethers.getSigners())[0];

  const factory = await deployFactory(FEE_RECEIVER, signer);
  const chainId = ethers.provider.network.chainId;

  const WETH = TOKENS.WETH[chainId];
  //  const WETH = '0x4200000000000000000000000000000000000006';
  const router = await deployRouter(factory.address, WETH, signer);

  const mockUsdc = await deployMockToken('USDC', 'USDC', signer);
  const chiliCheeseDog = await deployToken('ChiliCheeseDogToken', signer);

  console.log('Creating initial pool..');
  const {
    token0,
    token1,
    pair: pairAddress,
  } = await createPool(factory.address, chiliCheeseDog.address, mockUsdc.address, signer);
  console.log('Pair ChiliCheeseDog-USDC created');

  await approveTokens([token0, token1], router.address, signer);

  // address tokenA,
  // address tokenB,
  // uint256 amountADesired,
  // uint256 amountBDesired,
  // uint256 amountAMin,
  // uint256 amountBMin
  // address to,
  // uint256 deadline
  console.log('Adding initial liquidity..');
  await router.addLiquidity(
    token0,
    token1,
    parseUnits('100'),
    parseUnits('100'),
    0,
    0,
    signer.address,
    (await getBlockTime(ethers.provider)) + 5
  );
  console.log('Initial liquidity added.');

  const pair = new Contract(pairAddress, ['function getReserves() public view returns (uint, uint)'], signer);
  const reserves = await pair.getReserves();
  // console.log(reserves);
  // console.log(token0);
  // console.log(token1);

  // CCD is token1 with USDC here
  const quote = await router.quote(parseUnits('1'), reserves[1], reserves[0]);
  console.log('Swap quote: ' + formatUnits(quote));

  return {
    factory,
    router,
    chiliCheeseDog,
    token0,
    token1,
    pair,
    mockUsdc,
  };
}
