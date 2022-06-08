import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers';
import { HASH_ATTRIBUTES } from '../../../util/hash_attributes';
import {
  hex2bin,
  getHashesContract
} from '../../../util';

type BinaryAttribute = { trait_type: string, value: number };

type ResponseData = {
  hash: string
  binary_value: string
  binary_attributes: BinaryAttribute[]
  type: string
  phrase_value: string
  phrase_attributes: BinaryAttribute[]
};

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

function getPhraseAttributes(
  phrase: string,
  events: ethers.Event[]
): BinaryAttribute[] {
  const phraseWords: string[] = phrase.split(' ');
  const phraseCharCount: number = phraseWords.reduce((prev: number, curr: string) => prev + curr.length, 0);
  return [
    {
      trait_type: 'rarity',
      value: getPhraseRarity(phrase, events)
    },
    {
      trait_type: 'word amount',
      value: phraseWords.length
    },
    {
      trait_type: 'character amount',
      value: phraseCharCount
    }
  ];
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

  try {
    const nonce = await hashesContract.nonce();
    if (Number(tokenId) > nonce) {
      res.status(404).send('tokenId value must be less than the amount of hashes generated');
      return;
    }
  } catch (error) {
    console.error(`error getting nonce: ${error}`);
  }

  try {
    const [hash, isDeactivated]: [string, boolean] = await Promise.all([
      hashesContract.getHash(tokenId),
      hashesContract.deactivated(tokenId),
    ]);

    if (hash === ethers.constants.HashZero) {
      res.status(404).send('token not found');
      return;
    }

    const binaryValue = hex2bin(hash);
    const binaryAttributes = getHashBinaryAttributes(hash);

    const generatedFilter = hashesContract.filters.Generated();
    const AllGeneratedEvents = await hashesContract.queryFilter(generatedFilter);
    const tokenIdEvent = AllGeneratedEvents.find(event => Number(event?.args?.tokenId) === Number(tokenId));

    const phrase = tokenIdEvent?.args?.phrase ? tokenIdEvent?.args?.phrase : null;
    const phraseAttributes = phrase ? getPhraseAttributes(phrase, AllGeneratedEvents) : [];

    res.status(200).json({
      hash,
      binary_value: binaryValue,
      binary_attributes: binaryAttributes,
      type: Number(tokenId) >= 1000 ? 'Standard' : isDeactivated ? 'DAO Deactivated' : 'DAO',
      phrase_value: phrase,
      phrase_attributes: phraseAttributes
    });
  } catch (error) {
    console.error(`error calling contract: ${error}`);
  }
}
