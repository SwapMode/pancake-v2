import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-etherscan';

dotenv.config();

const accounts = process.env.DEV_KEY !== undefined ? [process.env.DEV_KEY] : [];

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
      {
        version: '0.6.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
      {
        version: '0.5.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
      {
        version: '0.4.18',
        settings: {
          optimizer: {
            enabled: true,
            runs: 99999,
          },
        },
      },
    ],
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: 'base',
        chainId: 8453,
        urls: {
          apiURL: 'https://api.basescan.org',
          browserURL: 'https://basescan.org',
        },
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 84531,
      forking: {
        url: process.env.BASE_GOERLI_RPC,
        blockNumber: 7769354,
      },
    },
    arbitrum: {
      url: process.env.ARBITRUM_RPC || '',
      accounts,
      chainId: 42161,
    },
    arbitrum_goerli: {
      url: process.env.ARBITRUM_GOERLI_RPC || '',
      accounts,
      chainId: 421613,
    },
    optimism: {
      url: `${process.env.OPTIMISM_RPC}`,
      accounts,
      chainId: 10,
    },
    optimism_goerli: {
      url: `${process.env.OPTIMISM_GOERLI_RPC}`,
      accounts,
      chainId: 420,
    },
    base: {
      url: process.env.BASE_RPC || '',
      accounts,
      chainId: 8453,
      gas: 500000,
      gasPrice: 100,
    },
    base_goerli: {
      url: process.env.BASE_GOERLI_RPC,
      accounts,
      chainId: 84531,
    },
    bsc: {
      url: process.env.BSC_RPC || '',
      accounts,
      chainId: 56,
    },
  },
};

export default config;
