import { ethers } from 'hardhat';

export async function deployFactory(feeReceiver: string) {
  const Factory = await ethers.getContractFactory('PancakeFactory');
  const instance = await Factory.deploy(feeReceiver);
  await instance.deployed();

  console.log('PancakeFactory deployed at: ' + instance.address);

  return instance;
}

export async function deployRouter(factory: string, weth: string) {
  const Factory = await ethers.getContractFactory('PancakeRouter');
  const instance = await Factory.deploy(factory, weth);
  await instance.deployed();

  console.log('PancakeRouter deployed at: ' + instance.address);

  return instance;
}

export async function deployToken(name: string) {
  const Factory = await ethers.getContractFactory(name);
  const instance = await Factory.deploy();
  await instance.deployed();
  console.log(`${name} deployed at: ` + instance.address);
  return instance;
}
