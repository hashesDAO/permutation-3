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