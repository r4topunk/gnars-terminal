'use client'

// Create Proposal Button 

import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useReadGovernorGetVotes } from '@/hooks/wagmiGenerated';
import { useReadGovernorProposalThreshold } from '@/hooks/wagmiGenerated';
import { useReadTokenTotalSupply } from '@/hooks/wagmiGenerated';
import { LuPencilLine } from 'react-icons/lu';


function CheckIfProposalCanSubmitProposal() {
    const { data: votes } = useReadGovernorGetVotes();
    const { data: threshold } = useReadGovernorProposalThreshold();
    const { data: totalSupply } = useReadTokenTotalSupply();
    const [canSubmit, setCanSubmit] = useState(false);
    useEffect(() => {
        if (votes && threshold && totalSupply) {
            setCanSubmit(votes >= threshold && votes >= totalSupply / 10n);
        }
    }, [votes, threshold, totalSupply]);
    console.log(canSubmit, votes, threshold, totalSupply);
    return canSubmit;
}

export default function CreateProposalButton() {
    const canSubmit = CheckIfProposalCanSubmitProposal();
    return (
        <Button colorScheme='blue' variant='outline' disabled={!canSubmit}>
            <LuPencilLine />
        </Button>
    );
}