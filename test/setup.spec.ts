import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { awesomeFixture } from './fixtures/awesome.fixture';

describe('PancakeSwap', () => {
  it('deploy', async () => {
    const { factory } = await loadFixture(awesomeFixture);

    expect(true).to.be.true;
  });
});
