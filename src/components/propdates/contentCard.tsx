'use client';

import { Proposal } from '@/app/services/proposal';
import { PropDateInterface } from '@/utils/database/interfaces';
import { isAddressEqualTo } from '@/utils/ethereum';
import {
  Avatar,
  Box,
  Card,
  HStack,
  Link,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useAvatar } from '@paperclip-labs/whisk-sdk/identity';
import { default as NextLink } from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import { FaEdit, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Address } from 'viem';
import { useAccount } from 'wagmi';
import Markdown from '../proposal/markdown';
import { FormattedAddress } from '../utils/names';
import PropdatesEditor from './editor';
import PropdatesLike from './like';
interface PropdatesContentCardProps {
  _propdates: PropDateInterface[];
  proposals: Proposal[];
  isMobile?: boolean;
}
export default function PropdatesContentCardList({
  _propdates,
  proposals,
  isMobile = false,
}: PropdatesContentCardProps) {
  return (
    <Stack gap={2} w='full'>
      {_propdates.map((propdate) => {
        const proposal = proposals.filter(
          (proposal) => proposal.proposalId === propdate.proposal.id
        )[0];
        return (
          <PropdatesContentCardContent
            key={propdate.id}
            propdate={propdate}
            proposal={proposal}
            isMobile={isMobile}
          />
        );
      })}
    </Stack>
  );
}

function ProfileAvatar({ address }: { address: Address }) {
  const { data: avatar, isLoading } = useAvatar({ address });

  return (
    <Avatar.Root>
      {isLoading ? (
        <Spinner size='md' />
      ) : (
        <>
          <Avatar.Image src={avatar || '/images/frames/icon.png'} />
        </>
      )}
    </Avatar.Root>
  );
}

export function PropdatesContentCardContent({
  propdate,
  proposal,
  setPropdates,
  isMobile,
}: {
  propdate: PropDateInterface;
  proposal?: Proposal;
  setPropdates?: Dispatch<SetStateAction<PropDateInterface[]>>;
  isMobile?: boolean;
}) {
  const { address } = useAccount();
  const [expanded, setExpanded] = useState(false);
  const showEditButton =
    !!setPropdates && isAddressEqualTo(propdate.author.e_address, address);

  return (
    <Card.Root
      size={isMobile ? 'sm' : 'md'}
      borderRadius='lg'
      variant='outline'
      w='full'
      maxW={{ base: '100vw', md: 'auto' }}
      maxH={expanded ? 'none' : '200px'}
      overflow='hidden'
      position='relative'
    >
      <Card.Body p={4}>
        <HStack gap={2} align='stretch'>
          <VStack gap={2} align='stretch' w='full'>
            <HStack justify={'space-between'} w='full'>
              <HStack>
                <ProfileAvatar address={propdate.author.e_address as Address} />
                <FormattedAddress
                  address={propdate.author.e_address as Address}
                />
                in{' '}
                {proposal && (
                  <Link asChild>
                    <NextLink
                      href={`/dao/proposal/${proposal?.proposalNumber}`}
                    >
                      proposal {proposal?.proposalNumber}
                    </NextLink>
                  </Link>
                )}
              </HStack>
              <HStack>
                {!isMobile && (
                  <Text color='fg.subtle'>
                    {new Date(propdate.created_at).toLocaleDateString()}
                  </Text>
                )}
                {expanded ? (
                  <FaEyeSlash
                    style={{ cursor: 'pointer', marginLeft: '8px' }}
                    onClick={() => setExpanded(false)}
                  />
                ) : (
                  <FaEye
                    style={{ cursor: 'pointer', marginLeft: '8px' }}
                    onClick={() => setExpanded(true)}
                  />
                )}
              </HStack>
            </HStack>
            <Box
              bg='gray.100'
              _dark={{ bg: 'bg.emphasized' }}
              p={3}
              borderRadius='md'
              overflow='hidden'
            >
              <Markdown text={propdate.text} />
            </Box>
            <HStack
              w={'full'}
              justify={showEditButton ? 'space-between' : 'end'}
            >
              {showEditButton && (
                <PropdatesEditor
                  proposalId={propdate.proposal.id}
                  setPropdates={setPropdates}
                  existingPropdate={propdate}
                  buttonProps={{ variant: 'ghost', size: 'sm' }}
                  buttonInnerChildren={
                    <>
                      <FaEdit />
                      <Text>Edit</Text>
                    </>
                  }
                />
              )}
              <PropdatesLike propdate={propdate} />
            </HStack>
          </VStack>
        </HStack>
      </Card.Body>
      {!expanded && (
        <Box
          position='absolute'
          bottom={0}
          left={0}
          right={0}
          h='20px'
          bgGradient='linear(to-t, white, transparent)'
          _dark={{ bgGradient: 'linear(to-t, black, transparent)' }}
          cursor='pointer'
          onClick={() => setExpanded(true)}
        />
      )}
    </Card.Root>
  );
}
