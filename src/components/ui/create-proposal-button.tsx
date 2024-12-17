'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { LuPencilLine } from 'react-icons/lu';
import { useAccount } from 'wagmi';
import { Address } from 'viem';
import { useRouter } from 'next/navigation'; // Use Next.js navigation
import { useReadGovernorGetVotes, useReadGovernorProposalThreshold } from '@/hooks/wagmiGenerated';

function useCanSubmitProposal() {
  const { address } = useAccount();
  const [canSubmit, setCanSubmit] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState<BigInt | null>(null);

  // Update the current timestamp
  useEffect(() => {
    const timestamp = Math.floor(Date.now() / 1000); // Convert to seconds
    setCurrentTimestamp(BigInt(timestamp));
  }, []);

  // Read votes dynamically
  const { data: votes } = useReadGovernorGetVotes({
    args: address && currentTimestamp ? [address as Address, currentTimestamp as bigint] : undefined,
  });

  // Read proposal threshold
  const { data: threshold } = useReadGovernorProposalThreshold();

  useEffect(() => {
    if (votes && threshold) {
      setCanSubmit(BigInt(votes) >= BigInt(threshold));
    }
  }, [votes, threshold]);

  return canSubmit;
}

export default function CreateProposalButton() {
  const canSubmit = useCanSubmitProposal();
  const router = useRouter(); // Initialize router

  const handleClick = () => {
    if (canSubmit) {
      router.push('/create-proposal'); // Navigate to the create proposal page
    }
  };

  return (
    <Button
      colorScheme="blue"
      variant="outline"
      disabled={!canSubmit}
      onClick={handleClick} // Handle navigation
    >
      <LuPencilLine />
    </Button>
  );
}

