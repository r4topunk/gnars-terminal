import { Box, HStack, VStack, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { Proposal } from '@/app/services/proposal';
import ProposalStatus from '../proposal/status';
import { FormattedAddress } from '../utils/ethereum';
import { Link as ChakraLink } from '@chakra-ui/react';
import { memo, useMemo } from 'react';

interface ProposalListCardProps {
  proposal: Proposal;
}

const ProposalListCard = memo(({ proposal }: ProposalListCardProps) => {
  const { forVotes, againstVotes, abstainVotes } = proposal;

  const totalVotes = forVotes + againstVotes + abstainVotes;

  const forPercentage = useMemo(
    () => (totalVotes > 0 ? (forVotes / totalVotes) * 100 : 0),
    [forVotes, totalVotes]
  );
  const againstPercentage = useMemo(
    () => (totalVotes > 0 ? (againstVotes / totalVotes) * 100 : 0),
    [againstVotes, totalVotes]
  );
  const abstainPercentage = useMemo(
    () => (totalVotes > 0 ? (abstainVotes / totalVotes) * 100 : 0),
    [abstainVotes, totalVotes]
  );

  return (
    <Box
      borderWidth={1}
      rounded={'md'}
      p={4}
      mb={2}
      bg={'bg.subtle'}
      display={'flex'}
      gap={2}
      alignItems={'stretch'}
    >
      <Box
        w={3}
        bg='gray.200'
        rounded='xs'
        display='flex'
        flexDirection='column'
        overflow='hidden'
        alignSelf={'stretch'}
        mb={1}
      >
        <Box bg='green.400' height={`${forPercentage}%`} />
        <Box bg='yellow.400' height={`${abstainPercentage}%`} />
        <Box bg='red.400' height={`${againstPercentage}%`} />
      </Box>
      <VStack gap={1} align={'start'} flex={1}>
        <HStack gap={1}>
          <ProposalStatus proposal={proposal} />
          <FormattedAddress address={proposal.proposer} asLink={false} />
        </HStack>
        <ChakraLink color={{ _light: 'black', _dark: 'white' }} asChild>
          <Link href={`/dao/proposal/${proposal.proposalNumber}`}>
            <Heading as='h3' size='md'>
              #{proposal.proposalNumber}: {proposal.title}
            </Heading>
          </Link>
        </ChakraLink>
      </VStack>
    </Box>
  );
});

ProposalListCard.displayName = 'ProposalHorizontalCard';

export default ProposalListCard;
