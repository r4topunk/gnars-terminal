'use client';

import {
  useWriteAuctionCreateBid,
  useWriteAuctionSettleCurrentAndCreateNewAuction,
} from '@/hooks/wagmiGenerated';
import { convertSparksToEth } from '@/utils/spark';
import { Button, Link as ChakraLink, HStack, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useCallback, useState } from 'react';
import { LuExternalLink } from 'react-icons/lu';
import { parseEther } from 'viem';
import { useAccount } from 'wagmi';
import { NumberInputField, NumberInputRoot } from '../ui/number-input';
import { Tooltip } from '../ui/tooltip';

interface BidProps {
  tokenId: bigint;
  winningBid: bigint;
  isAuctionRunning: boolean;
  onBid?: () => void;
  onSettle?: () => void;
}

// @todo Add behavior to autoupdate the auction after a new bid or settle

export function AuctionBid(props: BidProps) {
  const { tokenId, winningBid, isAuctionRunning } = props;
  const [txHash, setTxHash] = useState<string | null>(null);

  const account = useAccount();
  const [bidValue, setBidValue] = useState('111');

  const { writeContractAsync: writeBid } = useWriteAuctionCreateBid();
  const onClickBid = useCallback(async () => {
    try {
      const txHash = await writeBid({
        args: [tokenId],
        value: parseEther(convertSparksToEth(bidValue)),
      });
      setTxHash(txHash);
      if (props.onBid) {
        props.onBid();
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        window.alert(`Error creating bid: ${error.message}`);
      } else {
        window.alert('Error creating bid');
      }
    }
  }, [writeBid, bidValue]);

  const { writeContractAsync: writeSettle } =
    useWriteAuctionSettleCurrentAndCreateNewAuction();
  const onClickSettle = useCallback(async () => {
    try {
      const txHash = await writeSettle({});
      setTxHash(txHash);
      if (props.onSettle) {
        props.onSettle();
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        window.alert(`Error settling auction: ${error.message}`);
      } else {
        window.alert('Error settling auction');
      }
    }
  }, [writeSettle]);

  return (
    <VStack align={'stretch'} gap={0} w={'full'}>
      <HStack mt={4} w={'full'}>
        {isAuctionRunning ? (
          <>
            <Tooltip showArrow content='Sparks'>
              <ChakraLink
                asChild
                variant={'plain'}
                fontWeight={'bold'}
                fontSize={'xl'}
              >
                <NextLink
                  target='_blank'
                  href={'https://zora.co/writings/sparks'}
                >
                  ✧
                </NextLink>
              </ChakraLink>
            </Tooltip>
            <NumberInputRoot
              maxW={{ md: '120px' }}
              w={'full'}
              defaultValue={bidValue}
              step={111}
              onValueChange={(datails) => setBidValue(datails.value)}
              disabled={account.isDisconnected}
              min={0}
            >
              <NumberInputField />
            </NumberInputRoot>
            <Button
              variant={'subtle'}
              onClick={onClickBid}
              disabled={
                account.isDisconnected ||
                !isAuctionRunning ||
                parseEther(bidValue) < winningBid
              }
            >
              Bid
            </Button>
          </>
        ) : (
          <Button
            variant={'solid'}
            onClick={onClickSettle}
            disabled={account.isDisconnected}
            w={{ base: 'full', md: 60 }}
          >
            Settle auction
          </Button>
        )}
      </HStack>
      <HStack maxW={'full'}>
        {txHash && (
          <ChakraLink asChild>
            <NextLink href={`https://basescan.org/tx/${txHash}`}>
              Transaction: {txHash.slice(0, 4)}...{txHash.slice(-4)}
              <LuExternalLink />
            </NextLink>
          </ChakraLink>
        )}
      </HStack>
    </VStack>
  );
}
