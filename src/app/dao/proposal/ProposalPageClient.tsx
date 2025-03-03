'use client';

import { Proposal } from '@/app/services/proposal';
import PropdatesTimeline from '@/components/propdates/timeline';
import CancelProposal from '@/components/proposal/cancel';
import CastVote from '@/components/proposal/castVote';
import ExecuteProposal from '@/components/proposal/execute';
import ProposalDescriptionContent from '@/components/proposal/ProposalDescriptionContent';
import ProposalTransactionsContent from '@/components/proposal/ProposalTransactionsContent';
import ProposalVotesContent from '@/components/proposal/ProposalVotesContent';
import QueueProposal from '@/components/proposal/queue';
import ProposalStatus from '@/components/proposal/status';
import { Tooltip } from '@/components/ui/tooltip';
import { FormattedAddress } from '@/components/utils/names';
import { Editor, PropDateInterface } from '@/utils/database/interfaces';
import {
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  IconButton,
  Stack,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEthereum } from 'react-icons/fa6';
import {
  LuArchive,
  LuArrowLeft,
  LuArrowRight,
  LuScroll,
  LuVote,
} from 'react-icons/lu';

interface ProposalPageClientProps {
  proposal: Proposal;
  proposalNumber: number;
  latestProposalNumber: number;
  propdates: PropDateInterface[] | null;
  editors: Editor[] | null;
}

