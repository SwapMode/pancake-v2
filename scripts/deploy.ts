import { ethers } from 'hardhat';
import { deployFactory, deployRouter, deployZap } from './utils/deploy.utils';
import { TOKENS } from './data/token';

// Meme dev account
const DEV_ACCOUNT = '0x03d4C4b1B115c068Ef864De2e21E724a758892A2';

const TREASURY_TESTNET = DEV_ACCOUNT;
const FACTORY_TESTNET = '0x7C6C367ee607737d4297829cD2EA39eee4C98119';
const ROUTER_TESTNET = '0x865654Ebe6030686bDe44708597bbb3F289ea7f1';

const FACTORY_MAINNET = '0xFDa619b6d20975be80A10332cD39b9a4b0FAa8BB';
const ROUTER_MAINNET = '0x327Df1E6de05895d2ab08513aaDD9313Fe505d86';

// BASE real treasury '0xAF1823bACd8EDDA3b815180a61F8741fA4aBc6Dd ';
const TREASURY = '0xAF1823bACd8EDDA3b815180a61F8741fA4aBc6Dd';
const FEE_RECEIVER = DEV_ACCOUNT;
const FACTORY = FACTORY_MAINNET;
const ROUTER = ROUTER_MAINNET;

async function main() {
  await ethers.provider.ready;
  const signer = (await ethers.getSigners())[0];

  // const factory = await deployFactory(FEE_RECEIVER, signer);
  // Need to set myself as fee setter in constructor
  // set feeTo treasury
  // then setFeeToSetter to treasury
  // await factory.setFeeTo(TREASURY);
  // If tx failes
  // const factoryLive = await ethers.getContractAt('PancakeFactory', FACTORY, signer);
  // await factoryLive.setFeeTo(TREASURY);
  // await factoryLive.setFeeToSetter(TREASURY);

  const WETH = TOKENS.WETH[ethers.provider.network.chainId];
  // await deployRouter(FACTORY, WETH, signer);

  await deployZap(WETH, ROUTER, signer);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
