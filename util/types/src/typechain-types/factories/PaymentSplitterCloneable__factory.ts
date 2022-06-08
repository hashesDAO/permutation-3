/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  PaymentSplitterCloneable,
  PaymentSplitterCloneableInterface,
} from "../PaymentSplitterCloneable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "PayeeAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PaymentReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PaymentReleased",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "payees",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "shares_",
        type: "uint256[]",
      },
    ],
    name: "initializeSplitter",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "payee",
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
    inputs: [
      {
        internalType: "address payable",
        name: "account",
        type: "address",
      },
    ],
    name: "release",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "releaseAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "released",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "shares",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalReleased",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalShares",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611470806100206000396000f3fe60806040526004361061007f5760003560e01c80639852595c1161004e5780639852595c14610153578063c5e4213614610173578063ce7c2ac214610186578063e33b7de3146101a657600080fd5b806319165587146100c45780633a98ef39146100e65780635be7fde8146101115780638b83209b1461012657600080fd5b366100bf577f6ef95f06320e7a25a04a175ca677b7052bdd97131872c2192525a629f51be77033346040516100b59291906110ff565b60405180910390a1005b600080fd5b3480156100d057600080fd5b506100e46100df366004610c6e565b6101bb565b005b3480156100f257600080fd5b506100fb6103ad565b60405161010891906111e8565b60405180910390f35b34801561011d57600080fd5b506100e46103f1565b34801561013257600080fd5b50610146610141366004610d01565b6105ac565b60405161010891906110cf565b34801561015f57600080fd5b506100fb61016e366004610c6e565b610626565b6100e4610181366004610c8f565b61068c565b34801561019257600080fd5b506100fb6101a1366004610c6e565b6107c7565b3480156101b257600080fd5b506100fb61082d565b60005460ff16610200576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f7906111a8565b60405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff811660009081526003602052604090205461025c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f79061114d565b60006002544761026c9190611231565b73ffffffffffffffffffffffffffffffffffffffff831660009081526004602090815260408083205460015460039093529083205493945091926102b0908561125d565b6102ba9190611249565b6102c4919061129a565b9050806102fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f7906111b8565b73ffffffffffffffffffffffffffffffffffffffff831660009081526004602052604090205461032e908290611231565b73ffffffffffffffffffffffffffffffffffffffff8416600090815260046020526040902055600254610362908290611231565b60025561036f8382610871565b7fdf20fd1e76bc69d672e4814fafb2c449bba3a5369d8359adf9e05e6fde87b05683826040516103a09291906110dd565b60405180910390a1505050565b6000805460ff166103ea576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f7906111a8565b5060015490565b60005460ff1661042d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f7906111a8565b60005b6005548110156105a95760006005828154811061044f5761044f6113c2565b600091825260208220015460025473ffffffffffffffffffffffffffffffffffffffff90911692506104819047611231565b73ffffffffffffffffffffffffffffffffffffffff831660009081526004602090815260408083205460015460039093529083205493945091926104c5908561125d565b6104cf9190611249565b6104d9919061129a565b9050806104e857505050610597565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260046020526040902054610519908290611231565b73ffffffffffffffffffffffffffffffffffffffff841660009081526004602052604090205560025461054d908290611231565b60025561055a8382610871565b7fdf20fd1e76bc69d672e4814fafb2c449bba3a5369d8359adf9e05e6fde87b056838260405161058b9291906110dd565b60405180910390a15050505b806105a18161132b565b915050610430565b50565b6000805460ff166105e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f7906111a8565b600582815481106105fc576105fc6113c2565b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b6000805460ff16610663576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f7906111a8565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526004602052604090205490565b60005460ff16156106c9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f7906111c8565b8051825114610704576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f79061111d565b600082511161073f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f790611198565b600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660011781555b82518110156107c2576107b0838281518110610789576107896113c2565b60200260200101518383815181106107a3576107a36113c2565b602002602001015161094e565b806107ba8161132b565b91505061076b565b505050565b6000805460ff16610804576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f7906111a8565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205490565b6000805460ff1661086a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f7906111a8565b5060025490565b804710156108ab576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f79061115d565b60008273ffffffffffffffffffffffffffffffffffffffff16826040516108d1906110c7565b60006040518083038185875af1925050503d806000811461090e576040519150601f19603f3d011682016040523d82523d6000602084013e610913565b606091505b50509050806107c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f79061113d565b60005460ff1661098a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f7906111a8565b73ffffffffffffffffffffffffffffffffffffffff82166109d7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f79061110d565b60008111610a11576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f79061112d565b73ffffffffffffffffffffffffffffffffffffffff821660009081526003602052604090205415610a6e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f7906111d8565b6005805460018082019092557f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8516908117909155600090815260036020526040902082905554610afa908290611231565b6001556040517f40c340f65e17194d14ddddb073d3c9f888e3cb52b5aae0c6c7706b4fbc905fac90610b2f90849084906110ff565b60405180910390a15050565b6000610b4e610b498461120d565b6111f6565b90508083825260208201905082856020860282011115610b7057610b70600080fd5b60005b85811015610b9c5781610b868882610c02565b8452506020928301929190910190600101610b73565b5050509392505050565b6000610bb4610b498461120d565b90508083825260208201905082856020860282011115610bd657610bd6600080fd5b60005b85811015610b9c5781610bec8882610c63565b8452506020928301929190910190600101610bd9565b8035610c0d81611420565b92915050565b600082601f830112610c2757610c27600080fd5b8135610c37848260208601610b3b565b949350505050565b600082601f830112610c5357610c53600080fd5b8135610c37848260208601610ba6565b8035610c0d81611434565b600060208284031215610c8357610c83600080fd5b6000610c378484610c02565b60008060408385031215610ca557610ca5600080fd5b823567ffffffffffffffff811115610cbf57610cbf600080fd5b610ccb85828601610c13565b925050602083013567ffffffffffffffff811115610ceb57610ceb600080fd5b610cf785828601610c3f565b9150509250929050565b600060208284031215610d1657610d16600080fd5b6000610c378484610c63565b610d2b816112cf565b82525050565b610d2b816112b1565b603581526000602082017f5061796d656e7453706c6974746572436c6f6e6561626c653a206163636f756e81527f7420697320746865207a65726f20616464726573730000000000000000000000602082015291505b5060400190565b603b81526000602082017f5061796d656e7453706c6974746572436c6f6e6561626c653a2070617965657381527f20616e6420736861726573206c656e677468206d69736d61746368000000000060208201529150610d90565b602681526000602082017f5061796d656e7453706c6974746572436c6f6e6561626c653a2073686172657381527f206172652030000000000000000000000000000000000000000000000000000060208201529150610d90565b603a81526000602082017f416464726573733a20756e61626c6520746f2073656e642076616c75652c207281527f6563697069656e74206d6179206861766520726576657274656400000000000060208201529150610d90565b602f81526000602082017f5061796d656e7453706c6974746572436c6f6e6561626c653a206163636f756e81527f7420686173206e6f20736861726573000000000000000000000000000000000060208201529150610d90565b602381526000602082017f5061796d656e7453706c6974746572436c6f6e6561626c653a206e6f2070617981527f656573000000000000000000000000000000000000000000000000000000000060208201529150610d90565b603681526000602082017f5061796d656e7453706c6974746572436c6f6e6561626c653a206861736e277481527f206265656e20696e697469616c697a6564207965742e0000000000000000000060208201529150610d90565b603481526000602082017f5061796d656e7453706c6974746572436c6f6e6561626c653a206163636f756e81527f74206973206e6f7420647565207061796d656e7400000000000000000000000060208201529150610d90565b602781526000602082017f5061796d656e7453706c6974746572436c6f6e6561626c653a20616c7265616481527f7920696e69742e0000000000000000000000000000000000000000000000000060208201529150610d90565b603481526000602082017f5061796d656e7453706c6974746572436c6f6e6561626c653a206163636f756e81527f7420616c7265616479206861732073686172657300000000000000000000000060208201529150610d90565b80610d2b565b600081610c0d565b60208101610c0d8284610d31565b604081016110eb8285610d22565b6110f860208301846110c1565b9392505050565b604081016110eb8285610d31565b60208082528101610c0d81610d3a565b60208082528101610c0d81610d97565b60208082528101610c0d81610df1565b60208082528101610c0d81610e4b565b60208082528101610c0d81610ea5565b60208082528101610c0d81601d81527f416464726573733a20696e73756666696369656e742062616c616e6365000000602082015260400190565b60208082528101610c0d81610eff565b60208082528101610c0d81610f59565b60208082528101610c0d81610fb3565b60208082528101610c0d8161100d565b60208082528101610c0d81611067565b60208101610c0d82846110c1565b600061120160405190565b905061062182826112e0565b600067ffffffffffffffff821115611227576112276113f1565b5060209081020190565b6000821982111561124457611244611364565b500190565b60008261125857611258611393565b500490565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561129557611295611364565b500290565b6000828210156112ac576112ac611364565b500390565b600073ffffffffffffffffffffffffffffffffffffffff8216610c0d565b6000610c0d826000610c0d826112b1565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f830116810181811067ffffffffffffffff82111715611324576113246113f1565b6040525050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561135d5761135d611364565b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611429816112b1565b81146105a957600080fd5b8061142956fea26469706673582212208db8f5655906f4883fd309538c3f2648efc6290fe5407f959732291a10d833e164736f6c63430008060033";

type PaymentSplitterCloneableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PaymentSplitterCloneableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PaymentSplitterCloneable__factory extends ContractFactory {
  constructor(...args: PaymentSplitterCloneableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PaymentSplitterCloneable> {
    return super.deploy(overrides || {}) as Promise<PaymentSplitterCloneable>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): PaymentSplitterCloneable {
    return super.attach(address) as PaymentSplitterCloneable;
  }
  connect(signer: Signer): PaymentSplitterCloneable__factory {
    return super.connect(signer) as PaymentSplitterCloneable__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PaymentSplitterCloneableInterface {
    return new utils.Interface(_abi) as PaymentSplitterCloneableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PaymentSplitterCloneable {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as PaymentSplitterCloneable;
  }
}
