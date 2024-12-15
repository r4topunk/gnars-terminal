import { Avatar } from '@/components/ui/avatar';
import { Box, Card, Code, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { FormattedAddress } from '../utils/ethereum';

export type VoteSupport = 'FOR' | 'AGAINST' | 'ABSTAIN';

interface Vote {
  voter: string;
  support: VoteSupport;
  weight: string;
  reason: string;
}

interface ProposalVotesContentProps {
  proposal: {
    votes: Vote[];
  };
}
export default function ProposalVotesContent({
  proposal,
}: ProposalVotesContentProps) {
  return (
    <Stack gap={2} px={2} w='full'>
      {proposal.votes.map((vote, index) => (
        <Card.Root key={index} size='md' borderRadius='lg' variant='outline'>
          <Card.Body>
            <VStack gap={3} align='stretch'>
              <HStack gap={4}>
                <Avatar
                  size='md'
                  name={vote.voter}
                  src={`https://api.dicebear.com/5.x/identicon/svg?seed=${vote.voter}`} // Example avatar
                />
                <HStack wrap={{ base: 'wrap', md: 'nowrap' }} gap={1}>
                  <FormattedAddress address={vote.voter} />
                  <Text>voted</Text>
                  <Code
                    variant='surface'
                    size={'sm'}
                    colorPalette={
                      vote.support === 'FOR'
                        ? 'green'
                        : vote.support === 'AGAINST'
                          ? 'red'
                          : vote.support === 'ABSTAIN'
                            ? 'yellow'
                            : 'gray'
                    }
                  >
                    {vote.support}
                  </Code>
                  <Text>
                    with <b>{vote.weight}</b> vote
                    {parseInt(vote.weight) > 1 ? 's' : ''}
                  </Text>
                </HStack>
              </HStack>
              {vote.reason && (
                <Box
                  bg='gray.100'
                  _dark={{ bg: 'bg.emphasized' }}
                  p={3}
                  borderRadius='md'
                >
                  <Text>{vote.reason}</Text>
                </Box>
              )}
            </VStack>
          </Card.Body>
        </Card.Root>
      ))}
    </Stack>
  );
}
