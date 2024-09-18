import { ethers } from 'hardhat';
import { deployFactory, deployRouter, deployZap, getWalletSigner } from './utils/deploy.utils';
import { TOKENS } from './data/token';
import { formatUnits, parseUnits } from 'ethers/lib/utils';

// Dev account
const DEV_ACCOUNT = '0x03d4C4b1B115c068Ef864De2e21E724a758892A2';
const FEE_RECEIVER = DEV_ACCOUNT;
const WETH = '0x4200000000000000000000000000000000000006';

async function main() {
  await ethers.provider.ready;
  const signer = getWalletSigner(10);
  await deployFactory(FEE_RECEIVER, signer);

  //  console.log(formatUnits(parseUnits('0.000438925', 'gwei'), 'gwei'));

  // Need to set dev account as fee setter in constructor
  // set feeTo treasury
  // then setFeeToSetter to treasury
  // await factory.setFeeTo(TREASURY);
  // If tx failes
  // const factoryLive = await ethers.getContractAt('PancakeFactory', FACTORY, signer);
  // await factoryLive.setFeeTo(TREASURY);
  // await factoryLive.setFeeToSetter(TREASURY);

  // const router = await deployRouter(factory.address, WETH, signer);
  // await deployZap(WETH, router.address, signer);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
