import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers';
import HASHES_ABI from '../../../util/Hashes.json';
import { HASH_ATTRIBUTES } from '../../../util/hash_attributes';
import {
  hex2bin,
  ChainId,
  INFURA_PREFIXES,
  HASHES_ADDRESS
} from '../../../util';

type ResponseData = {
  hash: string
  binaryAttributes: { [key: string]: number }
}

function getHashesContract(chain_id: number | undefined) {
  // Use chain id from by query param, but fallback to environment variable or mainnet
  // const chainId =
  //     chain_id && INFURA_PREFIXES[chain_id] && HASHES_ADDRESS[chain_id] ? chain_id : process.env.API_CHAIN_ID || 1;
  const chainId = 1; //temp
  const provider = new ethers.providers.InfuraProvider(INFURA_PREFIXES[chainId], process.env.API_INFURA_PROJECT_ID);
  const newContract =  new ethers.Contract(HASHES_ADDRESS[chainId], HASHES_ABI.abi, provider);
  return newContract;
}

function getHashBinaryAttributes(hash: string) {
  function getAttrValue(attr: Attribute, hash: string) {
    if (attr.regex) {
      const hex2binVal = hex2bin(hash).match(attr.regex);
      const binaryAttrLength = hex2binVal !== null ? hex2binVal[0].length : 0;
      return binaryAttrLength;
    }

    if (attr.calculationFunction) return attr.calculationFunction(hash);

    return null;
  }

  const binaryAttributes: { [key: string]: number } = {};

  HASH_ATTRIBUTES.map((attribute) => {
    binaryAttributes[attribute.descriptionShort] = getAttrValue(attribute, hash);
  });

  return binaryAttributes;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | string>
) {
  const { tokenId } = req.query;

  if (isNaN(Number(tokenId))) {
      res.status(400).send('tokenId must be a number');
      return;
  }

  const hashesContract = getHashesContract(1);

  const hash = await hashesContract.getHash(tokenId);

  if (hash === ethers.constants.HashZero) {
      res.status(404).send('token not found');
      return;
  }

  const binaryAttributes = getHashBinaryAttributes(hash);
  res.status(200).json({
    hash,
    binaryAttributes
  })
}
