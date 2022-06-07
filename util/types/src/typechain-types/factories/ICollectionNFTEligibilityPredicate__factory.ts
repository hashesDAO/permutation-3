/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  ICollectionNFTEligibilityPredicate,
  ICollectionNFTEligibilityPredicateInterface,
} from "../ICollectionNFTEligibilityPredicate";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_hashesTokenId",
        type: "uint256",
      },
    ],
    name: "isTokenEligibleToMint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class ICollectionNFTEligibilityPredicate__factory {
  static readonly abi = _abi;
  static createInterface(): ICollectionNFTEligibilityPredicateInterface {
    return new utils.Interface(
      _abi
    ) as ICollectionNFTEligibilityPredicateInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ICollectionNFTEligibilityPredicate {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ICollectionNFTEligibilityPredicate;
  }
}