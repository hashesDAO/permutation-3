/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface TestCollectionStandaloneInterface extends utils.Interface {
  functions: {
    "verifyEcosystemSettings(bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "verifyEcosystemSettings",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "verifyEcosystemSettings",
    data: BytesLike
  ): Result;

  events: {};
}

export interface TestCollectionStandalone extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TestCollectionStandaloneInterface;

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
    verifyEcosystemSettings(
      _settings: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  verifyEcosystemSettings(
    _settings: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    verifyEcosystemSettings(
      _settings: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    verifyEcosystemSettings(
      _settings: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    verifyEcosystemSettings(
      _settings: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
