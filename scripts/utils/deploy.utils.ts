import { parseUnits } from 'ethers/lib/utils';
import { ethers } from 'hardhat';

export async function deployFactory(feeReceiver: string, signer) {
  const Factory = await ethers.getContractFactory('PancakeFactory', signer);
  const instance = await Factory.deploy(feeReceiver, {
    gasLimit: 3000000,
    gasPrice: parseUnits('20', 'gwei'),
  });
  await instance.deployed();

  console.log('PancakeFactory deployed at: ' + instance.address);

  return instance;
}

export async function deployRouter(factory: string, weth: string, signer) {
  const Factory = await ethers.getContractFactory('PancakeRouter', signer);
  const instance = await Factory.deploy(factory, weth, {
    gasLimit: 3000000,
    gasPrice: parseUnits('20', 'gwei'),
  });
  await instance.deployed();

  console.log('PancakeRouter deployed at: ' + instance.address);

  return instance;
}

export async function deployToken(name: string, signer) {
  const Factory = await ethers.getContractFactory(name, signer);
  const instance = await Factory.deploy();
  await instance.deployed();
  console.log(`${name} deployed at: ` + instance.address);
  return instance;
}

export async function deployMockToken(name: string, symbol: string, signer) {
  const Factory = await ethers.getContractFactory('MockERC20', signer);
  const instance = await Factory.deploy(name, symbol);
  await instance.deployed();
  console.log(`${name} deployed at: ` + instance.address);
  return instance;
}

// constructor(address _WBNBAddress, address _pancakeRouter, uint256 _maxZapReverseRatio)
export async function deployZap(weth: string, router: string, signer) {
  const Factory = await ethers.getContractFactory('PancakeZapV1', signer);
  const _maxZapReverseRatio = 1;
  const instance = await Factory.deploy(weth, router, _maxZapReverseRatio);
  await instance.deployed();
  console.log(`PancakeZapV1 deployed at: ` + instance.address);
  return instance;
}
