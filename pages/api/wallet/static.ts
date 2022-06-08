import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
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
  //eth balance
  const etherscanProvider = new ethers.providers.EtherscanProvider(1);
  const ethBalance = await etherscanProvider.getBalance(address);
  const formattedEthBalance = ethers.utils.formatEther(ethBalance);

  //date of first txn
  const history = await etherscanProvider.getHistory(address);
  const firstTxnTimestamp = history[0].timestamp;

  //amount of txns
  const txnAmount = await etherscanProvider.getTransactionCount(address);

  res.status(200).json({ name: 'John Doe' })
}
