import { ethers } from 'hardhat';

export async function deployFactory(feeReceiver: string, signer) {
  const Factory = await ethers.getContractFactory('PancakeFactory', signer);
  const instance = await Factory.deploy(feeReceiver);
  await instance.deployed();

  console.log('PancakeFactory deployed at: ' + instance.address);

  return instance;
}

export async function deployRouter(factory: string, weth: string, signer) {
  const Factory = await ethers.getContractFactory('PancakeRouter', signer);
  const instance = await Factory.deploy(factory, weth);
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
