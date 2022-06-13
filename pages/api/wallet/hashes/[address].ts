import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers, utils } from 'ethers';
import {
  getHashesContract,
  getHashesDAOContract,
  getHashesCollectionContract
} from '../../../../util';
import {
  getHashesCount,
  getHashType,
  hashType,
  isValidAddress
} from '../../../../util/validate';
import Addresses from '../../../../addresses.json';

type WalletHash = {
  hash_value: string
  type: hashType
  minted_by_address: boolean
  blocks_held: number
  purchased_above_mint_price: boolean | null
  token_id: number
}

type ResponseData = {
  hashes: WalletHash[]
  on_chain_votes: number
  owns_perm_2_nft: boolean
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | string>
) {
  const { address } = req.query;

  if (typeof(address) !== 'string') {
    res.status(400).send('address must be a string');
    return;
  }

  if (!isValidAddress(address)) {
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

  try {
    const etherscanProvider = new ethers.providers.EtherscanProvider(1, process.env.ETHERSCAN_API_KEY);
    const currentBlockNumber = await etherscanProvider.getBlockNumber();

    const hashes: WalletHash[] = [];
    for (let i = 0; i < hashesCount; i++) {
      const tokenId = await hashesContract.tokenOfOwnerByIndex(address, i);
      const [hash, isDeactivated]: [string, boolean] = await Promise.all([
        hashesContract.getHash(tokenId),
        hashesContract.deactivated(tokenId),
      ]);

      const generatedFilter = hashesContract.filters.Generated();
      const allGeneratedEvents = await hashesContract.queryFilter(generatedFilter);
      const tokenIdEvent = allGeneratedEvents.find(event => Number(event?.args?.tokenId) === Number(tokenId));

      const artist = tokenIdEvent?.args?.artist ? tokenIdEvent?.args?.artist : null;
      const blocksHeld = tokenIdEvent?.blockNumber ? currentBlockNumber - tokenIdEvent?.blockNumber : 0;
      const type = getHashType(tokenId, isDeactivated);

      hashes.push({
        hash_value: hash,
        type,
        minted_by_address: artist === address,
        blocks_held: blocksHeld,
        purchased_above_mint_price: false,
        token_id: tokenId.toNumber(),
      });
    };

    const hashesNotMinted = hashes
      .filter(hash => hash.minted_by_address === false)
      .map(hash => hash.token_id);

    if (hashesNotMinted.length) {
      const transferFilter = hashesContract.filters.Transfer();
      const allTransferEvents = await hashesContract.queryFilter(transferFilter);
      const transferEventsToAddress = allTransferEvents
        .filter(event => event?.args?.to.toLowerCase() === address.toLowerCase())
        .map(ev => ({
          transactionHash: ev.transactionHash,
          tokenId: ev?.args?.tokenId.toNumber(),
        }));

      transferEventsToAddress.map(async (tx) => {
        if (hashesNotMinted.includes(tx.tokenId)) {
          const txDetails =  await etherscanProvider.getTransaction(tx.transactionHash);
          const formattedBalance = Number(utils.formatEther(txDetails.value));
          const purchasedAboveMintPrice = formattedBalance > 1;

          hashes.map(hash => {
            if (hash.token_id === tx.tokenId) hash.purchased_above_mint_price = purchasedAboveMintPrice;
          });
        }
      });
    }

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

    const medleyLimitedContract = getHashesCollectionContract(Addresses.medleyLimitedEditionCollectionAddress);
    const medleyLimitedCount = await getHashesCount(medleyLimitedContract, address);

    const medleyStillsContract = getHashesCollectionContract(Addresses.medleyStillsCollectionAddress);
    const medleyStillsCount = await getHashesCount(medleyStillsContract, address);
    const medleyNftCount =
      !(medleyLimitedCount instanceof Error) &&
      !(medleyStillsCount instanceof Error) ? medleyLimitedCount + medleyStillsCount : 0;

    res.status(200).json({
      hashes,
      on_chain_votes: votesCastByAddress,
      owns_perm_2_nft: medleyNftCount > 0,
    });
  } catch (error) {
    console.error(`error getting dynamic data: ${error}`);
  }
}
