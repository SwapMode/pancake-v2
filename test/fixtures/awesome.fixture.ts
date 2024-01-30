import { ethers } from 'hardhat';
import { ERC20__factory, PancakePair__factory, PancakeRouter__factory } from '../../typechain-types';
import { giveTokens } from '../utils';
import { UNI_V2_LP_BALANCEOF_SLOT } from '../constants';
import { parseUnits } from 'ethers/lib/utils';

export async function awesomeFixture() {
  await ethers.provider.ready;

  const signer = (await ethers.getSigners())[0];

  const TREASURY = '0xAF1823bACd8EDDA3b815180a61F8741fA4aBc6Dd';
  const pair = PancakePair__factory.connect('0xE80B4F755417FB4baF4dbd23C029db3F62786523', signer);
  const router = PancakeRouter__factory.connect('0x327Df1E6de05895d2ab08513aaDD9313Fe505d86', signer);

  const userLPAmount = parseUnits('100');
  await giveTokens(pair.address, UNI_V2_LP_BALANCEOF_SLOT, signer.address, userLPAmount);

  const WETH = ERC20__factory.connect('0x4200000000000000000000000000000000000006', signer);
  const BSWAP = ERC20__factory.connect('0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9', signer);

  return {
    pair,
    router,

    signer,
    TREASURY,
    WETH,
    BSWAP,

    userLPAmount,
  };
}
