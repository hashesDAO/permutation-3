import { BigNumber, ethers } from 'ethers';
import { useAccount, useNetwork } from 'wagmi';
import { useState, useEffect } from 'react';
import {
  getMintFeePredicateContract,
  getEligibilityPredicateContract,
  getHashesContract,
  getHashesCollectionContract,
 } from '../util';
import { getHashBase64EncodedSVG } from '../util/hash_attributes';
import Addresses from '../addresses.json';

interface HashWithMetadata {
  hashBase64EncodedSVG: string;
  tokenId: BigNumber;
  hash: string;
  mintFee: BigNumber;
  isEligible: boolean;
  hasAlreadyBeenUsedToMint: boolean;
}

export default function Mint() {
  const { chain } = useNetwork();
  const { isConnected, address } = useAccount();
  const [ hashesContract, setHashesContract ] = useState<ethers.Contract>();
  const [ collectionContract, setCollectionContract ] = useState<ethers.Contract>();
  const [ hashes, setHashes ] = useState<Array<HashWithMetadata>>();

  useEffect(() => {
    if (isConnected && !hashesContract) setHashesContract(getHashesContract(1));
  }, [isConnected, hashesContract, setHashesContract]);

  useEffect(() => {
    if (!collectionContract && chain) setCollectionContract(getHashesCollectionContract(Addresses.sigilV0CollectionAddress, chain.id));
  }, [collectionContract, setCollectionContract]);

  useEffect(() => {
    if (address && hashesContract && collectionContract && chain) (async () => {
      try {
        const balance = await hashesContract.balanceOf(address);
        const hashesList: Array<{
          tokenId: BigNumber;
          hash: string;
          hashBase64EncodedSVG: string;
        }> = [];

        for (let i = 0; i < balance.toNumber(); i++) {
          const tokenId = await hashesContract.tokenOfOwnerByIndex(address, i);
          const [hash, isDeactivated] = await Promise.all([
              hashesContract.getHash(tokenId),
              hashesContract.deactivated(tokenId),
          ]);
          hashesList.push({
              tokenId: tokenId,
              hash: hash,
              hashBase64EncodedSVG: getHashBase64EncodedSVG(tokenId.toNumber(), hash, isDeactivated),
          });
        }

        const [eligibilityPredicateAddress, mintFeePredicateAddress] = await Promise.all([
           collectionContract.mintEligibilityPredicateContract(),
          collectionContract.mintFeePredicateContract(),
        ]);

        const mintFeePredicateContract = getMintFeePredicateContract(
          mintFeePredicateAddress,
          chain.id,
        );
        const eligibilityPredicateContract = getEligibilityPredicateContract(
            eligibilityPredicateAddress,
            chain.id,
        );

        const nonce = await collectionContract.nonce();
        const hashesWithMetadata: Array<HashWithMetadata> = [];

        for (const hash of hashesList) {
          const [mintFee,
            isEligible,
            hasAlreadyBeenUsedToMint
          ] = await Promise.allSettled([
              mintFeePredicateContract.getTokenMintFee(nonce, hash.tokenId),
              eligibilityPredicateContract.isTokenEligibleToMint(nonce, hash.tokenId),
              collectionContract.hashesIdToCollectionTokenIdMapping(hash.tokenId),
          ]);

          hashesWithMetadata.push({
              ...hash,
              mintFee: mintFee.status === 'fulfilled' ? mintFee.value : BigNumber.from(0),
              isEligible: isEligible.status === 'fulfilled' ? isEligible.value : false,
              hasAlreadyBeenUsedToMint:
                  hasAlreadyBeenUsedToMint.status === 'fulfilled'
                      ? hasAlreadyBeenUsedToMint.value.exists
                      : false,
          });
        }

        setHashes(hashesWithMetadata);
      } catch (error) {
        console.error(`error getting user's hash metadata: ${error}`);
      }
    })();
  }, [address, hashesContract]);

  // if (!isConnected) return <div>Connect your wallet</div>;

  return (
    <>
        <h1>mint</h1>
        {JSON.stringify(hashes)}
    </>
  )
}