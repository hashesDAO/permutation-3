import { ethers } from 'ethers';
import HASHES_ABI from './Hashes.json';
import HASHES_DAO_ABI from './HashesDAO.json';
import { CollectionNFTCloneableV1__factory } from './types/src';

export function hex2bin(hex: string) {
  return hex
    .replace('0x', '')
    .split('')
    .map((i) => parseInt(i, 16).toString(2).padStart(4, '0'))
    .join('');
}

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GORLI = 5,
  KOVAN = 42,
}

export const INFURA_PREFIXES: { [key: number]: string } = {
  1: 'mainnet',
  4: 'rinkeby',
};

export const HASHES_ADDRESS = {
  [ChainId.MAINNET]: '0xD07e72b00431af84AD438CA995Fd9a7F0207542d',
  [ChainId.RINKEBY]: '0x25ca4f68d0f8271b0796406101ad6430a149af17',
};

export const HASHESDAO_ADDRESS = {
  [ChainId.MAINNET]: '0xbD3Af18e0b7ebB30d49B253Ab00788b92604552C',
  [ChainId.KOVAN]: '0xb2c0ADD2C81732A5D6609d122340fBafF99D7cC1',
};

export function getHashesContract(chain_id: number | undefined): ethers.Contract {
  const chainId = 1; //temp
  const provider = new ethers.providers.InfuraProvider(INFURA_PREFIXES[chainId], "01d9d6cf6429481bb892fad8698a3911");
  const newContract =  new ethers.Contract(HASHES_ADDRESS[chainId], HASHES_ABI.abi, provider);
  return newContract;
}

export function getHashesDAOContract(): ethers.Contract {
  const chainId = 1; //temp
  const provider = new ethers.providers.InfuraProvider(INFURA_PREFIXES[chainId]);
  const newContract =  new ethers.Contract(HASHESDAO_ADDRESS[chainId], HASHES_DAO_ABI.abi, provider);
  return newContract;
}

export function getHashesCollectionContract(address: string): ethers.Contract {
  const chainId = 1; //temp
  const provider = new ethers.providers.InfuraProvider(INFURA_PREFIXES[1]);
  const hashesCollectionContract = CollectionNFTCloneableV1__factory.connect(
    address,
    provider
  );

  return hashesCollectionContract;
}