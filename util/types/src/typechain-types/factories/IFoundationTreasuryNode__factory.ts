/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IFoundationTreasuryNode,
  IFoundationTreasuryNodeInterface,
} from "../IFoundationTreasuryNode";

const _abi = [
  {
    inputs: [],
    name: "getFoundationTreasury",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IFoundationTreasuryNode__factory {
  static readonly abi = _abi;
  static createInterface(): IFoundationTreasuryNodeInterface {
    return new utils.Interface(_abi) as IFoundationTreasuryNodeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IFoundationTreasuryNode {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IFoundationTreasuryNode;
  }
}