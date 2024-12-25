import PropdatesContentCardList from '@/components/propdates/contentCard';
import { fetchAllPropDates } from '@/services/supabase/propdates';
import { Container, Heading, Text, VStack } from '@chakra-ui/react';

export const metadata = {
  title: 'Propdates',
  description: 'Updates for proposals',
};

export default async function PropdatesPage() {
  const { data } = await fetchAllPropDates();
  return (
    <Container p={0} maxW='breakpoint-lg'>
      <VStack gap={{ base: 2, md: 4 }} align={'start'}>
        <Heading size={{ base: '2xl', md: '4xl' }} as='h1'>
          Propdates
        </Heading>
        {data?.length ? (
          <PropdatesContentCardList propdates={data} />
        ) : (
          <Text>No propdates yet</Text>
        )}
      </VStack>
    </Container>
  );
}
