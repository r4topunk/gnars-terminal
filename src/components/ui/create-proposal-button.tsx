'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { LuPencilLine } from 'react-icons/lu';
import { useAccount } from 'wagmi';
import { Address } from 'viem';
import { useReadGovernorGetVotes, useReadGovernorProposalThreshold } from '@/hooks/wagmiGenerated';

function CheckIfProposalCanSubmitProposal() {
    const { address } = useAccount();
    const [canSubmit, setCanSubmit] = useState(false);
    const [currentTimestamp, setCurrentTimestamp] = useState<BigInt | null>(null);

    // Update the current timestamp
    useEffect(() => {
        const timestamp = Math.floor(Date.now() / 1000); // Convert to seconds
        setCurrentTimestamp(BigInt(timestamp));
    }, []);

    // Read votes dynamically
    const { data: votes, error: votesError } = useReadGovernorGetVotes({
        args: address && currentTimestamp ? [address as Address, currentTimestamp as bigint] : undefined,
    });

    // Read proposal threshold
    const { data: threshold } = useReadGovernorProposalThreshold();

    useEffect(() => {
        if (votes && threshold) {
            setCanSubmit(BigInt(votes) >= BigInt(threshold));
        }
    }, [votes, threshold]);

    // Debugging
    // useEffect(() => {
    //     console.log("Address:", address);
    //     console.log("Timestamp:", currentTimestamp);
    //     console.log("Votes:", votes);
    //     console.error("Votes Error:", votesError);
    // }, [address, currentTimestamp, votes, votesError]);

    return canSubmit;
}

export default function CreateProposalButton() {
    const canSubmit = CheckIfProposalCanSubmitProposal();

    return (
        <Button colorScheme="blue" variant="outline" disabled={!canSubmit}>
            <LuPencilLine />
        </Button>
    );
}
