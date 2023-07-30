import { ethers } from 'hardhat';
import { FEE_RECEIVER } from '../../scripts/deploy';
import { deployFactory, deployRouter } from '../../scripts/utils/deploy.utils';
import { TOKENS } from '../../scripts/data/token';

export async function awesomeFixture() {
  const factory = await deployFactory(FEE_RECEIVER);

  const chainId = ethers.provider.network.chainId;
  const router = await deployRouter(factory.address, TOKENS.WETH[chainId]);

  return {
    factory,
    router,
  };
}
