import { Box, Flex, Heading, Link, Text, useColorModeValue as mode, useToast } from '@chakra-ui/react';
import { BigNumber, ethers } from 'ethers';
import { useState } from 'react';
import { MetaMaskErrors } from '../util';
import { HashWithMetadata } from '../util/types';
import { CollectionNFTCloneableV1 } from '../util/types/src';
import Card from '../components/Card';

export default function EligibleHashesMintingContainer({
  hashes,
  collectionContract,
  tokenMintedCallback,
  isSupplyCapReached,
}: {
  hashes: HashWithMetadata[] | undefined;
  collectionContract: CollectionNFTCloneableV1 | undefined;
  tokenMintedCallback: () => void;
  isSupplyCapReached: boolean;
}) {
  const toast = useToast();
  const [hashTokenIdMinting, setHashTokenIdMinting] = useState<BigNumber | null>(null);
  const eligibleHashes = hashes?.filter((hash) => hash.isEligible && !hash.hasAlreadyBeenUsedToMint);
  const getDisabledReason = (hash: HashWithMetadata) => {
    if (hash.hasAlreadyBeenUsedToMint) return 'Already used to mint';
    if (!hash.isEligible) return 'Not eligible to mint.';
    return 'minting disabled at this time';
  };

  let hashesComponent = <></>;
  if (!isSupplyCapReached) { //TODO: remove ! - just for testing card
    hashesComponent = (
      <Text fontWeight="bold" color={mode('gray.600', 'gray.300')}>
          {'The supply cap for this collection has been reached'}
      </Text>
    );
  } else {
    hashesComponent = (
      <>
        <Box mb="4">
            <strong>Ledger users:</strong> you need to enable the Debug Data setting for the transaction to go
            through
        </Box>
        <Flex overflowX="scroll" whiteSpace="nowrap">
          {hashes?.map((hash, i) => {
            const isDisabled = !hash.isEligible || hash.hasAlreadyBeenUsedToMint;
            return (
              <Box
                key={i}
                mr="4"
                cursor="pointer"
                onClick={() => {
                    if (hashTokenIdMinting || isDisabled) {
                        return;
                    }
                    if (collectionContract) {
                      (async () => {
                        setHashTokenIdMinting(hash.tokenId);
                        try {
                          const [tx, symbol] = await Promise.all([
                              collectionContract.mint(hash.tokenId, {
                                  value: hash.mintFee?.toString(),
                              }),
                              collectionContract.symbol(),
                          ]);
                          await tx.wait();
                          toast({
                              title: 'Successfully minted',
                              description: `${symbol} token created.`,
                              status: 'success',
                              isClosable: true,
                              variant: 'left-accent',
                              position: 'bottom-right',
                          });
                          tokenMintedCallback();
                        } catch (error: any) {
                          const errorMessage = error.message.includes(
                              MetaMaskErrors.userRejectsTxSignature,
                          )
                              ? 'User rejected request'
                              : error.message.includes(MetaMaskErrors.userRejectsMessageSignature)
                              ? 'User denied message signature'
                              : 'Please try again';

                          toast({
                              title: 'Minting failed.',
                              description: `${errorMessage}.`,
                              status: 'error',
                              isClosable: true,
                              variant: 'left-accent',
                              position: 'bottom-right',
                          });
                        }
                        setHashTokenIdMinting(null);
                      })();
                    }
                }}
              >
                <Card
                  title={`Hashes Token ID #${hash.tokenId}`}
                  base64SVG={hash.hashBase64EncodedSVG}
                  descriptionLine1={`Type: ${hash.tokenId.gte(1000) ? 'Standard' : 'DAO'}`}
                  descriptionLine2={
                      isDisabled
                          ? getDisabledReason(hash)
                          : `Mint Fee: ${ethers.utils.formatEther(hash.mintFee.toString())} ETH`
                  }
                  isDisabled={hashTokenIdMinting !== null || isDisabled}
                  isLoading={hashTokenIdMinting?.eq(hash.tokenId)}
                />
              </Box>
            );
          })}
        </Flex>
      </>
    );
  }

  return (
    <>
      <Heading mb="2" fontSize="1.25rem" fontWeight="medium" color={mode('gray.600', 'gray.300')}>
        {`Currently eligible Hashes for minting (${eligibleHashes ? eligibleHashes.length : 0} of ${
            hashes ? `${hashes.length} owned)` : 'loading...)'
        }`}
      </Heading>
      {hashes ? ( hashesComponent ) : (
        <Text color={mode('gray.600', 'gray.300')} fontStyle="italic">
            Loading...
        </Text>
      )}
      <Text mt="8">
        Looking to acquire Hashes?{' '}
        <Link
            textDecoration="underline"
            href="https://thehashes.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            isExternal
        >
            Mint a new standard Hash
        </Link>{' '}
        or{' '}
        <Link
            textDecoration="underline"
            href="https://opensea.io/collection/hashes?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Type&search[stringTraits][0][values][0]=DAO"
            target="_blank"
            rel="noopener noreferrer"
            isExternal
        >
            browse DAO Hashes on Opensea
        </Link>
        .{' '}
        <div style={{ marginTop: '8px', fontWeight: 'bold', color: 'red' }}>
            Important -- verify that Hashes you are minting or purchasing are eligible for this drop!
        </div>
      </Text>
    </>
  );
}
