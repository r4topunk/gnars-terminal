import AuctionCard from '@/components/cards/auction';
import GovernorCard from '@/components/cards/governor';
import DroposalCard from '@/components/droposals/DroposalCard';
import { Status } from '@/components/proposal/status';
import { fetchAuction } from '@/services/auction';
import { DAO_ADDRESSES } from '@/utils/constants';
import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { headers } from 'next/headers';
import type { Metadata } from 'next';

export const revalidate = 60;

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: 'next',
  imageUrl: `${appUrl}/frames/auction/opengraph-image`,
  button: {
    title: 'Gnars Auction',
    action: {
      type: 'launch_frame',
      name: 'Gnars Auction',
      url: `${appUrl}/frames/auction/`,
      splashImageUrl: `${appUrl}/images/loading.gif`,
      splashBackgroundColor: '#f7f7f7',
    },
  },
};

export const metadata: Metadata = {
  title: 'Gnars Dao',
  description: 'Gnarly Ecosystem',
  other: {
    'fc:frame': JSON.stringify(frame),
  },
};

async function App() {
  headers();
  const auctions = await fetchAuction(
    DAO_ADDRESSES.token,
    'endTime',
    'desc',
    1
  );
  const activeAuction = auctions[0];

  return (
    <VStack gap={4} align={'start'}>
      <Grid
        templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        templateRows={{ base: 'auto', md: 'repeat(2, 1fr)', lg: 'auto' }}
        gap={4}
        w={'full'}
      >
        <GridItem>
          <DroposalCard />
        </GridItem>
        <GridItem>
          <AuctionCard defaultAuction={activeAuction} />
        </GridItem>
      </Grid>
      <GovernorCard
        limit={12}
        tabDefault='grid'
        gridColumns={4}
        filterBy={[
          Status.ACTIVE,
          Status.EXECUTED,
          Status.PENDING,
          Status.SUCCEEDED,
          Status.DEFEATED,
          Status.QUEUED,
        ]}
      />
    </VStack>
  );
}

export default App;
