import { parseUnits } from 'ethers/lib/utils';
import { ethers } from 'hardhat';
import * as optimismSDK from '@eth-optimism/sdk';
import { Wallet } from 'ethers';

const OP_STACKS = [10, 8453, 34443, 1946];

export async function deployFactory(signer) {
  const Factory = await ethers.getContractFactory('PancakeFactory', signer);
  // 0.001324158

  const instance = await Factory.deploy({
    gasLimit: 5500000,
    // gasPrice: parseUnits('0.0004', 'gwei'),
    // maxPriorityFeePerGas: parseUnits('0.00003', 'gwei'),
    // maxFeePerGas: parseUnits('0.000438925', 'gwei'),
  });
  await instance.deployed();

  console.log('PancakeFactory deployed at: ' + instance.address);

  return instance;
}

export async function deployRouter(factory: string, weth: string, signer) {
  const Factory = await ethers.getContractFactory('PancakeRouter', signer);
  const instance = await Factory.deploy(factory, weth, {
    gasLimit: 5500000,
    // gasPrice: parseUnits('20', 'gwei'),
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

export function getRpcUrl(chainId: number) {
  return process.env[`RPC_${chainId}`];
}

export function getEnvDevKey(chainId: number) {
  return process.env[`DEV_KEY_${chainId}`];
}

export function getRpcProvider(url: string, chainId: number) {
  return new ethers.providers.JsonRpcProvider(url, {
    name: '',
    chainId,
  });
}

export function getEnvRpcProvider(chainId: number) {
  const rpc = getRpcUrl(chainId);

  if (OP_STACKS.includes(chainId)) {
    return optimismSDK.asL2Provider(getRpcProvider(rpc, chainId));
  }
  return getRpcProvider(rpc, chainId);
}

export function getWalletSigner(chainId: number) {
  return new Wallet(getEnvDevKey(chainId)).connect(getEnvRpcProvider(chainId));
}
