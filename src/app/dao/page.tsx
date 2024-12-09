import GovernorCard from '@/components/cards/governor';
import { Heading, VStack } from '@chakra-ui/react';

function DaoPage() {
  return (
    <VStack gap={4} align={'start'}>
      <Heading size={'4xl'} as='h1'>
        DAO
      </Heading>
      <GovernorCard />
    </VStack>
  );
}

export default DaoPage;
