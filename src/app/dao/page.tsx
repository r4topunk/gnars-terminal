import GovernorCard from '@/components/cards/governor';
import { Container, Heading, VStack } from '@chakra-ui/react';

function DaoPage() {
  return (
    <Container maxW="container.lg" px={{ base: "0", md: "20%" }}>
      <VStack gap={4} align={'start'}>
        <Heading size={'4xl'} as='h1'>
          DAO
        </Heading>
        <GovernorCard />
      </VStack>
    </Container>
  );
}

export default DaoPage;
