import AuctionCard from '@/components/cards/auction';
import GovernorCard from '@/components/cards/governor';
import ZoraCard from '@/components/cards/zora';
import DroposalCard from '@/components/droposals/DroposalCard';
import { Status } from '@/components/proposal/status';
import { fetchAuction } from '@/services/auction';
import { DAO_ADDRESSES } from '@/utils/constants';
import { Grid, GridItem, VStack } from '@chakra-ui/react';

export const revalidate = 0;

async function App() {
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
          {/* <ZoraCard /> */}
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
          Status.QUEUED,
        ]}
      />
    </VStack>
  );
}

export default App;
