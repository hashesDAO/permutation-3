/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  CollectionPaymentSplitterCloneable,
  CollectionPaymentSplitterCloneableInterface,
} from "../CollectionPaymentSplitterCloneable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "payees",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "shares",
        type: "uint256[]",
      },
    ],
    name: "CollectionPaymentSplitterInitialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
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
        internalType: "contract IHashes",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "_createCollectionCaller",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_initializationData",
        type: "bytes",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOwner",
        type: "address",
      },
    ],
    name: "initializeOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
    inputs: [],
    name: "owner",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ICollectionNFTCloneableV1",
        name: "collection",
        type: "address",
      },
      {
        internalType: "string",
        name: "_baseTokenURI",
        type: "string",
      },
    ],
    name: "setBaseTokenURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ICollectionNFTCloneableV1",
        name: "collection",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "_royaltyBps",
        type: "uint16",
      },
    ],
    name: "setRoyaltyBps",
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
    inputs: [
      {
        internalType: "contract ICollectionNFTCloneableV1",
        name: "collection",
        type: "address",
      },
      {
        internalType: "address",
        name: "_creatorAddress",
        type: "address",
      },
    ],
    name: "transferCreator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_settings",
        type: "bytes",
      },
    ],
    name: "verifyEcosystemSettings",
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
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50612535806100206000396000f3fe6080604052600436106101125760003560e01c80638da5cb5b116100a5578063d8a73fdb11610074578063e33b7de311610059578063e33b7de314610310578063f2fde38b14610325578063f82e9b9d1461034557600080fd5b8063d8a73fdb146102d0578063ded9ff2c146102f057600080fd5b80638da5cb5b146102685780639852595c1461027d578063c5e421361461029d578063ce7c2ac2146102b057600080fd5b80635be7fde8116100e15780635be7fde8146101f15780635cd9205f14610206578063715018a6146102265780638b83209b1461023b57600080fd5b806304eff22f14610157578063191655871461018d578063246581f7146101af5780633a98ef39146101cf57600080fd5b36610152577f6ef95f06320e7a25a04a175ca677b7052bdd97131872c2192525a629f51be7703334604051610148929190612075565b60405180910390a1005b600080fd5b34801561016357600080fd5b506101776101723660046117e4565b511590565b60405161018491906120a8565b60405180910390f35b34801561019957600080fd5b506101ad6101a83660046116e9565b610365565b005b3480156101bb57600080fd5b506101ad6101ca3660046118d3565b610557565b3480156101db57600080fd5b506101e461065d565b6040516101849190612210565b3480156101fd57600080fd5b506101ad6106a1565b34801561021257600080fd5b506101ad6102213660046116e9565b61085c565b34801561023257600080fd5b506101ad6108cd565b34801561024757600080fd5b5061025b610256366004611952565b61096b565b6040516101849190612045565b34801561027457600080fd5b5061025b6109e5565b34801561028957600080fd5b506101e46102983660046116e9565b610a46565b6101ad6102ab36600461170a565b610aac565b3480156102bc57600080fd5b506101e46102cb3660046116e9565b610be7565b3480156102dc57600080fd5b506101ad6102eb366004611852565b610c4d565b3480156102fc57600080fd5b506101ad61030b3660046118a0565b610d80565b34801561031c57600080fd5b506101e4610e7d565b34801561033157600080fd5b506101ad6103403660046116e9565b610ec1565b34801561035157600080fd5b506101ad61036036600461181f565b610fa9565b60005460ff166103aa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906121c2565b60405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8116600090815260036020526040902054610406576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a190612157565b60006002544761041691906122a2565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260046020908152604080832054600154600390935290832054939450919261045a90856122ce565b61046491906122ba565b61046e919061230b565b9050806104a7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906121d2565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600460205260409020546104d89082906122a2565b73ffffffffffffffffffffffffffffffffffffffff841660009081526004602052604090205560025461050c9082906122a2565b60025561051983826110a6565b7fdf20fd1e76bc69d672e4814fafb2c449bba3a5369d8359adf9e05e6fde87b056838260405161054a929190612053565b60405180910390a1505050565b6006547501000000000000000000000000000000000000000000900460ff16156105ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906120f7565b6105b68261085c565b600080828060200190518101906105cd919061177c565b915091506105db8282610aac565b600680547fffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffffff1675010000000000000000000000000000000000000000001790556040517f18595aba6884b4be58f48bf51f31d765bd5c5984b6504f8d1a98e671960f00159061064d9084908490612083565b60405180910390a1505050505050565b6000805460ff1661069a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906121c2565b5060015490565b60005460ff166106dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906121c2565b60005b600554811015610859576000600582815481106106ff576106ff612474565b600091825260208220015460025473ffffffffffffffffffffffffffffffffffffffff909116925061073190476122a2565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260046020908152604080832054600154600390935290832054939450919261077590856122ce565b61077f91906122ba565b610789919061230b565b90508061079857505050610847565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600460205260409020546107c99082906122a2565b73ffffffffffffffffffffffffffffffffffffffff84166000908152600460205260409020556002546107fd9082906122a2565b60025561080a83826110a6565b7fdf20fd1e76bc69d672e4814fafb2c449bba3a5369d8359adf9e05e6fde87b056838260405161083b929190612053565b60405180910390a15050505b80610851816123dd565b9150506106e0565b50565b60065460ff1615610899576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906121b2565b600680547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905561085981611183565b60065460ff16610909576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906120c7565b336109126109e5565b73ffffffffffffffffffffffffffffffffffffffff161461095f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906120e7565b6109696000611183565b565b6000805460ff166109a8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906121c2565b600582815481106109bb576109bb612474565b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b60065460009060ff16610a24576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906120c7565b50600654610100900473ffffffffffffffffffffffffffffffffffffffff1690565b6000805460ff16610a83576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906121c2565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526004602052604090205490565b60005460ff1615610ae9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906121e2565b8051825114610b24576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a190612117565b6000825111610b5f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906121a2565b600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660011781555b8251811015610be257610bd0838281518110610ba957610ba9612474565b6020026020010151838381518110610bc357610bc3612474565b602002602001015161123d565b80610bda816123dd565b915050610b8b565b505050565b6000805460ff16610c24576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906121c2565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205490565b6006547501000000000000000000000000000000000000000000900460ff16610ca2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906120d7565b33610cab6109e5565b73ffffffffffffffffffffffffffffffffffffffff1614610cf8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906120e7565b6040517f30176e1300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8316906330176e1390610d4a9084906004016120b6565b600060405180830381600087803b158015610d6457600080fd5b505af1158015610d78573d6000803e3d6000fd5b505050505050565b6006547501000000000000000000000000000000000000000000900460ff16610dd5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906120d7565b33610dde6109e5565b73ffffffffffffffffffffffffffffffffffffffff1614610e2b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906120e7565b6040517faa24c21100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff83169063aa24c21190610d4a908490600401612202565b6000805460ff16610eba576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906121c2565b5060025490565b60065460ff16610efd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906120c7565b33610f066109e5565b73ffffffffffffffffffffffffffffffffffffffff1614610f53576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906120e7565b73ffffffffffffffffffffffffffffffffffffffff8116610fa0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a190612137565b61085981611183565b6006547501000000000000000000000000000000000000000000900460ff16610ffe576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906120d7565b336110076109e5565b73ffffffffffffffffffffffffffffffffffffffff1614611054576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906120e7565b6040517ffa3fa19600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff83169063fa3fa19690610d4a908490600401612045565b804710156110e0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a190612167565b60008273ffffffffffffffffffffffffffffffffffffffff16826040516111069061203d565b60006040518083038185875af1925050503d8060008114611143576040519150601f19603f3d011682016040523d82523d6000602084013e611148565b606091505b5050905080610be2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a190612147565b60065460ff166111bf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906120c7565b6006805473ffffffffffffffffffffffffffffffffffffffff8381166101008181027fffffffffffffffffffffff0000000000000000000000000000000000000000ff85161790945560405193909204169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60005460ff16611279576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906121c2565b73ffffffffffffffffffffffffffffffffffffffff82166112c6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a190612107565b60008111611300576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a190612127565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600360205260409020541561135d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a1906121f2565b6005805460018082019092557f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff85169081179091556000908152600360205260409020829055546113e99082906122a2565b6001556040517f40c340f65e17194d14ddddb073d3c9f888e3cb52b5aae0c6c7706b4fbc905fac9061141e9084908490612075565b60405180910390a15050565b600061143d61143884612235565b61221e565b9050808382526020820190508285602086028201111561145f5761145f600080fd5b60005b8581101561148b578161147588826115e5565b8452506020928301929190910190600101611462565b5050509392505050565b60006114a361143884612235565b905080838252602082019050828560208602820111156114c5576114c5600080fd5b60005b8581101561148b57816114db88826115f6565b84525060209283019291909101906001016114c8565b60006114ff61143884612235565b9050808382526020820190508285602086028201111561152157611521600080fd5b60005b8581101561148b578161153788826116d3565b8452506020928301929190910190600101611524565b600061155b61143884612235565b9050808382526020820190508285602086028201111561157d5761157d600080fd5b60005b8581101561148b578161159388826116de565b8452506020928301929190910190600101611580565b60006115b761143884612259565b9050828152602081018484840111156115d2576115d2600080fd5b6115dd848285612356565b509392505050565b80356115f0816124d2565b92915050565b80516115f0816124d2565b600082601f83011261161557611615600080fd5b813561162584826020860161142a565b949350505050565b600082601f83011261164157611641600080fd5b8151611625848260208601611495565b600082601f83011261166557611665600080fd5b81356116258482602086016114f1565b600082601f83011261168957611689600080fd5b815161162584826020860161154d565b600082601f8301126116ad576116ad600080fd5b81356116258482602086016115a9565b80356115f0816124e6565b80356115f0816124ef565b80356115f0816124f9565b80516115f0816124f9565b6000602082840312156116fe576116fe600080fd5b600061162584846115e5565b6000806040838503121561172057611720600080fd5b823567ffffffffffffffff81111561173a5761173a600080fd5b61174685828601611601565b925050602083013567ffffffffffffffff81111561176657611766600080fd5b61177285828601611651565b9150509250929050565b6000806040838503121561179257611792600080fd5b825167ffffffffffffffff8111156117ac576117ac600080fd5b6117b88582860161162d565b925050602083015167ffffffffffffffff8111156117d8576117d8600080fd5b61177285828601611675565b6000602082840312156117f9576117f9600080fd5b813567ffffffffffffffff81111561181357611813600080fd5b61162584828501611699565b6000806040838503121561183557611835600080fd5b600061184185856116bd565b9250506020611772858286016115e5565b6000806040838503121561186857611868600080fd5b600061187485856116bd565b925050602083013567ffffffffffffffff81111561189457611894600080fd5b61177285828601611699565b600080604083850312156118b6576118b6600080fd5b60006118c285856116bd565b9250506020611772858286016116c8565b600080600080608085870312156118ec576118ec600080fd5b60006118f887876116bd565b9450506020611909878288016115e5565b935050604061191a878288016115e5565b925050606085013567ffffffffffffffff81111561193a5761193a600080fd5b61194687828801611699565b91505092959194509250565b60006020828403121561196757611967600080fd5b600061162584846116d3565b600061197f83836119a2565b505060200190565b600061197f8383612037565b61199c8161234b565b82525050565b61199c81612322565b60006119b5825190565b80845260209384019383018060005b838110156119e95781516119d88882611973565b9750602083019250506001016119c4565b509495945050505050565b60006119fe825190565b80845260209384019383018060005b838110156119e9578151611a218882611987565b975060208301925050600101611a0d565b80151561199c565b6000611a44825190565b808452602084019350611a5b818560208601612362565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920192915050565b602e81526000602082017f4f776e61626c65436c6f6e6561626c653a206861736e2774206265656e20696e81527f697469616c697a6564207965742e000000000000000000000000000000000000602082015291505b5060400190565b604081526000602082017f436f6c6c656374696f6e5061796d656e7453706c6974746572436c6f6e65616281527f6c653a206861736e2774206265656e20696e697469616c697a6564207965742e60208201529150611ae0565b602981526000602082017f4f776e61626c65436c6f6e6561626c653a2063616c6c6572206973206e6f742081527f746865206f776e6572000000000000000000000000000000000000000000000060208201529150611ae0565b602f81526000602082017f436f6c6c656374696f6e5061796d656e7453706c69747465723a20616c72656181527f647920696e697469616c697a65642e000000000000000000000000000000000060208201529150611ae0565b603581526000602082017f5061796d656e7453706c6974746572436c6f6e6561626c653a206163636f756e81527f7420697320746865207a65726f2061646472657373000000000000000000000060208201529150611ae0565b603b81526000602082017f5061796d656e7453706c6974746572436c6f6e6561626c653a2070617965657381527f20616e6420736861726573206c656e677468206d69736d61746368000000000060208201529150611ae0565b602681526000602082017f5061796d656e7453706c6974746572436c6f6e6561626c653a2073686172657381527f206172652030000000000000000000000000000000000000000000000000000060208201529150611ae0565b602f81526000602082017f4f776e61626c65436c6f6e6561626c653a206e6577206f776e6572206973207481527f6865207a65726f2061646472657373000000000000000000000000000000000060208201529150611ae0565b603a81526000602082017f416464726573733a20756e61626c6520746f2073656e642076616c75652c207281527f6563697069656e74206d6179206861766520726576657274656400000000000060208201529150611ae0565b602f81526000602082017f5061796d656e7453706c6974746572436c6f6e6561626c653a206163636f756e81527f7420686173206e6f20736861726573000000000000000000000000000000000060208201529150611ae0565b602381526000602082017f5061796d656e7453706c6974746572436c6f6e6561626c653a206e6f2070617981527f656573000000000000000000000000000000000000000000000000000000000060208201529150611ae0565b602681526000602082017f4f776e61626c65436c6f6e6561626c653a20616c726561647920696e6974696181527f6c697a65642e000000000000000000000000000000000000000000000000000060208201529150611ae0565b603681526000602082017f5061796d656e7453706c6974746572436c6f6e6561626c653a206861736e277481527f206265656e20696e697469616c697a6564207965742e0000000000000000000060208201529150611ae0565b603481526000602082017f5061796d656e7453706c6974746572436c6f6e6561626c653a206163636f756e81527f74206973206e6f7420647565207061796d656e7400000000000000000000000060208201529150611ae0565b602781526000602082017f5061796d656e7453706c6974746572436c6f6e6561626c653a20616c7265616481527f7920696e69742e0000000000000000000000000000000000000000000000000060208201529150611ae0565b603481526000602082017f5061796d656e7453706c6974746572436c6f6e6561626c653a206163636f756e81527f7420616c7265616479206861732073686172657300000000000000000000000060208201529150611ae0565b61ffff811661199c565b8061199c565b6000816115f0565b602081016115f082846119a2565b604081016120618285611993565b61206e6020830184612037565b9392505050565b6040810161206182856119a2565b6040808252810161209481856119ab565b9050818103602083015261162581846119f4565b602081016115f08284611a32565b6020808252810161206e8184611a3a565b602080825281016115f081611a8a565b602080825281016115f081611ae7565b602080825281016115f081611b41565b602080825281016115f081611b9b565b602080825281016115f081611bf5565b602080825281016115f081611c4f565b602080825281016115f081611ca9565b602080825281016115f081611d03565b602080825281016115f081611d5d565b602080825281016115f081611db7565b602080825281016115f081601d81527f416464726573733a20696e73756666696369656e742062616c616e6365000000602082015260400190565b602080825281016115f081611e11565b602080825281016115f081611e6b565b602080825281016115f081611ec5565b602080825281016115f081611f1f565b602080825281016115f081611f79565b602080825281016115f081611fd3565b602081016115f0828461202d565b602081016115f08284612037565b600061222960405190565b90506109e08282612392565b600067ffffffffffffffff82111561224f5761224f6124a3565b5060209081020190565b600067ffffffffffffffff821115612273576122736124a3565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011660200192915050565b600082198211156122b5576122b5612416565b500190565b6000826122c9576122c9612445565b500490565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561230657612306612416565b500290565b60008282101561231d5761231d612416565b500390565b600073ffffffffffffffffffffffffffffffffffffffff82166115f0565b60006115f082612322565b60006115f082612340565b82818337506000910152565b60005b8381101561237d578181015183820152602001612365565b8381111561238c576000848401525b50505050565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f830116810181811067ffffffffffffffff821117156123d6576123d66124a3565b6040525050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561240f5761240f612416565b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6124db81612322565b811461085957600080fd5b6124db81612340565b61ffff81166124db565b806124db56fea2646970667358221220d6f9cbf57b3627e4ce7a4e9792bfb42e0d5dabfca48d90b16033990105ea64b964736f6c63430008060033";

type CollectionPaymentSplitterCloneableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CollectionPaymentSplitterCloneableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CollectionPaymentSplitterCloneable__factory extends ContractFactory {
  constructor(...args: CollectionPaymentSplitterCloneableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CollectionPaymentSplitterCloneable> {
    return super.deploy(
      overrides || {}
    ) as Promise<CollectionPaymentSplitterCloneable>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): CollectionPaymentSplitterCloneable {
    return super.attach(address) as CollectionPaymentSplitterCloneable;
  }
  connect(signer: Signer): CollectionPaymentSplitterCloneable__factory {
    return super.connect(signer) as CollectionPaymentSplitterCloneable__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CollectionPaymentSplitterCloneableInterface {
    return new utils.Interface(
      _abi
    ) as CollectionPaymentSplitterCloneableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CollectionPaymentSplitterCloneable {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as CollectionPaymentSplitterCloneable;
  }
}