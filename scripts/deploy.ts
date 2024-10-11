import { ethers } from 'hardhat';
import { deployFactory, deployRouter, deployZap, getWalletSigner } from './utils/deploy.utils';

const WETH = '0x591E027153ED4e536275984e1b7573367e11dac4';
const FACTORY = '0x8DFAf055e21B16302DBf00815e5b4d9b6042a4Df';
const ROUTER = '0xB687282AD4Fb8897D5Cd41f3C1A54DeB4cc88625';
const ZAP = '';

async function main() {
  await ethers.provider.ready;
  const signer = getWalletSigner(64165);

  // await deployFactory(signer);
  // await deployRouter(FACTORY, WETH, signer);
  await deployZap(WETH, ROUTER, signer);
  //
  // Need to set dev account as fee setter in constructor
  // set feeTo treasury
  // then setFeeToSetter to treasury
  // await factory.setFeeTo(TREASURY);
  // If tx failes
  // const factoryLive = await ethers.getContractAt('PancakeFactory', FACTORY, signer);
  // console.log(await factoryLive.INIT_CODE_PAIR_HASH()); // 0x6e07608342d32f0f0dd02578dbad53c670910abf33b1835b20deef24001435e8
  // await factoryLive.setFeeTo(TREASURY);
  // await factoryLive.setFeeToSetter(TREASURY);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
