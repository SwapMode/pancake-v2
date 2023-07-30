import { ethers } from 'hardhat';
import { deployFactory, deployRouter } from './utils/deploy.utils';
import { TOKENS } from './data/token';

export const FEE_RECEIVER = '0x03d4C4b1B115c068Ef864De2e21E724a758892A2';

const FACTORY_TESTNET = '';
const ROUTER_TESTNET = '';

async function main() {
  const chainId = ethers.provider.network.chainId;
  const WETH = TOKENS.WETH[chainId];

  await deployFactory(FEE_RECEIVER);

  // await deployRouter(FACTORY_TESTNET, WETH);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
