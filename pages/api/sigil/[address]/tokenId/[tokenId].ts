import type { NextApiRequest, NextApiResponse } from 'next'
import { getHashesCollectionContract } from '../../../../../util';
import { isValidAddress, hashType } from '../../../../../util/validate';
import Collections from './collections.json';

type TokenResponseData = {
  hash: string
  binary_value: string
  binary_attributes: BinaryAttribute[]
  type: hashType
  phrase_value: string
  phrase_attributes: BinaryAttribute[]
};

type WalletHash = {
  hash_value: string
  type: hashType
  minted_by_address: boolean
  blocks_held: number
  purchased_above_mint_price: boolean | null
  token_id: number
}

type WalletHashResponseData = {
  hashes: WalletHash[]
  on_chain_votes: number
  proposals_created: number
  owns_perm_2_nft: boolean
};

type ProcessedTokenData = {
  hash: string
  phrase_value: string
  binary_value: string
  type: hashType
};

type ProcessedWalletData = {
  dao: number
  non_dao: number
  votes: number
  proposals: number
};

type ResponseMetadata = {
  name: string
  description: string
  image: string
  animation_url: string
  attributes: attribute[]
};

type attribute= {
  trait_type: string
  value: string | number
};

async function getTokenAPIData(tokenId: number) {
  try {

    const apiData = await fetch(`http://permutation-3.vercel.app/api/tokenId/${tokenId}`);

    return await apiData.json();

  } catch (error) {
    console.error(`error calling API for tokenID data: ${error}`);
  }
}

function processTokenAPIData(data: TokenResponseData): ProcessedTokenData {

  const processTokenAPIData: ProcessedTokenData  = ({
    hash : data.hash, 
    phrase_value : data.phrase_value, 
    binary_value : data.binary_value, 
    type : data.type
  })

  return processTokenAPIData;
}

async function getWalletAPIData(address: string) {
  try {

    const APIdata = await fetch(`http://permutation-3.vercel.app/api/wallet/hashes/${address}`);
    
    return await APIdata.json();

  } catch (error) {
    console.error(`error calling API for Wallet data: ${error}`);
  }
}

function processWalletAPIData(data: WalletHashResponseData): ProcessedWalletData {

  const processedWalletData = {} as ProcessedWalletData;

  if (!data) {

    processedWalletData.dao = 0;
    processedWalletData.non_dao = 0;
    processedWalletData.votes = 0;
    processedWalletData.proposals = 0;
  }
  else {

    let dao = 0;
    let non_dao = 0;

    for (let i = 0; i < data.hashes.length; i++) {

      if (data.hashes[i].type === "DAO") {
        dao += 1;
      }
      else {
        non_dao += 1;
      }
    }

    processedWalletData.dao = dao;
    processedWalletData.non_dao = non_dao;
    processedWalletData.votes = data.on_chain_votes;

    processedWalletData.proposals = !data.proposals_created ? 0 : data.proposals_created;
  }

  return processedWalletData;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseMetadata | string>) {

  const { address } = req.query;

  if (typeof(address) !== 'string') {
    res.status(400).send('address must be a string');
    return;
  }

  if (!isValidAddress(address)) {
    res.status(400).send('valid (non-ens) wallet address must be provided');
    return;
  }

  //////////////////////////////////////////
  //Try to fetch collection JSON data here//
  //////////////////////////////////////////

  //This can be deleted if try-fetch collection is built - will be redundant
  if(!Collections.hasOwnProperty(address)) {
    res.status(400).send('sigil collection either does not exist or has not been integrated yet');
    return;
  }

  //So can this probably
  const collectionJSONData = Collections[address as keyof typeof Collections];

  const sigilContract = getHashesCollectionContract(address);

  const { tokenId } = req.query;

  if (isNaN(Number(tokenId))) {
    res.status(400).send('tokenId must be a number');
    return;
  }

  try {
    const getTotalSupply = await sigilContract.totalSupply();
    const rawTotalSupply = getTotalSupply._hex;
    const totalSupply = parseInt(rawTotalSupply, 16);

    if (Number(tokenId) >= totalSupply) {
      res.status(400).send('invalid token Id');
      return;
    }
  } catch (error) {
    console.error(`error fetching total supply: ${error}`);
  }

  try {
    const owner = await sigilContract.ownerOf(Number(tokenId));
    const mintedFilter = sigilContract.filters.Minted();
    const AllGeneratedEvents = await sigilContract.queryFilter(mintedFilter);
    const tokenIdEvent = AllGeneratedEvents.find(event => Number(event?.args?.tokenId) === Number(tokenId));
    const rawHashesTokenId = tokenIdEvent?.args?.hashesTokenId?._hex;
    const hashesTokenId = parseInt(rawHashesTokenId, 16);

    const tokenData = getTokenAPIData(hashesTokenId);
    const walletData = getWalletAPIData(owner);

    const parallelDataFetch = await Promise.all([tokenData, walletData]);

    const processedTokenData = processTokenAPIData(parallelDataFetch[0]);
    const processedWalletData = processWalletAPIData(parallelDataFetch[1]);

    res.status(200).json({
      name: `${collectionJSONData.name} #${tokenId}`,
      description: `${collectionJSONData.description}`,
      image: '',
      animation_url: `https://sigils.com/media/${address}.html?hash==0x123&attributeB=3`, 
      attributes: [
        {
          trait_type: 'Minting Hash Id',
          value: hashesTokenId,
        },
        {
          trait_type: 'Minting Hash',
          value: processedTokenData.hash,
        },
        {
          trait_type: 'Minting Phrase',
          value: processedTokenData.phrase_value,
        },
        {
          trait_type: 'Minting Binary',
          value: processedTokenData.binary_value,
        },
        {
          trait_type: 'Minting Token Type',
          value: processedTokenData.type,
        },
        {
          trait_type: 'DAO Hashes Owned',
          value: processedWalletData.dao,
        },
        {
          trait_type: 'Standard Hashes Owned',
          value: processedWalletData.non_dao,
        },
        {
          trait_type: 'Snapshot Votes',
          value: processedWalletData.votes,
        },
        {
          trait_type: 'Snapshot Proposals',
          value: processedWalletData.proposals,
        }
      ],
    });
  } catch (error) {
    console.error(`error fetching metadata: ${error}`);
  }
}