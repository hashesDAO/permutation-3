import { Box, Container } from '@chakra-ui/react';
import { BigNumber, ethers } from 'ethers';
import { useAccount, useNetwork } from 'wagmi';
import { useState, useEffect, useCallback } from 'react';
import {
  getMintFeePredicateContract,
  getEligibilityPredicateContract,
  getHashesContract,
  getHashesCollectionContract,
 } from '../util';
 import { CollectionNFTCloneableV1 } from '../util/types/src';
import { getHashBase64EncodedSVG } from '../util/hash_attributes';
import { HashWithMetadata } from '../util/types';
import Addresses from '../addresses.json';
import ConnectNotice from '../components/ConnectNotice';
import EligibleHashesMintingContainer from '../components/EligibleHashesMintingContainer';

export default function Mint() {
  const { chain } = useNetwork();
  const { isConnected, address } = useAccount();
  const [ hashesContract, setHashesContract ] = useState<ethers.Contract>();
  const [ collectionContract, setCollectionContract ] = useState<CollectionNFTCloneableV1>();
  const [ hashes, setHashes ] = useState<Array<HashWithMetadata>>();
  const [ sigilCollectionMetadata, setSigilCollectionMetadata ] = useState<any>();
  const [collectionTokenMintedNonce, setCollectionTokenMintedNonce] = useState(0);
  const collectionTokenMintedCallback = useCallback(() => {
      setCollectionTokenMintedNonce((s) => s + 1);
  }, []); //TODO: do I need this?

  useEffect(() => {
    if (isConnected && !hashesContract) setHashesContract(getHashesContract(1));
  }, [isConnected, hashesContract, setHashesContract]);

  useEffect(() => {
    if (!collectionContract && chain) setCollectionContract(getHashesCollectionContract(Addresses.sigilV0CollectionAddress, chain.id));
  }, [collectionContract, chain, setCollectionContract]);

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
  }, [address, chain, collectionContract, hashesContract]);

  useEffect(() => {
    if (collectionContract) {
        (async () => {
          try {
            const [name, symbol, nonce, cap] = await Promise.all([
                collectionContract.name(),
                collectionContract.symbol(),
                collectionContract.nonce(),
                collectionContract.cap(),
            ]);

            setSigilCollectionMetadata({
                name,
                symbol,
                currentNumberMinted: nonce,
                supplyCap: cap,
            });
          } catch (error) {
            console.error(`error getting sigil collection metadata: ${error}`);
          }
        })();
    }
}, [collectionContract, collectionTokenMintedNonce, setSigilCollectionMetadata]); // collectionTokenMintedNonce - do we need this?

  if (!isConnected) {
    return (
      <Box p={8}>
        <ConnectNotice />
      </Box>
    );
  }

  return (
    <>
        {/* {JSON.stringify(hashes)} */}
        <Container maxW="container.xl" centerContent mt={12}>

        <Box mb={12}>
        <EligibleHashesMintingContainer
          hashes={hashes}
          collectionContract={collectionContract}
          tokenMintedCallback={collectionTokenMintedCallback}
          isSupplyCapReached={
            sigilCollectionMetadata &&
            sigilCollectionMetadata.supplyCap.toNumber() !== 0 &&
            sigilCollectionMetadata.currentNumberMinted.gte(sigilCollectionMetadata.supplyCap)
          }
          />
        </Box>
        </Container>
    </>
  )
}