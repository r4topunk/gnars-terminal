import { fetchProposals, Proposal } from '@/app/services/proposal';
import { DAO_ADDRESSES } from '@/utils/constants';
import { Box, Heading, HStack, Tabs } from '@chakra-ui/react';
import ProposalListCard from '../proposal/listCard';
import { LuLayoutGrid, LuList } from 'react-icons/lu';

async function GovernorCard() {
  const proposals = await fetchProposals(
    DAO_ADDRESSES.token,
    'proposalNumber',
    'desc',
    1000
  );

  return (
    <Box
      shadow={'sm'}
      w={'full'}
      padding={4}
      rounded={'md'}
      _dark={{ borderColor: 'yellow', borderWidth: 1 }}
      display={'flex'}
      flexDirection={'column'}
      gap={2}
    >
      <Tabs.Root defaultValue='list' variant={'subtle'} size={'sm'}>
        <HStack justify={'space-between'}>
          <Heading as='h2'>Proposals</Heading>
          <Tabs.List>
            <Tabs.Trigger value='grid'>
              <LuLayoutGrid />
            </Tabs.Trigger>
            <Tabs.Trigger value='list'>
              <LuList />
            </Tabs.Trigger>
          </Tabs.List>
        </HStack>
        <Tabs.Content value='grid'>
          {proposals.map((proposal: Proposal) => (
            <ProposalListCard key={proposal.proposalId} proposal={proposal} />
          ))}
        </Tabs.Content>
        <Tabs.Content value='list'>
          {proposals.map((proposal: Proposal) => (
            <ProposalListCard key={proposal.proposalId} proposal={proposal} />
          ))}
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}

export default GovernorCard;
