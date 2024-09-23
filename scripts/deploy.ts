import { ethers } from 'hardhat';
import { deployFactory, deployRouter, deployZap, getWalletSigner } from './utils/deploy.utils';

const WETH = '0x4200000000000000000000000000000000000006';
const FACTORY = '0x22505cb4d5d10b2c848a9d75c57ea72a66066d8c';
const ROUTER = '0x6D0829dABd4B41e9a999283a11DDa1516F591e86';
const ZAP = '0xbA38040Af245ca5829B32AF4D4C9be7dB26d8c15';

async function main() {
  await ethers.provider.ready;
  const signer = getWalletSigner(10);
  // await deployFactory(signer);
  // Need to set dev account as fee setter in constructor
  // set feeTo treasury
  // then setFeeToSetter to treasury
  // await factory.setFeeTo(TREASURY);
  // If tx failes
  // const factoryLive = await ethers.getContractAt('PancakeFactory', FACTORY, signer);
  // console.log(await factoryLive.INIT_CODE_PAIR_HASH()); // 0x6e07608342d32f0f0dd02578dbad53c670910abf33b1835b20deef24001435e8
  // await factoryLive.setFeeTo(TREASURY);
  // await factoryLive.setFeeToSetter(TREASURY);

  // await deployRouter(FACTORY, WETH, signer);
  // await deployZap(WETH, ROUTER, signer);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
