'use client';

import { useLastAuction } from '@/hooks/auction';
import { Auction } from '@/services/auction';
import { weiToSparks } from '@/utils/spark';
import {
  Badge,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { default as NextImage } from 'next/image';
import { AuctionBid } from '../auction/bid';
import { FormattedAddress } from '../utils/ethereum';
import {
  useWatchAuctionAuctionBidEvent,
  useWatchAuctionAuctionSettledEvent,
} from '@/hooks/wagmiGenerated';
import { revalidatePath } from 'next/cache';

export default function AuctionCard({
  defaultAuction,
}: {
  defaultAuction: Auction;
}) {
  const { data: activeAuction, refetch } = useLastAuction(defaultAuction);

  useWatchAuctionAuctionBidEvent({
    onLogs(logs) {
      // @todo: remove logs
      console.log('AuctionBidEvent', logs);
      refetch();
      revalidatePath('/');
    },
  });

  useWatchAuctionAuctionSettledEvent({
    onLogs(logs) {
      // @todo: remove logs
      console.log('AuctionSettledEvent', logs);
      refetch();
      revalidatePath('/');
    },
  });

  if (!activeAuction) {
    return (
      <VStack
        shadow={'sm'}
        w={'full'}
        padding={4}
        rounded={'md'}
        gap={4}
        _dark={{ borderColor: 'yellow', borderWidth: 1 }}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          gap={4}
          align={'start'}
          justify={'space-between'}
          w={'full'}
        >
          <VStack align={'stretch'} gap={2} w={'full'}>
            <Heading as='h2'>
              <Skeleton height='40px' width='160px' />
            </Heading>
            <Text>
              <Skeleton height='20px' width='100px' />
            </Text>
            <Text>
              <Skeleton height='20px' width='80px' />
            </Text>
          </VStack>
          <Skeleton
            rounded={'md'}
            w={'full'}
            maxW={{ md: '240px' }}
            height='240px'
          />
        </Stack>
      </VStack>
    );
  }

  const isAuctionRunning = parseInt(activeAuction.endTime) * 1000 > Date.now();

  return (
    <VStack
      shadow={'sm'}
      w={'full'}
      padding={4}
      rounded={'md'}
      gap={4}
      _dark={{ borderColor: 'yellow', borderWidth: 1 }}
    >
      <Stack
        direction={{ base: 'column', md: 'row' }}
        gap={4}
        align={'start'}
        justify={'space-between'}
        w={'full'}
      >
        <Image asChild rounded={'md'} w={'full'} maxW={{ md: '50%' }}>
          <NextImage
            width={1024}
            height={1024}
            src={activeAuction.token.image}
            alt={`Auction token id ${activeAuction.token.tokenId}`}
          />
        </Image>
        <VStack align={'stretch'} gap={2} w={'full'}>
          <Heading as='h2'>Auction #{activeAuction.token.tokenId}</Heading>
          {activeAuction.highestBid ? (
            <VStack align={'start'} gap={1}>
              <Text>
                Highest bid:{' '}
                <Badge colorPalette={'blue'} variant={'surface'} size={'sm'}>
                  ✧{weiToSparks(activeAuction.highestBid.amount)}{' '}
                </Badge>
              </Text>
              <FormattedAddress
                address={activeAuction.highestBid.bidder}
                textBefore='Highest bidder: '
              />
            </VStack>
          ) : (
            <Text>No bids {isAuctionRunning ? 'yet' : ''}</Text>
          )}
          <AuctionBid
            tokenId={BigInt(activeAuction.token.tokenId)}
            winningBid={
              activeAuction.winningBid
                ? BigInt(activeAuction.winningBid.amount)
                : 0n
            }
            isAuctionRunning={isAuctionRunning}
            onBid={refetch}
            onSettle={refetch}
          />
        </VStack>
      </Stack>
    </VStack>
  );
}
