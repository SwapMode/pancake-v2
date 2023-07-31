import { ethers } from 'hardhat';
import { deployFactory, deployRouter } from './utils/deploy.utils';
import { TOKENS } from './data/token';
import { keccak256 } from '../test/utils';

import hasher from '../artifacts/contracts/PancakePair.sol/PancakePair.json';

// Meme dev account
const DEV_ACCOUNT = '0x03d4C4b1B115c068Ef864De2e21E724a758892A2';

export const FEE_RECEIVER = DEV_ACCOUNT;
const TREASURY = DEV_ACCOUNT;
const FACTORY_TESTNET = '0xc102505248c36f933934d4B2d7579D962a342eBC';
const ROUTER_TESTNET = '0x2c797784Ff1c3Da0F9FF80CcbF64dc147e4BBf55';

async function main() {
  // TODO: Briz all the 100% of the swap fees should go to the multisig
  //
  await ethers.provider.ready;
  const signer = (await ethers.getSigners())[0];
  // const factory = await deployFactory(FEE_RECEIVER, signer);
  // await factory.setFeeTo(TREASURY);

  // const factoryLive = await ethers.getContractAt('PancakeFactory', FACTORY_TESTNET, signer);
  // console.log(await factoryLive.feeTo());

  // const WETH = TOKENS.WETH[ethers.provider.network.chainId];
  // await deployRouter(FACTORY_TESTNET, WETH, signer);
  //
  // INIT_HASH is on the factory
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
