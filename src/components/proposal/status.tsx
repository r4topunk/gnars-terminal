import { Proposal } from '@/app/services/proposal';
import { Badge } from '@chakra-ui/react';
import { ReactNode } from 'react';

export enum Status {
  CANCELED = 'Canceled',
  QUEUED = 'Queued',
  EXECUTED = 'Executed',
  VETOED = 'Vetoed',
  PENDING = 'Pending',
  ACTIVE = 'Active',
  DEFEATED = 'Defeated',
  SUCCEEDED = 'Succeeded',
  EXPIRED = 'Expired',
}

export const getProposalStatus = (proposal: Proposal): Status => {
  if (proposal.canceled) return Status.CANCELED;
  if (proposal.queued) return Status.QUEUED;
  if (proposal.executed) return Status.EXECUTED;
  if (proposal.vetoed) return Status.VETOED;
  if (proposal.voteCount == 0) return Status.EXPIRED;

  const currentTime = new Date().getTime();
  const voteStartTime = parseInt(proposal.voteStart) * 1000;
  const voteEndTime = parseInt(proposal.voteEnd) * 1000;

  if (currentTime < voteStartTime) return Status.PENDING;
  if (currentTime > voteStartTime && currentTime < voteEndTime)
    return Status.ACTIVE;
  if (currentTime > voteEndTime) {
    return proposal.forVotes < parseInt(proposal.quorumVotes)
      ? Status.DEFEATED
      : Status.SUCCEEDED;
  }

  return Status.EXPIRED;
};

interface StatusBoxProps {
  colorPalette: string;
  children: ReactNode;
}

const StatusBox = ({ colorPalette, children }: StatusBoxProps) => {
  return (
    <Badge colorPalette={colorPalette} size={'sm'} variant={'surface'}>
      {children}
    </Badge>
  );
};

export default function ProposalStatus({ proposal }: { proposal: Proposal }) {
  const status = getProposalStatus(proposal);

  const statusColors: Record<Status, string> = {
    [Status.CANCELED]: 'red',
    [Status.QUEUED]: 'blue',
    [Status.EXECUTED]: 'purple',
    [Status.VETOED]: 'gray',
    [Status.PENDING]: 'gray',
    [Status.ACTIVE]: 'green',
    [Status.DEFEATED]: 'red',
    [Status.SUCCEEDED]: 'green',
    [Status.EXPIRED]: 'red',
  };

  return <StatusBox colorPalette={statusColors[status]}>{status}</StatusBox>;
}
