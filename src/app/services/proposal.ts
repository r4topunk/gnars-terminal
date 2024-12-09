import { noCacheApolloClient } from '@/utils/apollo';
import { gql } from '@apollo/client';
import { Address } from 'viem';

export type Proposal = {
  proposalId: Address;
  proposalNumber: number;
  description: string;
  forVotes: number;
  againstVotes: number;
  abstainVotes: number;
  expiresAt: number | null;
  proposer: Address;
  snapshotBlockNumber: number;
  status: string;
  title: string;
  transactionHash: Address;
  voteEnd: string;
  voteStart: string;
  calldatas: string;
  descriptionHash: Address;
  executableFrom: number;
  targets: string[];
  values: string[];
  timeCreated: number;
  executed: boolean;
  canceled: boolean;
  queued: boolean;
  vetoed: boolean;
  quorumVotes: string;
  voteCount: number;
  dao: {
    id: `0x${string}`;
    name: string;
  };
  votes: Vote[];
};

export type ProposalWithThumbnail = Proposal & {
  thumbnail?: string;
};

interface Vote {
  weight: string;
  voter: Address;
  support: 'FOR' | 'AGAINST' | 'ABSTAIN';
  reason: string;
}

const GET_DATA = gql`
  query Proposals(
    $where: Proposal_filter
    $orderBy: Proposal_orderBy
    $orderDirection: OrderDirection
    $first: Int
  ) {
    proposals(
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
    ) {
      proposalId
      proposalNumber
      title
      proposer
      timeCreated
      quorumVotes
      againstVotes
      forVotes
      abstainVotes
      calldatas
      values
      targets
      voteStart
      voteEnd
      queued
      executed
      canceled
      vetoed
      voteCount
      description
      votes {
        weight
        voter
        support
        reason
      }
    }
  }
`;

const extractThumbnail = (description: string): string | undefined => {
  const match = description.match(/!\[.*?\]\((.*?)\)/);
  return match ? match[1] : undefined;
};

export async function fetchProposals(
  address: string,
  orderBy: string,
  orderDirection: string,
  first: number,
  where: object = {},
  showDescription: boolean = false,
  showThumbnail: boolean = false
): Promise<ProposalWithThumbnail[]> {
  const _where = { dao: address.toLocaleLowerCase(), ...where };

  try {
    let { data } = await noCacheApolloClient.query({
      query: GET_DATA,
      variables: {
        where: _where,
        orderBy,
        orderDirection,
        first,
      },
    });

    const proposals = data.proposals.map((proposal: Proposal) => {
      let result: ProposalWithThumbnail = proposal;

      if (!showDescription) {
        const { description, ...rest } = proposal;
        result = rest as ProposalWithThumbnail;
      }

      if (showThumbnail) {
        const thumbnail = extractThumbnail(proposal.description);
        result = { ...result, thumbnail };
      }

      return result;
    });

    return proposals as ProposalWithThumbnail[];
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao consultar propostas');
  }
}