export default function ProposalPageClient({
  proposal: defaultProposal,
  proposalNumber,
  latestProposalNumber,
  propdates: defaultPropdates = [],
  editors = [],
}: ProposalPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [proposal, setProposal] = useState<Proposal>(defaultProposal);
  const [propdates, setPropdates] = useState<PropDateInterface[]>(
    defaultPropdates || []
  );

  const tabMap = ['description', 'votes', 'transactions', 'propdates'];

  const [activeTab, setActiveTab] = useState(0);

  const tabFromQuery = searchParams?.get('t') || 'description';

  useEffect(() => {
    const tabIndex = tabMap.indexOf(tabFromQuery);
    setActiveTab(tabIndex >= 0 ? tabIndex : 0);
  }, [tabFromQuery]);

  const handleTabChange = (details: { value: string }) => {
    const tabValue = details.value;
    setActiveTab(tabMap.indexOf(tabValue));
    router.replace(`/dao/proposal/${proposalNumber}?t=${tabValue}`);
  };

  return (
    <Container maxW='container.lg' px={{ base: '0', md: '20%' }}>
      <VStack gap={4} align={'start'} w='full'>
        {/* Proposal Details */}
        <Box
          shadow='sm'
          w='full'
          padding={4}
          rounded='md'
          display='flex'
          flexDirection='column'
          gap={2}
          _dark={{ borderColor: 'yellow', borderWidth: 1 }}
        >
          <Stack
            direction={{ base: 'column', md: 'row' }}
            justify='space-between'
            w='full'
            data-state='open'
            _open={{
              animation: 'fade-in 300ms ease-out',
            }}
          >
            <HStack>
              {proposalNumber > 1 && (
                <Tooltip content='Previous Proposal'>
                  <Link href={`/dao/proposal/${proposalNumber - 1}`}>
                    <IconButton size={'xs'} variant={'ghost'}>
                      <LuArrowLeft />
                    </IconButton>
                  </Link>
                </Tooltip>
              )}
              <Heading size='md' as='h2'>
                Proposal {proposalNumber}
              </Heading>
              {proposalNumber < latestProposalNumber && (
                <Tooltip content='Next Proposal'>
                  <Link href={`/dao/proposal/${proposalNumber + 1}`}>
                    <IconButton size={'xs'} variant={'ghost'}>
                      <LuArrowRight />
                    </IconButton>
                  </Link>
                </Tooltip>
              )}
            </HStack>

            <HStack>
              <ProposalStatus proposal={proposal} />
              <FormattedAddress address={proposal.proposer} />
            </HStack>
          </Stack>

          <Heading
            size={{ base: '2xl', md: '4xl' }}
            as='h1'
            data-state='open'
            _open={{
              animation: 'fade-in 400ms ease-out',
            }}
          >
            {proposal.title || 'No Title Available'}
          </Heading>

          <HStack
            data-state='open'
            _open={{
              animation: 'fade-in 500ms ease-out',
            }}
          >
            <Box
              borderWidth={1}
              borderRadius='md'
              px={4}
              py={2}
              w='full'
              bg='bg.subtle'
            >
              <Heading size='md'>For</Heading>
              <Text
                fontWeight='bold'
                color={proposal.forVotes > 0 ? 'green.500' : 'fg.subtle'}
              >
                {proposal.forVotes}
              </Text>
            </Box>
            <Box
              borderWidth={1}
              borderRadius='md'
              px={4}
              py={2}
              w='full'
              bg='bg.subtle'
            >
              <Heading size='md'>Against</Heading>
              <Text
                fontWeight='bold'
                color={proposal.againstVotes > 0 ? 'red.500' : 'fg.subtle'}
              >
                {proposal.againstVotes}
              </Text>
            </Box>
            <Box
              key={proposal.proposalId}
              borderWidth={1}
              borderRadius='md'
              px={4}
              py={2}
              w='full'
              bg='bg.subtle'
            >
              <Heading size='md'>Abstain</Heading>
              <Text
                fontWeight='bold'
                color={proposal.abstainVotes > 0 ? 'yellow.500' : 'fg.subtle'}
              >
                {proposal.abstainVotes}
              </Text>
            </Box>
          </HStack>

          <CastVote proposal={proposal} setProposal={setProposal} />
          <QueueProposal proposal={proposal} setProposal={setProposal} />
          <ExecuteProposal proposal={proposal} setProposal={setProposal} />
          <CancelProposal proposal={proposal} setProposal={setProposal} />
        </Box>

        {/* Tabs */}
        <Box
          shadow={'sm'}
          w={'full'}
          padding={4}
          pt={2}
          rounded={'md'}
          _dark={{ borderColor: 'yellow', borderWidth: 1 }}
        >
          <Tabs.Root
            value={tabMap[activeTab]}
            onValueChange={handleTabChange}
            w='full'
            gap={0}
            fitted
            lazyMount
            size={'sm'}
          >
            <Tabs.List>
              <Tabs.Trigger
                value='description'
                display='flex'
                alignItems='center'
                border={0}
              >
                <Icon asChild display={{ base: 'none', md: 'block' }}>
                  <LuScroll />
                </Icon>
                <Text fontSize={'xs'}>Description</Text>
              </Tabs.Trigger>
              <Tabs.Trigger value='votes' display='flex' alignItems='center'>
                <Icon asChild display={{ base: 'none', md: 'block' }}>
                  <LuVote />
                </Icon>
                <Text fontSize={'xs'}>Votes</Text>
              </Tabs.Trigger>
              <Tabs.Trigger
                value='transactions'
                display='flex'
                alignItems='center'
              >
                <Icon asChild display={{ base: 'none', md: 'block' }}>
                  <FaEthereum />
                </Icon>
                <Text fontSize={'xs'}>Transactions</Text>
              </Tabs.Trigger>
              <Tabs.Trigger
                value='propdates'
                display='flex'
                alignItems='center'
              >
                <Icon asChild display={{ base: 'none', md: 'block' }}>
                  <LuArchive />
                </Icon>
                <Text fontSize={'xs'}>Propdates</Text>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value='description' pt={2}>
              <ProposalDescriptionContent proposal={proposal} />
            </Tabs.Content>
            <Tabs.Content value='votes' pt={2}>
              <ProposalVotesContent proposal={proposal} />
            </Tabs.Content>
            <Tabs.Content value='transactions' pt={2}>
              <ProposalTransactionsContent proposal={proposal} />
            </Tabs.Content>
            <Tabs.Content value='propdates' pt={2}>
              <PropdatesTimeline
                setPropdates={setPropdates}
                proposal={proposal}
                propdates={propdates}
                editors={editors || []}
              />
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </VStack>
    </Container>
  );
}
