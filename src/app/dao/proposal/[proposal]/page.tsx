import { fetchProposals } from '@/app/services/proposal';
import CastVote from '@/components/proposal/castVote';
import ProposalStatus from '@/components/proposal/status';
import { FormattedAddress } from '@/components/utils/ethereum';
import { DAO_ADDRESSES } from '@/utils/constants';
import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  Tabs,
} from '@chakra-ui/react';
import { notFound } from 'next/navigation';
import { LuCheckSquare, LuFolder, LuUser } from 'react-icons/lu';

import ProposalDescriptionContent from '@/components/proposal/ProposalDescriptionContent';
import ProposalVotesContent from '@/components/proposal/ProposalVotesContent';
import ProposalTransactionsContent from '@/components/proposal/ProposalTransactionsContent';

interface ProposalPageProps {
  params: {
    proposal: string;
  };
}

export default async function ProposalPage({ params }: ProposalPageProps) {
  const proposalNumber = parseInt(params.proposal);
  if (isNaN(proposalNumber)) {
    return notFound();
  }

  const proposals = await fetchProposals(
    DAO_ADDRESSES.token,
    'proposalNumber',
    'asc',
    1,
    { proposalNumber },
    true
  );

  if (proposals.length === 0) {
    return notFound();
  }

  const proposal = proposals[0];

  return (
    <VStack gap={4} align={'start'} w="full">
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
        <HStack justify={'space-between'} w="full">
          <Heading size={'md'} as='h2'>
            Proposal {params.proposal}
          </Heading>
          <HStack>
            <FormattedAddress address={proposal.proposer} />
            <ProposalStatus proposal={proposal} />
          </HStack>
        </HStack>
        <Heading size={'4xl'} as='h1'>
          {proposal.title}
        </Heading>
        <HStack>
          <Box
            borderWidth={1}
            borderRadius={'md'}
            px={4}
            py={2}
            w={'full'}
            bg={'bg.subtle'}
          >
            <Heading size={'md'}>For</Heading>
            <Text fontWeight={'bold'} color={proposal.forVotes > 0 ? 'green.500' : 'fg.subtle'}>
              {proposal.forVotes}
            </Text>
          </Box>
          <Box
            borderWidth={1}
            borderRadius={'md'}
            px={4}
            py={2}
            w={'full'}
            bg={'bg.subtle'}
          >
            <Heading size={'md'}>Against</Heading>
            <Text fontWeight={'bold'} color={proposal.againstVotes > 0 ? 'red.500' : 'fg.subtle'}>
              {proposal.againstVotes}
            </Text>
          </Box>
          <Box
            key={proposal.proposalId}
            borderWidth={1}
            borderRadius={'md'}
            px={4}
            py={2}
            w={'full'}
            bg={'bg.subtle'}
          >
            <Heading size={'md'}>Abstain</Heading>
            <Text fontWeight={'bold'} color={proposal.abstainVotes > 0 ? 'yellow.500' : 'fg.subtle'}>
              {proposal.abstainVotes}
            </Text>
          </Box>
        </HStack>
        <CastVote proposal={proposal} />
      </Box>

      <Tabs.Root lazyMount defaultValue="description" variant="enclosed" w="full">
        <Tabs.List display="flex" justifyContent="center" gap={4}>
          <Tabs.Trigger value="description" display="flex" alignItems="center">
            <LuUser />
            <Text ml={2}>Description</Text>
          </Tabs.Trigger>
          <Tabs.Trigger value="votes" display="flex" alignItems="center">
            <LuFolder />
            <Text ml={2}>Votes</Text>
          </Tabs.Trigger>
          <Tabs.Trigger value="transactions" display="flex" alignItems="center">
            <LuCheckSquare />
            <Text ml={2}>Transactions</Text>
          </Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>

        <Tabs.Content value="description">
          <ProposalDescriptionContent proposal={proposal} />
        </Tabs.Content>

        <Tabs.Content value="votes">
          <ProposalVotesContent proposal={proposal} />
        </Tabs.Content>

        <Tabs.Content value="transactions">
          {/* Example of handling long text by wrapping or scrolling */}
          <Box
            shadow={'sm'}
            maxW={'100%'}
            padding={4}
            rounded={'md'}
            _dark={{ borderColor: 'yellow', borderWidth: 1 }}
            display={'flex'}
            flexDirection={'column'}
            gap={2}
            whiteSpace="pre-wrap"    // Allows wrapping
            wordBreak="break-all"    // Break words if needed
          >
            {proposal.calldatas}
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </VStack>
  );
}
