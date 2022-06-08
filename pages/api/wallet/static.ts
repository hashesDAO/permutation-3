import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers, utils } from 'ethers';

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

  if (
    !address ||
    typeof(address) !== 'string' ||
    !ethers.utils.isAddress(address)
  ) {
    res.status(400).send('valid wallet address must be provided');
    return;
  }

  const etherscanProvider = new ethers.providers.EtherscanProvider(1);
  const ethBalance = await etherscanProvider.getBalance(address);
  const formattedEthBalance = Number(utils.formatEther(ethBalance));

  const history = await etherscanProvider.getHistory(address);
  const firstTxTimestamp = history[0].timestamp!;

  //value spent (including erc-20 tokens?)
  const ethSpent = history
    .filter(tx => tx.from === address)
    .map(tx => Number(utils.formatUnits(tx.value, "ether")))
    .reduce((prev, curr) => prev + curr, 0);

  const txCount = await etherscanProvider.getTransactionCount(address);

  res.status(200).json({
    current_eth_balance: formattedEthBalance,
    first_transaction_timestamp: firstTxTimestamp,
    transaction_count: txCount,
    eth_spent: ethSpent
   })
}
