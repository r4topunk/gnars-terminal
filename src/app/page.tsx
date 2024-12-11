import AuctionCard from '@/components/cards/auction';
import GovernorCard from '@/components/cards/governor';
import ZoraCard from '@/components/cards/zora';
import { HStack, VStack } from '@chakra-ui/react';

function App() {
  return (
    <VStack gap={4} align={'start'}>
      <AuctionCard />
      <ZoraCard />
      <GovernorCard />
    </VStack>
  );
}

export default App;
