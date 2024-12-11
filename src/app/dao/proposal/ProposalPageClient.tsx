'use client';

import { Proposal } from '@/app/services/proposal';
import CastVote from '@/components/proposal/castVote';
import ProposalStatus from '@/components/proposal/status';
import { FormattedAddress } from '@/components/utils/ethereum';
import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LuArchive, LuScroll, LuVote } from 'react-icons/lu';
import ProposalDescriptionContent from '@/components/proposal/ProposalDescriptionContent';
import ProposalVotesContent from '@/components/proposal/ProposalVotesContent';
import ProposalTransactionsContent from '@/components/proposal/ProposalTransactionsContent';
import { FaEthereum } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { Tabs } from '@chakra-ui/react';

interface ProposalPageClientProps {
    proposal: Proposal;
    proposalNumber: number;
    latestProposalNumber: number;
}

export default function ProposalPageClient({
    proposal,
    proposalNumber,
    latestProposalNumber,
}: ProposalPageClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

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
        <VStack gap={4} align={'start'} w="full">
            {/* Proposal Details */}
            <Box shadow="sm" w="full" padding={4} rounded="md" display="flex" flexDirection="column" gap={2}>
                <HStack justify="space-between" w="full">
                    <HStack>
                        {proposalNumber > 1 && (
                            <Link href={`/dao/proposal/${proposalNumber - 1}`}>
                                <button>←</button>
                            </Link>
                        )}
                        <Heading size="md" as="h2">
                            Proposal {proposalNumber}
                        </Heading>
                        {proposalNumber < latestProposalNumber && (
                            <Link href={`/dao/proposal/${proposalNumber + 1}`}>
                                <button>→</button>
                            </Link>
                        )}
                    </HStack>

                    <HStack>
                        <FormattedAddress address={proposal.proposer} />
                        <ProposalStatus proposal={proposal} />
                    </HStack>
                </HStack>

                <Heading size="4xl" as="h1">
                    {proposal.title || 'No Title Available'}
                </Heading>

                <HStack>
                    <Box borderWidth={1} borderRadius="md" px={4} py={2} w="full" bg="bg.subtle">
                        <Heading size="md">For</Heading>
                        <Text fontWeight="bold" color={proposal.forVotes > 0 ? 'green.500' : 'fg.subtle'}>
                            {proposal.forVotes}
                        </Text>
                    </Box>
                    <Box borderWidth={1} borderRadius="md" px={4} py={2} w="full" bg="bg.subtle">
                        <Heading size="md">Against</Heading>
                        <Text fontWeight="bold" color={proposal.againstVotes > 0 ? 'red.500' : 'fg.subtle'}>
                            {proposal.againstVotes}
                        </Text>
                    </Box>
                    <Box
                        key={proposal.proposalId}
                        borderWidth={1}
                        borderRadius="md"
                        px={4}
                        py={2}
                        w="full"
                        bg="bg.subtle"
                    >
                        <Heading size="md">Abstain</Heading>
                        <Text fontWeight="bold" color={proposal.abstainVotes > 0 ? 'yellow.500' : 'fg.subtle'}>
                            {proposal.abstainVotes}
                        </Text>
                    </Box>
                </HStack>

                <CastVote proposal={proposal} />
            </Box>

            {/* Tabs */}
            <Tabs.Root
                value={tabMap[activeTab]}
                onValueChange={handleTabChange}
                variant="enclosed"
                w="full"
            >
                <Tabs.List display="flex" justifyContent="center" gap={4}>
                    <Tabs.Trigger value="description" display="flex" alignItems="center">
                        <LuScroll />
                        <Text ml={2}>Description</Text>
                    </Tabs.Trigger>
                    <Tabs.Trigger value="votes" display="flex" alignItems="center">
                        <LuVote />
                        <Text ml={2}>Votes</Text>
                    </Tabs.Trigger>
                    <Tabs.Trigger value="transactions" display="flex" alignItems="center">
                        <FaEthereum />
                        <Text ml={2}>Transactions</Text>
                    </Tabs.Trigger>
                    <Tabs.Trigger value="propdates" display="flex" alignItems="center">
                        <LuArchive />
                        <Text ml={2}>Propdates</Text>
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
                    <ProposalTransactionsContent proposal={proposal} />
                </Tabs.Content>
                <Tabs.Content value="propdates">
                    <Text>Soon...</Text>
                </Tabs.Content>

            </Tabs.Root>
        </VStack>
    );
}
