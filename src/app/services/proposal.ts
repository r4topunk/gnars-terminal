import { gql } from '@apollo/client';
import apolloClient, { noCacheApolloClient } from '@/utils/apollo';
import { Address } from 'viem';

export interface Proposal {
  proposalId: Address;
  proposalNumber: number;
  title: string;
  proposer: Address;
  timeCreated: string;
  againstVotes: number;
  voteCount: number;
  quorumVotes: string;
  forVotes: number;
  abstainVotes: number;
  voteStart: string;
  voteEnd: string;
  queued: boolean;
  executed: boolean;
  canceled: boolean;
  vetoed: boolean;
  description?: string;
  votes: Vote[];
}

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

export async function fetchProposals(
  address: string,
  orderBy: string,
  orderDirection: string,
  first: number,
  where: object = {},
  showDescription: boolean = false
) {
  const _where = { dao: address, ...where };

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
      if (!showDescription) {
        const { description, ...rest } = proposal;
        return rest;
      }
      return proposal;
    });

    return proposals as Proposal[];
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao consultar propostas');
  }
}
