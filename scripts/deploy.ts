import { ethers } from 'hardhat';
import { deployFactory, deployRouter } from './utils/deploy.utils';
import { TOKENS } from './data/token';
import { keccak256 } from '../test/utils';

import hasher from '../artifacts/contracts/PancakePair.sol/PancakePair.json';

// Meme dev account
const DEV_ACCOUNT = '0x03d4C4b1B115c068Ef864De2e21E724a758892A2';

const TREASURY_TESTNET = DEV_ACCOUNT;
const FACTORY_TESTNET = '0x7C6C367ee607737d4297829cD2EA39eee4C98119';
const ROUTER_TESTNET = '0x865654Ebe6030686bDe44708597bbb3F289ea7f1';

const FACTORY = FACTORY_TESTNET;
const ROUTER = ROUTER_TESTNET;

// BASE real treasury '0xAF1823bACd8EDDA3b815180a61F8741fA4aBc6Dd ';
const TREASURY = TREASURY_TESTNET;
const FEE_RECEIVER = TREASURY;

async function main() {
  // TODO: Briz all the 100% of the swap fees should go to the multisig
  //
  await ethers.provider.ready;
  const signer = (await ethers.getSigners())[0];

  // const factory = await deployFactory(FEE_RECEIVER, signer);
  // await factory.setFeeTo(TREASURY);
  // If tx failes
  // const factoryLive = await ethers.getContractAt('PancakeFactory', FACTORY, signer);
  // console.log(await factoryLive.feeTo());

  // const WETH = TOKENS.WETH[ethers.provider.network.chainId];
  // await deployRouter(FACTORY, WETH, signer);
  //
  // INIT_HASH is on the factory
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
