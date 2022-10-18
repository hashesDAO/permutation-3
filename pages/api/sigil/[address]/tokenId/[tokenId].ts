import { getHashesCollectionContract, getHashesContract } from '../../../../../util';
import Collections from './collections.json';
import { isValidAddress, hashType } from '../../../../../util/validate';

//http://localhost:3000/api/sigil/{address}/token/{tokenId}
//permutation-3.vercel.app

//To-do:

//Custom functions for each of the returned paramaters so that default/customised can be set where necessary

///////////////
//The Structs//
///////////////

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

/////////////////////////////////
//The Data Collection Functions//
/////////////////////////////////

//Gets the Token Hashes data from pre-existing API
async function getTokenAPIData(tokenId: number) {
  try {
    const APIdata = await fetch(`http://localhost:3000/api/tokenId/${tokenId}`);

    const data = await APIdata.json();

    return data;

  } catch (error) {
    console.error(`error calling API for tokenID data: ${error}`);
  }
}

//Returns processed data for easy use when constucting the NFT
function processTokenAPIData(data: any): ProcessedTokenData {

  const processedTokenData = {} as ProcessedTokenData;

  try {

    processedTokenData.hash = data.hash;

    processedTokenData.phrase_value = data.phrase_value;

    processedTokenData.binary_value = data.binary_value;

    processedTokenData.type = data.type;

  } catch (error) {
    console.error(`error transposing token data: ${error}`);
  }

  return processedTokenData;
}

//Gets the Wallet Hashes data from pre-existing API
async function getWalletAPIData(address: string) {
  try {

    const APIdata = await fetch(`http://localhost:3000/api/wallet/hashes/${address}`);

    const data = await APIdata.json();

    return data;

  } catch (error) {
    console.error(`error calling API for Wallet data: ${error}`);
  }
}

//Returns processed data for easy use when constucting the NFT
function processWalletAPIData(data: any): ProcessedWalletData {

  const processedWalletData = {} as ProcessedWalletData;

  try {
    //WalletData will return an undefined if the owner does not own any Hashes NFTs
    if (data === undefined) {

      processedWalletData.dao = 0;
      processedWalletData.non_dao = 0;
      processedWalletData.votes = 0;
      processedWalletData.proposals = 0;
    }
    else {

      var dao = 0;
      var non_dao = 0;

      for (let i = 0; i < data.hashes.length; i++) {

        //Adds entry to either DAO or non-DAO increment
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

      if (data.proposals_created === undefined) {
        processedWalletData.proposals = 0;
      } else {
        processedWalletData.proposals = data.proposals_created;
      }
    }
  } catch (error) {
    console.error(`error transposing wallet data: ${error}`);
  }

  return processedWalletData;
}

//////////////////////////////////////////////
//Helper Functions For Each Sigil Collection//
//////////////////////////////////////////////

///////////
//The API//
///////////

//Returns the json metadata in the Opensea format
export default async function handler(req: any, res: any) {

    //Sigil Collection Address
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

    //Conforms the address into a hashes collection format
    const sigilContract = getHashesCollectionContract(address);

    //Sigil Token Id given the collection address
    const { tokenId } = req.query;
  
    if (isNaN(Number(tokenId))) {
      res.status(400).send('tokenId must be a number');
      return;
    }

    //Gets the supply of the collection
    const getTotalSupply = await sigilContract.totalSupply();
    const rawTotalSupply = getTotalSupply._hex;
    const totalSupply = parseInt(rawTotalSupply, 16);

    if (tokenId >= totalSupply) {
      res.status(400).send('invalid token Id');
      return;
    }

    //Gets the address of the owner of the sigil (tokenId)
    const owner = await sigilContract.ownerOf(tokenId);

    //Gets the hashes Id that originally minted the Sigil NFT
    //Defines the event
    const mintedFilter = sigilContract.filters.Minted();
    //Gets all the events
    const AllGeneratedEvents = await sigilContract.queryFilter(mintedFilter);
    //Finds the event where the sigil token Id matches the query
    const tokenIdEvent = AllGeneratedEvents.find(event => Number(event?.args?.tokenId) === Number(tokenId));
    //Gets the raw data (in hexadecimal)
    const rawHashesTokenId = tokenIdEvent?.args?.hashesTokenId?._hex;
    //Converts to base 10
    const hashesTokenId = parseInt(rawHashesTokenId, 16);

    //Parallelised the rest of the data fetching
    //Gets the relevant token data from pre-existing API
    const tokenData = getTokenAPIData(hashesTokenId);
    //Gets the relevant wallet data from pre-existing API
    const walletData = getWalletAPIData(owner);

    //Fetchs at once
    const parallelDataFetch = await Promise.all([tokenData, walletData]);

    //Processes the revelant token (i.e. hashes NFT used to mint) data for easy use
    const processedTokenData = processTokenAPIData(parallelDataFetch[0]);
    //Processes the revelant owner data for easy use
    const processedWalletData = processWalletAPIData(parallelDataFetch[1]);

    //Returns NFT data in Opensea format
    res.status(200).json({
      name: `${collectionJSONData.name} #${tokenId}`,
      description: `${collectionJSONData.description}`,
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
  }