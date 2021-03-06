/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface ICollectionFactoryInterface extends utils.Interface {
  functions: {
    "addImplementationAddress(bytes32,address,bool)": FunctionFragment;
    "createCollection(address,bytes)": FunctionFragment;
    "createEcosystemSettings(string,bytes)": FunctionFragment;
    "getCollections(address)": FunctionFragment;
    "getEcosystemSettings(bytes32,uint64)": FunctionFragment;
    "getEcosystems()": FunctionFragment;
    "getImplementationAddresses(bytes32,uint256,uint256)": FunctionFragment;
    "removeCollection(address,address,uint256)": FunctionFragment;
    "removeImplementationAddresses(bytes32[],address[],uint256[])": FunctionFragment;
    "setFactoryMaintainerAddress(address)": FunctionFragment;
    "updateEcosystemSettings(bytes32,bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addImplementationAddress",
    values: [BytesLike, string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "createCollection",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "createEcosystemSettings",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getCollections",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getEcosystemSettings",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getEcosystems",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getImplementationAddresses",
    values: [BytesLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeCollection",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeImplementationAddresses",
    values: [BytesLike[], string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setFactoryMaintainerAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateEcosystemSettings",
    values: [BytesLike, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "addImplementationAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createEcosystemSettings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCollections",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEcosystemSettings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEcosystems",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getImplementationAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeImplementationAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFactoryMaintainerAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateEcosystemSettings",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ICollectionFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ICollectionFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addImplementationAddress(
      _hashedEcosystemName: BytesLike,
      _implementationAddress: string,
      cloneable: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createCollection(
      _implementationAddress: string,
      _initializationData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createEcosystemSettings(
      _ecosystemName: string,
      _settings: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "getCollections(address)"(
      _implementationAddress: string,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    "getCollections(address,uint256,uint256)"(
      _implementationAddress: string,
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    getEcosystemSettings(
      _hashedEcosystemName: BytesLike,
      _blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "getEcosystems()"(overrides?: CallOverrides): Promise<[string[]]>;

    "getEcosystems(uint256,uint256)"(
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    "getImplementationAddresses(bytes32,uint256,uint256)"(
      _hashedEcosystemName: BytesLike,
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    "getImplementationAddresses(bytes32)"(
      _hashedEcosystemName: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    removeCollection(
      _implementationAddress: string,
      _collectionAddress: string,
      _index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeImplementationAddresses(
      _hashedEcosystemNames: BytesLike[],
      _implementationAddresses: string[],
      _indexes: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setFactoryMaintainerAddress(
      _factoryMaintainerAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateEcosystemSettings(
      _hashedEcosystemName: BytesLike,
      _settings: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addImplementationAddress(
    _hashedEcosystemName: BytesLike,
    _implementationAddress: string,
    cloneable: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createCollection(
    _implementationAddress: string,
    _initializationData: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createEcosystemSettings(
    _ecosystemName: string,
    _settings: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "getCollections(address)"(
    _implementationAddress: string,
    overrides?: CallOverrides
  ): Promise<string[]>;

  "getCollections(address,uint256,uint256)"(
    _implementationAddress: string,
    _start: BigNumberish,
    _end: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string[]>;

  getEcosystemSettings(
    _hashedEcosystemName: BytesLike,
    _blockNumber: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "getEcosystems()"(overrides?: CallOverrides): Promise<string[]>;

  "getEcosystems(uint256,uint256)"(
    _start: BigNumberish,
    _end: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string[]>;

  "getImplementationAddresses(bytes32,uint256,uint256)"(
    _hashedEcosystemName: BytesLike,
    _start: BigNumberish,
    _end: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string[]>;

  "getImplementationAddresses(bytes32)"(
    _hashedEcosystemName: BytesLike,
    overrides?: CallOverrides
  ): Promise<string[]>;

  removeCollection(
    _implementationAddress: string,
    _collectionAddress: string,
    _index: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeImplementationAddresses(
    _hashedEcosystemNames: BytesLike[],
    _implementationAddresses: string[],
    _indexes: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setFactoryMaintainerAddress(
    _factoryMaintainerAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateEcosystemSettings(
    _hashedEcosystemName: BytesLike,
    _settings: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addImplementationAddress(
      _hashedEcosystemName: BytesLike,
      _implementationAddress: string,
      cloneable: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    createCollection(
      _implementationAddress: string,
      _initializationData: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    createEcosystemSettings(
      _ecosystemName: string,
      _settings: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "getCollections(address)"(
      _implementationAddress: string,
      overrides?: CallOverrides
    ): Promise<string[]>;

    "getCollections(address,uint256,uint256)"(
      _implementationAddress: string,
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string[]>;

    getEcosystemSettings(
      _hashedEcosystemName: BytesLike,
      _blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "getEcosystems()"(overrides?: CallOverrides): Promise<string[]>;

    "getEcosystems(uint256,uint256)"(
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string[]>;

    "getImplementationAddresses(bytes32,uint256,uint256)"(
      _hashedEcosystemName: BytesLike,
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string[]>;

    "getImplementationAddresses(bytes32)"(
      _hashedEcosystemName: BytesLike,
      overrides?: CallOverrides
    ): Promise<string[]>;

    removeCollection(
      _implementationAddress: string,
      _collectionAddress: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    removeImplementationAddresses(
      _hashedEcosystemNames: BytesLike[],
      _implementationAddresses: string[],
      _indexes: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    setFactoryMaintainerAddress(
      _factoryMaintainerAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateEcosystemSettings(
      _hashedEcosystemName: BytesLike,
      _settings: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    addImplementationAddress(
      _hashedEcosystemName: BytesLike,
      _implementationAddress: string,
      cloneable: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createCollection(
      _implementationAddress: string,
      _initializationData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createEcosystemSettings(
      _ecosystemName: string,
      _settings: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "getCollections(address)"(
      _implementationAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getCollections(address,uint256,uint256)"(
      _implementationAddress: string,
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEcosystemSettings(
      _hashedEcosystemName: BytesLike,
      _blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getEcosystems()"(overrides?: CallOverrides): Promise<BigNumber>;

    "getEcosystems(uint256,uint256)"(
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getImplementationAddresses(bytes32,uint256,uint256)"(
      _hashedEcosystemName: BytesLike,
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getImplementationAddresses(bytes32)"(
      _hashedEcosystemName: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeCollection(
      _implementationAddress: string,
      _collectionAddress: string,
      _index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeImplementationAddresses(
      _hashedEcosystemNames: BytesLike[],
      _implementationAddresses: string[],
      _indexes: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setFactoryMaintainerAddress(
      _factoryMaintainerAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateEcosystemSettings(
      _hashedEcosystemName: BytesLike,
      _settings: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addImplementationAddress(
      _hashedEcosystemName: BytesLike,
      _implementationAddress: string,
      cloneable: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createCollection(
      _implementationAddress: string,
      _initializationData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createEcosystemSettings(
      _ecosystemName: string,
      _settings: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "getCollections(address)"(
      _implementationAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getCollections(address,uint256,uint256)"(
      _implementationAddress: string,
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getEcosystemSettings(
      _hashedEcosystemName: BytesLike,
      _blockNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getEcosystems()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getEcosystems(uint256,uint256)"(
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getImplementationAddresses(bytes32,uint256,uint256)"(
      _hashedEcosystemName: BytesLike,
      _start: BigNumberish,
      _end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getImplementationAddresses(bytes32)"(
      _hashedEcosystemName: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeCollection(
      _implementationAddress: string,
      _collectionAddress: string,
      _index: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeImplementationAddresses(
      _hashedEcosystemNames: BytesLike[],
      _implementationAddresses: string[],
      _indexes: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setFactoryMaintainerAddress(
      _factoryMaintainerAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateEcosystemSettings(
      _hashedEcosystemName: BytesLike,
      _settings: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
