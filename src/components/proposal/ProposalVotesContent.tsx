import {
  Card,
  Stack,
  Text,
  Box,
  Flex,
  Badge,
  VStack,
  HStack,
  Code,
} from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';
import { FormattedAddress } from '../utils/ethereum';
import { Tooltip } from '../ui/tooltip';

interface Vote {
  voter: string;
  support: string; // e.g., "FOR", "AGAINST", "ABSTAIN"
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
          {/* Header Section with Voter Information */}
          {/* <Card.Header>
            
          </Card.Header> */}

          {/* Body Section with Voting Details */}
          <Card.Body>
            <VStack gap={3} align='stretch'>
              <HStack gap={4}>
                {/* Voter Avatar and Address */}
                <Avatar
                  size='md'
                  name={vote.voter}
                  src={`https://api.dicebear.com/5.x/identicon/svg?seed=${vote.voter}`} // Example avatar
                />
                <HStack>
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
                  <Text>with {vote.weight} weight</Text>
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
