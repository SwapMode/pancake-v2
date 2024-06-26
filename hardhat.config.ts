import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-etherscan';

dotenv.config();

const accounts = process.env.DEV_KEY !== undefined ? [process.env.DEV_KEY] : [];

const config = {
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
  networks: {
    hardhat: {
      chainId: 8453,
      forking: {
        url: process.env.BASE_RPC,
        blockNumber: 9891359, // 1/29 7PM
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
      // gas: 500000,
      // gasPrice: 100,
    },
    baseGoerli: {
      url: process.env.BASE_GOERLI_RPC,
      accounts,
      chainId: 84531,
      gas: 500000,
      gasPrice: 100,
    },
    bsc: {
      url: process.env.BSC_RPC || '',
      accounts,
      chainId: 56,
    },
    scroll: {
      url: process.env.SCROLL_RPC,
      accounts,
      chainId: 534352,
    },
    scrollSepolia: {
      url: process.env.SCROLL_SEPOLIA_RPC,
      accounts,
      chainId: 534351,
    },
    mode: {
      url: process.env.MODE_RPC,
      accounts,
      chainId: 34443,
    },
    modeTestnet: {
      url: 'https://sepolia.mode.network/',
      accounts,
      chainId: 919,
      // gas: 500000,
      // gasPrice: 100,
    },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: 'abc',
      scroll: process.env.SCROLL_SCAN_API_KEY,
    },
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://sepolia-blockscout.scroll.io/api',
          browserURL: 'https://sepolia-blockscout.scroll.io/',
        },
      },
      {
        network: 'scroll',
        chainId: 534352,
        urls: {
          apiURL: 'https://api.scrollscan.com/api',
          browserURL: 'https://scrollscan.com/',
        },
      },
    ],
  },
};

export default config;
