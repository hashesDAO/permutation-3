/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC721, ERC721Interface } from "../ERC721";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001e0538038062001e05833981016040819052620000349162000187565b81516200004990600090602085019062000068565b5080516200005f90600190602084019062000068565b5050506200030c565b828054620000769062000280565b90600052602060002090601f0160209004810192826200009a5760008555620000e5565b82601f10620000b557805160ff1916838001178555620000e5565b82800160010185558215620000e5579182015b82811115620000e5578251825591602001919060010190620000c8565b50620000f3929150620000f7565b5090565b5b80821115620000f35760008155600101620000f8565b6000620001256200011f8462000220565b62000201565b905082815260208101848484011115620001425762000142600080fd5b6200014f8482856200024d565b509392505050565b600082601f8301126200016d576200016d600080fd5b81516200017f8482602086016200010e565b949350505050565b600080604083850312156200019f576200019f600080fd5b82516001600160401b03811115620001ba57620001ba600080fd5b620001c88582860162000157565b92505060208301516001600160401b03811115620001e957620001e9600080fd5b620001f78582860162000157565b9150509250929050565b60006200020d60405190565b90506200021b8282620002b1565b919050565b60006001600160401b038211156200023c576200023c620002f6565b601f19601f83011660200192915050565b60005b838110156200026a57818101518382015260200162000250565b838111156200027a576000848401525b50505050565b6002810460018216806200029557607f821691505b60208210811415620002ab57620002ab620002e0565b50919050565b601f19601f83011681018181106001600160401b0382111715620002d957620002d9620002f6565b6040525050565b634e487b7160e01b600052602260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b611ae9806200031c6000396000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101b8578063b88d4fde146101cb578063c87b56dd146101de578063e985e9c5146101f157600080fd5b80636352211e1461017d57806370a082311461019057806395d89b41146101b057600080fd5b8063095ea7b3116100bd578063095ea7b31461014257806323b872dd1461015757806342842e0e1461016a57600080fd5b806301ffc9a7146100e457806306fdde031461010d578063081812fc14610122575b600080fd5b6100f76100f2366004611163565b61023a565b60405161010491906116a0565b60405180910390f35b61011561031f565b60405161010491906116ae565b6101356101303660046111a5565b6103b1565b604051610104919061164e565b610155610150366004611130565b61043e565b005b61015561016536600461102e565b61054a565b61015561017836600461102e565b610595565b61013561018b3660046111a5565b6105b0565b6101a361019e366004610fd0565b61060c565b60405161010491906117aa565b610115610684565b6101556101c63660046110fd565b610693565b6101556101d936600461107e565b61077d565b6101156101ec3660046111a5565b6107cf565b6100f76101ff366004610ff1565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260056020908152604080832093909416825291909152205460ff1690565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd0000000000000000000000000000000000000000000000000000000014806102cd57507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b8061031957507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b60606000805461032e906118b6565b80601f016020809104026020016040519081016040528092919081815260200182805461035a906118b6565b80156103a75780601f1061037c576101008083540402835291602001916103a7565b820191906000526020600020905b81548152906001019060200180831161038a57829003601f168201915b5050505050905090565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff16610415576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040c9061175a565b60405180910390fd5b5060009081526004602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b6000610449826105b0565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156104b1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040c9061178a565b3373ffffffffffffffffffffffffffffffffffffffff82161480610505575073ffffffffffffffffffffffffffffffffffffffff8116600090815260056020908152604080832033845290915290205460ff165b61053b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040c9061172a565b6105458383610896565b505050565b6105543382610936565b61058a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040c9061179a565b610545838383610a50565b6105458383836040518060200160405280600081525061077d565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff1680610319576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040c9061174a565b600073ffffffffffffffffffffffffffffffffffffffff821661065b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040c9061173a565b5073ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205490565b60606001805461032e906118b6565b73ffffffffffffffffffffffffffffffffffffffff82163314156106e3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040c906116df565b33600081815260056020908152604080832073ffffffffffffffffffffffffffffffffffffffff871680855292529182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001685151517905590519091907f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31906107719085906116a0565b60405180910390a35050565b6107873383610936565b6107bd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040c9061179a565b6107c984848484610c0c565b50505050565b60008181526002602052604090205460609073ffffffffffffffffffffffffffffffffffffffff1661082d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040c9061177a565b600061084460408051602081019091526000815290565b90506000815111610864576040518060200160405280600081525061088f565b8061086e84610c59565b60405160200161087f929190611636565b6040516020818303038152906040525b9392505050565b600081815260046020526040902080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff841690811790915581906108f0826105b0565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60008181526002602052604081205473ffffffffffffffffffffffffffffffffffffffff16610991576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040c9061171a565b600061099c836105b0565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610a0b57508373ffffffffffffffffffffffffffffffffffffffff166109f3846103b1565b73ffffffffffffffffffffffffffffffffffffffff16145b80610a48575073ffffffffffffffffffffffffffffffffffffffff80821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b8273ffffffffffffffffffffffffffffffffffffffff16610a70826105b0565b73ffffffffffffffffffffffffffffffffffffffff1614610abd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040c9061176a565b73ffffffffffffffffffffffffffffffffffffffff8216610b0a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040c906116cf565b610b15600082610896565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600360205260408120805460019290610b4b908490611849565b909155505073ffffffffffffffffffffffffffffffffffffffff82166000908152600360205260408120805460019290610b8690849061181d565b909155505060008181526002602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff86811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b610c17848484610a50565b610c2384848484610d8b565b6107c9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040c906116bf565b606081610c9957505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b8115610cc35780610cad8161192e565b9150610cbc9050600a83611835565b9150610c9d565b60008167ffffffffffffffff811115610cde57610cde611a37565b6040519080825280601f01601f191660200182016040528015610d08576020820181803683370190505b5090505b8415610a4857610d1d600183611849565b9150610d2a600a86611967565b610d3590603061181d565b60f81b818381518110610d4a57610d4a611a08565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350610d84600a86611835565b9450610d0c565b600073ffffffffffffffffffffffffffffffffffffffff84163b15610f29576040517f150b7a0200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290610e0290339089908890889060040161165c565b602060405180830381600087803b158015610e1c57600080fd5b505af1925050508015610e6a575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252610e6791810190611184565b60015b610ede573d808015610e98576040519150601f19603f3d011682016040523d82523d6000602084013e610e9d565b606091505b508051610ed6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040c906116bf565b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050610a48565b506001949350505050565b6000610f47610f42846117d4565b6117b8565b905082815260208101848484011115610f6257610f62600080fd5b610f6d84828561187e565b509392505050565b803561031981611a66565b803561031981611a7d565b803561031981611a85565b805161031981611a85565b600082601f830112610fb557610fb5600080fd5b8135610a48848260208601610f34565b803561031981611aad565b600060208284031215610fe557610fe5600080fd5b6000610a488484610f75565b6000806040838503121561100757611007600080fd5b60006110138585610f75565b925050602061102485828601610f75565b9150509250929050565b60008060006060848603121561104657611046600080fd5b60006110528686610f75565b935050602061106386828701610f75565b925050604061107486828701610fc5565b9150509250925092565b6000806000806080858703121561109757611097600080fd5b60006110a38787610f75565b94505060206110b487828801610f75565b93505060406110c587828801610fc5565b925050606085013567ffffffffffffffff8111156110e5576110e5600080fd5b6110f187828801610fa1565b91505092959194509250565b6000806040838503121561111357611113600080fd5b600061111f8585610f75565b925050602061102485828601610f80565b6000806040838503121561114657611146600080fd5b60006111528585610f75565b925050602061102485828601610fc5565b60006020828403121561117857611178600080fd5b6000610a488484610f8b565b60006020828403121561119957611199600080fd5b6000610a488484610f96565b6000602082840312156111ba576111ba600080fd5b6000610a488484610fc5565b6111cf81611860565b82525050565b8015156111cf565b60006111e7825190565b8084526020840193506111fe81856020860161188a565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920192915050565b6000611237825190565b61124581856020860161188a565b9290920192915050565b603281526000602082017f4552433732313a207472616e7366657220746f206e6f6e20455243373231526581527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015291505b5060400190565b602481526000602082017f4552433732313a207472616e7366657220746f20746865207a65726f2061646481527f7265737300000000000000000000000000000000000000000000000000000000602082015291506112a5565b602c81526000602082017f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657881527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015291506112a5565b603881526000602082017f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7781527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000602082015291506112a5565b602a81526000602082017f4552433732313a2062616c616e636520717565727920666f7220746865207a6581527f726f206164647265737300000000000000000000000000000000000000000000602082015291506112a5565b602981526000602082017f4552433732313a206f776e657220717565727920666f72206e6f6e657869737481527f656e7420746f6b656e0000000000000000000000000000000000000000000000602082015291506112a5565b602c81526000602082017f4552433732313a20617070726f76656420717565727920666f72206e6f6e657881527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015291506112a5565b602981526000602082017f4552433732313a207472616e73666572206f6620746f6b656e2074686174206981527f73206e6f74206f776e0000000000000000000000000000000000000000000000602082015291506112a5565b602f81526000602082017f4552433732314d657461646174613a2055524920717565727920666f72206e6f81527f6e6578697374656e7420746f6b656e0000000000000000000000000000000000602082015291506112a5565b602181526000602082017f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6581527f7200000000000000000000000000000000000000000000000000000000000000602082015291506112a5565b603181526000602082017f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f81527f776e6572206e6f7220617070726f766564000000000000000000000000000000602082015291506112a5565b806111cf565b6000611642828561122d565b9150610a48828461122d565b6020810161031982846111c6565b6080810161166a82876111c6565b61167760208301866111c6565b6116846040830185611630565b818103606083015261169681846111dd565b9695505050505050565b6020810161031982846111d5565b6020808252810161088f81846111dd565b602080825281016103198161124f565b60208082528101610319816112ac565b6020808252810161031981601981527f4552433732313a20617070726f766520746f2063616c6c657200000000000000602082015260400190565b6020808252810161031981611306565b6020808252810161031981611360565b60208082528101610319816113ba565b6020808252810161031981611414565b602080825281016103198161146e565b60208082528101610319816114c8565b6020808252810161031981611522565b602080825281016103198161157c565b60208082528101610319816115d6565b602081016103198284611630565b60006117c360405190565b90506117cf82826118e3565b919050565b600067ffffffffffffffff8211156117ee576117ee611a37565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011660200192915050565b600082198211156118305761183061197b565b500190565b600082611844576118446119aa565b500490565b60008282101561185b5761185b61197b565b500390565b600073ffffffffffffffffffffffffffffffffffffffff8216610319565b82818337506000910152565b60005b838110156118a557818101518382015260200161188d565b838111156107c95750506000910152565b6002810460018216806118ca57607f821691505b602082108114156118dd576118dd6119d9565b50919050565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f830116810181811067ffffffffffffffff8211171561192757611927611a37565b6040525050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156119605761196061197b565b5060010190565b600082611976576119766119aa565b500690565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611a6f81611860565b8114611a7a57600080fd5b50565b801515611a6f565b7fffffffff000000000000000000000000000000000000000000000000000000008116611a6f565b80611a6f56fea2646970667358221220a5cec6a1f1cff54e2714f4cafe2d60cb3aa5d0f4e0b58b415c33c8d60e222ddd64736f6c63430008060033";

type ERC721ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721__factory extends ContractFactory {
  constructor(...args: ERC721ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC721> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<ERC721>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  attach(address: string): ERC721 {
    return super.attach(address) as ERC721;
  }
  connect(signer: Signer): ERC721__factory {
    return super.connect(signer) as ERC721__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721Interface {
    return new utils.Interface(_abi) as ERC721Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC721 {
    return new Contract(address, _abi, signerOrProvider) as ERC721;
  }
}
