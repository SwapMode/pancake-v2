import { ethers } from 'hardhat';
import { deployFactory, deployRouter, deployZap, getWalletSigner } from './utils/deploy.utils';

const WETH = '0x4200000000000000000000000000000000000006';
const FACTORY = '0x82995F682dc38b17B99079Cf63DF8d263C6D5eE0';
const ROUTER = '0x74a52eb08d699CD8BE1d42dA4B241d526B8a8285';
const ZAP = '0x8DFAf055e21B16302DBf00815e5b4d9b6042a4Df';

async function main() {
  await ethers.provider.ready;
  const signer = getWalletSigner(1946);

  await deployFactory(signer);
  await deployRouter(FACTORY, WETH, signer);
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
