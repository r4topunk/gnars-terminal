import { fetchProposals, Proposal } from '@/app/services/proposal';
import { DAO_ADDRESSES } from '@/utils/constants';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
  Stack,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import ProposalListCard from '../proposal/listCard';
import { LuLayoutGrid, LuList, LuPencilLine } from 'react-icons/lu';
import ProposalGridCard from '../proposal/gridCard';
import CreateProposalButton from '../ui/create-proposal-button';
import { getProposalStatus, Status } from '../proposal/status';

interface GovernorCardProps {
  limit?: number;
  tabDefault?: 'grid' | 'list';
  gridColumns?: number;
  filterBy?: Status[];
}

async function GovernorCard({
  tabDefault = 'list',
  gridColumns = 2,
  filterBy,
  limit,
}: GovernorCardProps) {
  const proposals = await fetchProposals(
    DAO_ADDRESSES.token,
    'proposalNumber',
    'desc',
    1000,
    {},
    false,
    true
  );

  const filteredProposals = filterBy
    ? proposals.filter((proposal) => {
        const status = getProposalStatus(proposal);
        return filterBy.includes(status);
      })
    : proposals;

  const limitedProposals = limit
    ? filteredProposals.slice(0, limit)
    : filteredProposals;

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
      <Tabs.Root defaultValue={tabDefault} variant={'subtle'} size={'sm'}>
        <HStack justify={'space-between'}>
          <Stack direction='row' gap={4}>
            <Link href='/dao'>
              <Heading as='h2'>Proposals</Heading>
            </Link>
          </Stack>
          <HStack>
            <Tabs.List>
              <Tabs.Trigger value='grid'>
                <LuLayoutGrid />
              </Tabs.Trigger>
              <Tabs.Trigger value='list'>
                <LuList />
              </Tabs.Trigger>
            </Tabs.List>
            <CreateProposalButton />
          </HStack>
        </HStack>
        <Tabs.Content value='grid'>
          <Grid
            templateColumns={{ base: '1fr', md: `repeat(${gridColumns}, 1fr)` }}
            gap={2}
          >
            {limitedProposals.map((proposal: Proposal) => (
              <GridItem key={proposal.proposalId}>
                <ProposalGridCard proposal={proposal} />
              </GridItem>
            ))}
          </Grid>
        </Tabs.Content>
        <Tabs.Content value='list'>
          {limitedProposals.map((proposal: Proposal) => (
            <ProposalListCard key={proposal.proposalId} proposal={proposal} />
          ))}
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}

export default GovernorCard;
