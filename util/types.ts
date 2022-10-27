import { BigNumber } from 'ethers';

export interface HashWithMetadata {
  hashBase64EncodedSVG: string;
  tokenId: BigNumber;
  hash: string;
  mintFee: BigNumber;
  isEligible: boolean;
  hasAlreadyBeenUsedToMint: boolean;
}
