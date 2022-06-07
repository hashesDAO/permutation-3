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
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface MedleyLimitedEditionPredicatesInterface
  extends utils.Interface {
  functions: {
    "currentRolloutState()": FunctionFragment;
    "getTokenMintFee(uint256,uint256)": FunctionFragment;
    "isTokenEligibleToMint(uint256,uint256)": FunctionFragment;
    "normalSeasonAllowlist(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "preSeasonAllowlist(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setCurrentRolloutState(uint8)": FunctionFragment;
    "setNormalSeasonAllowlist(uint256[],bool[])": FunctionFragment;
    "setPreSeasonAllowlist(uint256[],bool[])": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "currentRolloutState",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenMintFee",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isTokenEligibleToMint",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "normalSeasonAllowlist",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "preSeasonAllowlist",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setCurrentRolloutState",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setNormalSeasonAllowlist",
    values: [BigNumberish[], boolean[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setPreSeasonAllowlist",
    values: [BigNumberish[], boolean[]]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "currentRolloutState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenMintFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isTokenEligibleToMint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "normalSeasonAllowlist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "preSeasonAllowlist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setCurrentRolloutState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setNormalSeasonAllowlist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPreSeasonAllowlist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface MedleyLimitedEditionPredicates extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MedleyLimitedEditionPredicatesInterface;

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
    currentRolloutState(overrides?: CallOverrides): Promise<[number]>;

    getTokenMintFee(
      _tokenId: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    isTokenEligibleToMint(
      _tokenId: BigNumberish,
      _hashesTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    normalSeasonAllowlist(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    preSeasonAllowlist(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setCurrentRolloutState(
      _rolloutState: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setNormalSeasonAllowlist(
      _allowlist: BigNumberish[],
      _enable: boolean[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPreSeasonAllowlist(
      _allowlist: BigNumberish[],
      _enable: boolean[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  currentRolloutState(overrides?: CallOverrides): Promise<number>;

  getTokenMintFee(
    _tokenId: BigNumberish,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  isTokenEligibleToMint(
    _tokenId: BigNumberish,
    _hashesTokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  normalSeasonAllowlist(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  preSeasonAllowlist(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setCurrentRolloutState(
    _rolloutState: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setNormalSeasonAllowlist(
    _allowlist: BigNumberish[],
    _enable: boolean[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPreSeasonAllowlist(
    _allowlist: BigNumberish[],
    _enable: boolean[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    currentRolloutState(overrides?: CallOverrides): Promise<number>;

    getTokenMintFee(
      _tokenId: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isTokenEligibleToMint(
      _tokenId: BigNumberish,
      _hashesTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    normalSeasonAllowlist(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    preSeasonAllowlist(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setCurrentRolloutState(
      _rolloutState: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setNormalSeasonAllowlist(
      _allowlist: BigNumberish[],
      _enable: boolean[],
      overrides?: CallOverrides
    ): Promise<void>;

    setPreSeasonAllowlist(
      _allowlist: BigNumberish[],
      _enable: boolean[],
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    currentRolloutState(overrides?: CallOverrides): Promise<BigNumber>;

    getTokenMintFee(
      _tokenId: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isTokenEligibleToMint(
      _tokenId: BigNumberish,
      _hashesTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    normalSeasonAllowlist(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    preSeasonAllowlist(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setCurrentRolloutState(
      _rolloutState: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setNormalSeasonAllowlist(
      _allowlist: BigNumberish[],
      _enable: boolean[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPreSeasonAllowlist(
      _allowlist: BigNumberish[],
      _enable: boolean[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    currentRolloutState(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTokenMintFee(
      _tokenId: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isTokenEligibleToMint(
      _tokenId: BigNumberish,
      _hashesTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    normalSeasonAllowlist(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    preSeasonAllowlist(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setCurrentRolloutState(
      _rolloutState: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setNormalSeasonAllowlist(
      _allowlist: BigNumberish[],
      _enable: boolean[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPreSeasonAllowlist(
      _allowlist: BigNumberish[],
      _enable: boolean[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}