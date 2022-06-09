import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers';
import {
  getHashesContract,
  getHashesDAOContract
 } from '../../../util';
 import { getHashesCount, getHashType, hashType } from '../../../util/validate';

type WalletHash = {
  hash_value: string
  type: hashType
  minted_by_address: boolean
  blocks_held: number
}

type ResponseData = {
  hashes: WalletHash[]
  on_chain_votes: number
  owns_perm_2_nft: boolean
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | string | any>
) {
  const { address } = req.query;

  if (
    !address ||
    typeof(address) !== 'string' ||
    !ethers.utils.isAddress(address)
  ) {
    res.status(400).send('valid (non-ens) wallet address must be provided');
    return;
  }

  const hashesContract = getHashesContract(1);
  const hashesCount = await getHashesCount(hashesContract, address);

  if (hashesCount instanceof Error) {
    res.status(500).send(hashesCount.message);
    return;
  }

  if (!hashesCount) {
    res.status(404).send('wallet does not have a hash token');
    return;
  }

  const etherscanProvider = new ethers.providers.EtherscanProvider(1, process.env.ETHERSCAN_API_KEY);
  const currentBlockNumber = await etherscanProvider.getBlockNumber();

  const hashes = [];
  for (let i = 0; i < hashesCount; i++) {
    const tokenId = await hashesContract.tokenOfOwnerByIndex(address, i);
    const [hash, isDeactivated]: [string, boolean] = await Promise.all([
      hashesContract.getHash(tokenId),
      hashesContract.deactivated(tokenId),
    ]);

    const generatedFilter = hashesContract.filters.Generated();
    const AllGeneratedEvents = await hashesContract.queryFilter(generatedFilter);
    const tokenIdEvent = AllGeneratedEvents.find(event => Number(event?.args?.tokenId) === Number(tokenId));

    const artist = tokenIdEvent?.args?.artist ? tokenIdEvent?.args?.artist : null;
    const blocksHeld = tokenIdEvent?.blockNumber ? currentBlockNumber - tokenIdEvent?.blockNumber : 0;
    const type = getHashType(tokenId, isDeactivated);

    hashes.push({
      hash_value: hash,
      type,
      minted_by_address: artist === address,
      blocks_held: blocksHeld,
    });
  };

  const hasNonStandardHash = hashes
    ?.map(hash => hash.type)
    .some(type => type === 'DAO' || type === 'DAO Deactivated');

  let votesCastByAddress = 0;

  if (hasNonStandardHash) {
    const hashesDAOContract = getHashesDAOContract();
    const voteCastFilter = hashesDAOContract.filters.VoteCast();
    const allVoteCastEvents = await hashesDAOContract.queryFilter(voteCastFilter);

    votesCastByAddress = allVoteCastEvents
      .filter(event => event?.args?.voter.toLowerCase() === address.toLowerCase())
      .length;
  }

  res.status(200).json({
    hashes,
    on_chain_votes: votesCastByAddress,
  });
}
