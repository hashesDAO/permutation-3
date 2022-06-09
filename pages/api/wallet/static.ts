import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers, utils } from 'ethers';
import { getHashesContract } from '../../../util';
import { getHashesCount, isValidAddress } from '../../../util/validate';

type ResponseData = {
  current_eth_balance: number
  first_transaction_timestamp: number
  transaction_count: number
  eth_spent: number
}

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

  try {
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

    const [
      balance,
      history,
      txCount
    ] = await Promise.all([
      etherscanProvider.getBalance(address),
      etherscanProvider.getHistory(address),
      etherscanProvider.getTransactionCount(address)
    ]);

    const formattedBalance = Number(utils.formatEther(balance));
    const firstTxTimestamp = history[0].timestamp!;

    //value spent (including erc-20 tokens?)
    const ethSpent = history
      .filter(tx => tx.from === address)
      .map(tx => Number(utils.formatUnits(tx.value, "ether")))
      .reduce((prev, curr) => prev + curr, 0);

    res.status(200).json({
      current_eth_balance: formattedBalance,
      first_transaction_timestamp: firstTxTimestamp,
      transaction_count: txCount,
      eth_spent: ethSpent
    });
  } catch (error) {
    console.error(`error calling etherscan: ${error}`);
  }
}
