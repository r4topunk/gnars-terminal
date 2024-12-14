import AuctionCard from '@/components/cards/auction';
import GovernorCard from '@/components/cards/governor';
import ZoraCard from '@/components/cards/zora';
import { fetchAuction } from '@/services/auction';
import { DAO_ADDRESSES } from '@/utils/constants';
import { VStack } from '@chakra-ui/react';

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
      <AuctionCard defaultAuction={activeAuction} />
      <ZoraCard />
      <GovernorCard />
    </VStack>
  );
}

export default App;
