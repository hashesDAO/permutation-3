/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ICollection, ICollectionInterface } from "../ICollection";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_settings",
        type: "bytes",
      },
    ],
    name: "verifyEcosystemSettings",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

export class ICollection__factory {
  static readonly abi = _abi;
  static createInterface(): ICollectionInterface {
    return new utils.Interface(_abi) as ICollectionInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ICollection {
    return new Contract(address, _abi, signerOrProvider) as ICollection;
  }
}
