/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IZoraMarket, IZoraMarketInterface } from "../IZoraMarket";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "bidSharesForToken",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct IZoraMarket.ZoraDecimal",
            name: "prevOwner",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct IZoraMarket.ZoraDecimal",
            name: "creator",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct IZoraMarket.ZoraDecimal",
            name: "owner",
            type: "tuple",
          },
        ],
        internalType: "struct IZoraMarket.ZoraBidShares",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IZoraMarket__factory {
  static readonly abi = _abi;
  static createInterface(): IZoraMarketInterface {
    return new utils.Interface(_abi) as IZoraMarketInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IZoraMarket {
    return new Contract(address, _abi, signerOrProvider) as IZoraMarket;
  }
}
