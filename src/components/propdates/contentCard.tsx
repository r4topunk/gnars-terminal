'use client';

import { PropDateInterface } from '@/utils/database/interfaces';
import {
  Box,
  Button,
  Card,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Address } from 'viem';
import EnsAvatar from '../ethereum/ens';
import Markdown from '../proposal/markdown';
import { FormattedAddress } from '../utils/ethereum';

interface PropdatesContentCardProps {
  propdates: PropDateInterface[];
}

export default function PropdatesContentCardList({
  propdates,
}: PropdatesContentCardProps) {
  return (
    <Stack gap={2} w='full'>
      {propdates.map((propdate) => (
        <PropdatesContentCardContent key={propdate.id} propdate={propdate} />
      ))}
    </Stack>
  );
}

function PropdatesContentCardContent({
  propdate,
}: {
  propdate: PropDateInterface;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card.Root size='md' borderRadius='lg' variant='outline'>
      <Card.Body p={4}>
        <VStack gap={3} align='stretch'>
          <HStack gap={4}>
            <EnsAvatar address={propdate.author.e_address as Address} />
            <HStack justify={'space-between'} w='full'>
              <FormattedAddress address={propdate.author.e_address} />
              <Text color='gray.500' fontSize={'sm'}>
                {new Date(propdate.created_at).toLocaleDateString()}
              </Text>
            </HStack>
          </HStack>
          <Box
            bg='gray.100'
            _dark={{ bg: 'bg.emphasized' }}
            p={3}
            borderRadius='md'
            maxHeight={isExpanded ? 'none' : '200px'}
            overflow='hidden'
          >
            <Markdown text={propdate.text} />
          </Box>
          <Button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Collapse' : `Read more`}
          </Button>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
