/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
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

export interface IAdminControlInterface extends utils.Interface {
  functions: {
    "approveAdmin(address)": FunctionFragment;
    "getAdmins()": FunctionFragment;
    "isAdmin(address)": FunctionFragment;
    "revokeAdmin(address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "approveAdmin",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "getAdmins", values?: undefined): string;
  encodeFunctionData(functionFragment: "isAdmin", values: [string]): string;
  encodeFunctionData(functionFragment: "revokeAdmin", values: [string]): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "approveAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getAdmins", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "revokeAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;

  events: {
    "AdminApproved(address,address)": EventFragment;
    "AdminRevoked(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AdminApproved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AdminRevoked"): EventFragment;
}

export type AdminApprovedEvent = TypedEvent<
  [string, string],
  { account: string; sender: string }
>;

export type AdminApprovedEventFilter = TypedEventFilter<AdminApprovedEvent>;

export type AdminRevokedEvent = TypedEvent<
  [string, string],
  { account: string; sender: string }
>;

export type AdminRevokedEventFilter = TypedEventFilter<AdminRevokedEvent>;

export interface IAdminControl extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IAdminControlInterface;

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
    approveAdmin(
      admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAdmins(overrides?: CallOverrides): Promise<[string[]]>;

    isAdmin(admin: string, overrides?: CallOverrides): Promise<[boolean]>;

    revokeAdmin(
      admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  approveAdmin(
    admin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAdmins(overrides?: CallOverrides): Promise<string[]>;

  isAdmin(admin: string, overrides?: CallOverrides): Promise<boolean>;

  revokeAdmin(
    admin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    approveAdmin(admin: string, overrides?: CallOverrides): Promise<void>;

    getAdmins(overrides?: CallOverrides): Promise<string[]>;

    isAdmin(admin: string, overrides?: CallOverrides): Promise<boolean>;

    revokeAdmin(admin: string, overrides?: CallOverrides): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "AdminApproved(address,address)"(
      account?: string | null,
      sender?: string | null
    ): AdminApprovedEventFilter;
    AdminApproved(
      account?: string | null,
      sender?: string | null
    ): AdminApprovedEventFilter;

    "AdminRevoked(address,address)"(
      account?: string | null,
      sender?: string | null
    ): AdminRevokedEventFilter;
    AdminRevoked(
      account?: string | null,
      sender?: string | null
    ): AdminRevokedEventFilter;
  };

  estimateGas: {
    approveAdmin(
      admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAdmins(overrides?: CallOverrides): Promise<BigNumber>;

    isAdmin(admin: string, overrides?: CallOverrides): Promise<BigNumber>;

    revokeAdmin(
      admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    approveAdmin(
      admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAdmins(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isAdmin(
      admin: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    revokeAdmin(
      admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
