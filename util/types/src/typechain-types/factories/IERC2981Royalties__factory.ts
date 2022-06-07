/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IERC2981Royalties,
  IERC2981RoyaltiesInterface,
} from "../IERC2981Royalties";

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
        name: "_value",
        type: "uint256",
      },
    ],
    name: "royaltyInfo",
    outputs: [
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_royaltyAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IERC2981Royalties__factory {
  static readonly abi = _abi;
  static createInterface(): IERC2981RoyaltiesInterface {
    return new utils.Interface(_abi) as IERC2981RoyaltiesInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IERC2981Royalties {
    return new Contract(address, _abi, signerOrProvider) as IERC2981Royalties;
  }
}