import { fetchProposals } from '@/app/services/proposal';
import CastVote from '@/components/proposal/castVote';
import Markdown from '@/components/proposal/markdown';
import ProposalStatus from '@/components/proposal/status';
import { FormattedAddress } from '@/components/utils/ethereum';
import { DAO_ADDRESSES } from '@/utils/constants';
import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { notFound } from 'next/navigation';

// @fix React Markdown is not rendering with styles

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
    <VStack gap={4} align={'start'}>
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
        <HStack justify={'space-between'}>
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
            <Text
              fontWeight={'bold'}
              color={proposal.forVotes > 0 ? 'green.500' : 'fg.subtle'}
            >
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
            <Text
              fontWeight={'bold'}
              color={proposal.againstVotes > 0 ? 'red.500' : 'fg.subtle'}
            >
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
            <Text
              fontWeight={'bold'}
              color={proposal.abstainVotes > 0 ? 'yellow.500' : 'fg.subtle'}
            >
              {proposal.abstainVotes}
            </Text>
          </Box>
        </HStack>
        <CastVote proposal={proposal} />
      </Box>
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
        <Markdown text={proposal.description} />
      </Box>
      <Box
        borderWidth={1}
        borderRadius={'md'}
        p={4}
        mb={2}
        bg={'bg.subtle'}
        maxW={'full'}
        overflow={'auto'}
      >
        <pre>{JSON.stringify(proposals, null, 2)}</pre>
      </Box>
    </VStack>
  );
}
