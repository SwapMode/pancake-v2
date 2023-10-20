import { ethers } from 'hardhat';
import { deployFactory, deployRouter, deployZap } from './utils/deploy.utils';
import { TOKENS } from './data/token';

// Meme dev account
const DEV_ACCOUNT = '0x03d4C4b1B115c068Ef864De2e21E724a758892A2';

const TREASURY = '';
const FEE_RECEIVER = DEV_ACCOUNT;

async function main() {
  await ethers.provider.ready;
  const signer = (await ethers.getSigners())[0];

  const factory = await deployFactory(FEE_RECEIVER, signer);
  // Need to set myself as fee setter in constructor
  // set feeTo treasury
  // then setFeeToSetter to treasury
  // await factory.setFeeTo(TREASURY);
  // If tx failes
  // const factoryLive = await ethers.getContractAt('PancakeFactory', FACTORY, signer);
  // await factoryLive.setFeeTo(TREASURY);
  // await factoryLive.setFeeToSetter(TREASURY);

  const WETH = '0x5300000000000000000000000000000000000004';
  const router = await deployRouter(factory.address, WETH, signer);
  await deployZap(WETH, router.address, signer);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
