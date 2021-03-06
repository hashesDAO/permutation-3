/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IArtBlocks, IArtBlocksInterface } from "../IArtBlocks";

const _abi = [
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IArtBlocks__factory {
  static readonly abi = _abi;
  static createInterface(): IArtBlocksInterface {
    return new utils.Interface(_abi) as IArtBlocksInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IArtBlocks {
    return new Contract(address, _abi, signerOrProvider) as IArtBlocks;
  }
}
