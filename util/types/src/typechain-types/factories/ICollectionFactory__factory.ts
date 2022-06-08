/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  ICollectionFactory,
  ICollectionFactoryInterface,
} from "../ICollectionFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_hashedEcosystemName",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "_implementationAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "cloneable",
        type: "bool",
      },
    ],
    name: "addImplementationAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_implementationAddress",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_initializationData",
        type: "bytes",
      },
    ],
    name: "createCollection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_ecosystemName",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "_settings",
        type: "bytes",
      },
    ],
    name: "createEcosystemSettings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_implementationAddress",
        type: "address",
      },
    ],
    name: "getCollections",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_implementationAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_end",
        type: "uint256",
      },
    ],
    name: "getCollections",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_hashedEcosystemName",
        type: "bytes32",
      },
      {
        internalType: "uint64",
        name: "_blockNumber",
        type: "uint64",
      },
    ],
    name: "getEcosystemSettings",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEcosystems",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_end",
        type: "uint256",
      },
    ],
    name: "getEcosystems",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_hashedEcosystemName",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_end",
        type: "uint256",
      },
    ],
    name: "getImplementationAddresses",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_hashedEcosystemName",
        type: "bytes32",
      },
    ],
    name: "getImplementationAddresses",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_implementationAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_collectionAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "removeCollection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "_hashedEcosystemNames",
        type: "bytes32[]",
      },
      {
        internalType: "address[]",
        name: "_implementationAddresses",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_indexes",
        type: "uint256[]",
      },
    ],
    name: "removeImplementationAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_factoryMaintainerAddress",
        type: "address",
      },
    ],
    name: "setFactoryMaintainerAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_hashedEcosystemName",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_settings",
        type: "bytes",
      },
    ],
    name: "updateEcosystemSettings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class ICollectionFactory__factory {
  static readonly abi = _abi;
  static createInterface(): ICollectionFactoryInterface {
    return new utils.Interface(_abi) as ICollectionFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ICollectionFactory {
    return new Contract(address, _abi, signerOrProvider) as ICollectionFactory;
  }
}
