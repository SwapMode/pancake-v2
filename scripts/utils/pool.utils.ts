import { ethers } from 'hardhat';

export async function createPool(
  factoryAddress: string,
  tokenA: string,
  tokenB: string,
  signer
): Promise<{ token0: string; token1: string; pair: string }> {
  const factory = await ethers.getContractAt('PancakeFactory', factoryAddress, signer);
  const tx = await factory.createPair(tokenA, tokenB);
  const rx = await tx.wait();
  const pool = rx.events.find((evt) => evt.event === 'PairCreated');

  return {
    token0: pool.args.token0,
    token1: pool.args.token1,
    pair: pool.args.pair,
  };
}
