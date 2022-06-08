/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IZoraOverride, IZoraOverrideInterface } from "../IZoraOverride";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "media",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "convertBidShares",
    outputs: [
      {
        internalType: "address payable[]",
        name: "",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IZoraOverride__factory {
  static readonly abi = _abi;
  static createInterface(): IZoraOverrideInterface {
    return new utils.Interface(_abi) as IZoraOverrideInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IZoraOverride {
    return new Contract(address, _abi, signerOrProvider) as IZoraOverride;
  }
}
