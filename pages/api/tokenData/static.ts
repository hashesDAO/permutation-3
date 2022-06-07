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

type BinaryAttribute = { trait_type: string, value: number };

type ResponseData = {
  hash: string
  binary_attributes: BinaryAttribute[]
  type: string
  phrase: string
  phrase_rarity: number
};

function getHashesContract(chain_id: number | undefined): ethers.Contract {
  const chainId = 1; //temp
  const provider = new ethers.providers.InfuraProvider(INFURA_PREFIXES[chainId]);
  const newContract =  new ethers.Contract(HASHES_ADDRESS[chainId], HASHES_ABI.abi, provider);
  return newContract;
}

function getHashBinaryAttributes(hash: string): BinaryAttribute[] {
  function getAttrValue(attr: Attribute, hash: string) {
    if (attr.regex) {
      const hex2binVal = hex2bin(hash).match(attr.regex);
      const binaryAttrLength = hex2binVal !== null ? hex2binVal[0].length : 0;
      return binaryAttrLength;
    }

    if (attr.calculationFunction) return attr.calculationFunction(hash);

    return null;
  }

  return HASH_ATTRIBUTES.map((attribute) => ({
    trait_type: attribute.descriptionShort,
    value: getAttrValue(attribute, hash)
  }));
}

function getPhraseRarity(str: string, arr: ethers.Event[]): number {
  const allPhrases = arr.map(event => event?.args?.phrase);
  const phraseAmount = allPhrases.filter((phrase: string) => phrase === str).length;
  return phraseAmount / allPhrases.length * 100;
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

  //TODO: wrap in try/catch
  const [hash, isDeactivated]: [string, boolean] = await Promise.all([
    hashesContract.getHash(tokenId),
    hashesContract.deactivated(tokenId),
  ]);

  if (hash === ethers.constants.HashZero) {
    res.status(404).send('token not found');
    return;
  }

  //TODO: temp phrase solution for now
  const generatedFilter = hashesContract.filters.Generated();
  const AllGeneratedEvents = await hashesContract.queryFilter(generatedFilter);
  const tokenIdEvent = AllGeneratedEvents.find(event => Number(event?.args?.tokenId) === Number(tokenId));

  const phrase = tokenIdEvent?.args?.phrase;
  const phraseRarity = phrase ? getPhraseRarity(phrase, AllGeneratedEvents) : 0;

  const binaryAttributes = getHashBinaryAttributes(hash);

  res.status(200).json({
    hash,
    binary_attributes: binaryAttributes,
    type: Number(tokenId) >= 1000 ? 'Standard' : isDeactivated ? 'DAO Deactivated' : 'DAO',
    phrase: phrase || 'Phrase is being non-fungibilitized... check back soon!',
    phrase_rarity: phraseRarity
  });
}
