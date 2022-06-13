import { ethers } from 'ethers';

export async function getHashesCount(
  contract: ethers.Contract,
  address: string
): Promise<number | Error> {
  try {
    const hashesBalance = await contract.balanceOf(address);
    return hashesBalance.toNumber();
  } catch (error) {
    return new Error(`error getting contract balance: ${error}`);
  }
}

export type hashType = 'DAO' | 'DAO Deactivated' | 'Standard';

export function getHashType(
  tokenId: string | string[],
  isDeactivated: boolean
): hashType {
  return Number(tokenId) >= 1000 ? 'Standard' : isDeactivated ? 'DAO Deactivated' : 'DAO';
}

export function isValidAddress(address: string): boolean {
  return typeof(address) === 'string' &&
  address.length !== 0 &&
  ethers.utils.isAddress(address);
}