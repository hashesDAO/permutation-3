/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TestCollectionPredicates2,
  TestCollectionPredicates2Interface,
} from "../TestCollectionPredicates2";

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
    name: "getTokenMintFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
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
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061011b806100206000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80631cc1fddb1460375780639626f09c14605a575b600080fd5b604660423660046087565b6078565b6040516051919060d9565b60405180910390f35b606d60653660046087565b600192915050565b6040516051919060cd565b60005b92915050565b8035607b565b60008060408385031215609b57609b600080fd5b600060a585856081565b925050602060b4858286016081565b9150509250929050565b8015155b82525050565b8060c2565b60208101607b828460be565b60208101607b828460c856fea26469706673582212203bd5cac7016566fea0facf4d5785b478dd8779c898ee624fcd9d68ba6f511dec64736f6c63430008060033";

type TestCollectionPredicates2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestCollectionPredicates2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestCollectionPredicates2__factory extends ContractFactory {
  constructor(...args: TestCollectionPredicates2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestCollectionPredicates2> {
    return super.deploy(overrides || {}) as Promise<TestCollectionPredicates2>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestCollectionPredicates2 {
    return super.attach(address) as TestCollectionPredicates2;
  }
  connect(signer: Signer): TestCollectionPredicates2__factory {
    return super.connect(signer) as TestCollectionPredicates2__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestCollectionPredicates2Interface {
    return new utils.Interface(_abi) as TestCollectionPredicates2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestCollectionPredicates2 {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TestCollectionPredicates2;
  }
}
