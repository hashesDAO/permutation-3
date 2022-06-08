/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  SuperRareContracts,
  SuperRareContractsInterface,
} from "../SuperRareContracts";

const _abi = [
  {
    inputs: [],
    name: "SUPERRARE_REGISTRY",
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
  {
    inputs: [],
    name: "SUPERRARE_V1",
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
  {
    inputs: [],
    name: "SUPERRARE_V2",
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

const _bytecode =
  "0x61012061003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361060475760003560e01c806389f796ba14604c578063d236782314607a578063f19312ff146094575b600080fd5b606673b932a70a57673d89f4acffbe830e8ed7f75fb9e081565b6040516071919060bb565b60405180910390f35b60667317b0c8564e53f22364a6c8de6f7ca5ce9bea4e5d81565b60667341a322b28d0ff354040e2cbc676f0320d8c8850d81565b60b58160cd565b82525050565b6020810160c7828460ae565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff821660c756fea26469706673582212205de6e3464bf5123212306acebf29ed2bd75c1f70bc825fde5c3c6a707ff958c264736f6c63430008060033";

type SuperRareContractsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SuperRareContractsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SuperRareContracts__factory extends ContractFactory {
  constructor(...args: SuperRareContractsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SuperRareContracts> {
    return super.deploy(overrides || {}) as Promise<SuperRareContracts>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): SuperRareContracts {
    return super.attach(address) as SuperRareContracts;
  }
  connect(signer: Signer): SuperRareContracts__factory {
    return super.connect(signer) as SuperRareContracts__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SuperRareContractsInterface {
    return new utils.Interface(_abi) as SuperRareContractsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SuperRareContracts {
    return new Contract(address, _abi, signerOrProvider) as SuperRareContracts;
  }
}
