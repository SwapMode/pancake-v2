import { ethers } from 'hardhat';
import { deployFactory, deployRouter } from './utils/deploy.utils';
import { TOKENS } from './data/token';
import { keccak256 } from '../test/utils';

import hasher from '../artifacts/contracts/PancakePair.sol/PancakePair.json';

// Meme dev account
export const FEE_RECEIVER = '0x03d4C4b1B115c068Ef864De2e21E724a758892A2';

const FACTORY_TESTNET = '0xFDa619b6d20975be80A10332cD39b9a4b0FAa8BB';
const ROUTER_TESTNET = '0x6F1a2F63Ea06B475EDBf2E6393406058C12A7910';

async function main() {
  // await ethers.provider.ready;
  // const chainId = ethers.provider.network.chainId;
  // const signer = (await ethers.getSigners())[0];

  //  await deployFactory(FEE_RECEIVER, signer);
  // const WETH = TOKENS.WETH[chainId];
  // await deployRouter(FACTORY_TESTNET, WETH, signer);

  const hash = keccak256(['bytes'], [hasher.bytecode]);
  console.log(hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
