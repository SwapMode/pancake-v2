import { ethers } from 'hardhat';
import { FEE_RECEIVER } from '../../scripts/deploy';
import { deployFactory, deployRouter, deployToken } from '../../scripts/utils/deploy.utils';
import { TOKENS } from '../../scripts/data/token';
import { createPool } from '../../scripts/utils/pool.utils';

export async function awesomeFixture() {
  await ethers.provider.ready;

  const factory = await deployFactory(FEE_RECEIVER);
  const chainId = ethers.provider.network.chainId;

  const WETH = TOKENS.WETH[chainId];
  const router = await deployRouter(factory.address, WETH);

  const chiliCheeseDog = await deployToken('ChiliCheeseDogToken');
  console.log('Creating initial pool..');
  const pool = await createPool(factory.address, chiliCheeseDog.address, WETH);
  console.log('Pair ChiliCheeseDog-WETH created');

  return {
    factory,
    router,
    chiliCheeseDog,
    pool,
  };
}
