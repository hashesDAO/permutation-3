import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers';
import {
  hex2bin,
  getHashesContract,
  getHashesCollectionContract
} from '../../../util';
import {
  getHashesCount,
  getHashType,
  hashType,
  isValidAddress
} from '../../../util/validate';
import { 
  HASH_ATTRIBUTES 
} from '../../../util/hash_attributes';
import * as swearjar from 'swearjar';
import Addresses from '../../../addresses.json';

//http://localhost:3000/api/sigil

//Data I need for the first sigil collection:
//Sigil Id as input - got
//Owner of sigil Id - got
//Hashes Id that minted - got
//Number of DAO hashes owned
//Number of non-DAO hashes owned
//Hashes phrase text - got
//Hashes hash binary - got
//Random number for colour palette (7 permutations) (can be the hashes hash as the seed maybe?) - got
//Random font (14 permutations) - got

//Gets the Token Hashes data from pre-existing API
async function getTokenAPIData(tokenId: number) {
  try {
    const APIdata = await fetch(`https://permutation-3.vercel.app/api/tokenId/${tokenId}`)

    const data = await APIdata.json()

    return data

  } catch (error) {
    console.error(`error calling API for data: ${error}`);
  }
}

//Gets the Wallet Hashes data from pre-existing API
async function getWalletAPIData(address: string) {
  try {
    const APIdata = await fetch(`https://permutation-3.vercel.app/api/wallet/hashes/${address}`)

    const data = await APIdata.json()

    return data

  } catch (error) {
    console.error(`error calling API for data: ${error}`);
  }
}

//Returns the SVG image for the NFT
function getSigilBase64EncodedSVG(tokenId: number): string {
  const svgHTML = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><defs><filter id="f1" x="0" y="0" height="100%" width="100%"><feGaussianBlur in="SourceGraphic" stdDeviation="8" /></filter></defs><style>.base { fill: cornsilk; font-family: courier; font-size: 8px; }</style><rect width="100%" height="100%" fill="crimson" /><text x="10" y="20" class="base">${tokenId}</text></svg>`;
  return Buffer.from(svgHTML).toString('base64');
}

//Sigil V0 Collection token Id as input
//Parses data through a relatively simple SVG image code
//Returns the json metadata in the Opensea format
export default async function handler(req: any, res: any) {

  //Sigil Token Id
  const { tokenId } = req.query;

  //Must be a number
  if (isNaN(Number(tokenId))) {
    res.status(400).send('tokenId must be a number');
    return;
  }

  //Sigils collection address
  const sigilV0Contract = getHashesCollectionContract(Addresses.sigilV0CollectionAddress_currentlyMedleyLimited);

  //Gets the address of the owner of the sigil (tokenId)
  const owner = await sigilV0Contract.ownerOf(tokenId);

  //Gets the hashes Id that originally minted the Sigil NFT
  //Defines the event
  const mintedFilter = sigilV0Contract.filters.Minted();
  //Gets all the events
  const AllGeneratedEvents = await sigilV0Contract.queryFilter(mintedFilter);
  //Finds the event where the sigil token Id matches the query
  const tokenIdEvent = AllGeneratedEvents.find(event => Number(event?.args?.tokenId) === Number(tokenId));
  //Gets the raw data (in hexadecimal)
  const rawHashesTokenId = tokenIdEvent?.args?.hashesTokenId?._hex;
  //Converts to base 10
  const hashesTokenId = parseInt(rawHashesTokenId, 16);

  //Gets the relevent token data from pre-existing API
  const tokenData = await getTokenAPIData(hashesTokenId);

  //Gets the relevent token data from pre-existing API
  const walletData = await getWalletAPIData(owner);

  console.log(walletData);
  
    

  

  //test response
  res.status(200).json({
    name: `Test ID #${tokenId}`,
    description: 'TODO',
    image: `data:image/svg+xml;base64,${getSigilBase64EncodedSVG(tokenId)}`,
    attributes: [
        {
            trait_type: 'Trait One',
            value: 1,
        },
    ],
  });
}