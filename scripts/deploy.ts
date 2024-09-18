import { ethers } from 'hardhat';
import { deployFactory, deployRouter, deployZap, getWalletSigner } from './utils/deploy.utils';

const WETH = '0x4200000000000000000000000000000000000006';
const FACTORY = '0xa26655BaB784C9BD9DAadAAFF2a05a93484bF9C7';
const ROUTER = '0xCe2521c2D78a6d217AFDbC832c4ba1B8bC42b6af';

async function main() {
  await ethers.provider.ready;
  const signer = getWalletSigner(10);
  await deployFactory(signer);
  // Need to set dev account as fee setter in constructor
  // set feeTo treasury
  // then setFeeToSetter to treasury
  // await factory.setFeeTo(TREASURY);
  // If tx failes
  // const factoryLive = await ethers.getContractAt('PancakeFactory', FACTORY, signer);
  // await factoryLive.setFeeTo(TREASURY);
  // await factoryLive.setFeeToSetter(TREASURY);

  // await deployRouter(FACTORY, WETH, signer);
  // await deployZap(WETH, ROUTER, signer);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
