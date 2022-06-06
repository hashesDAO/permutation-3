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
