import { gql } from '@apollo/client';
import apolloClient, { noCacheApolloClient } from '@/utils/apollo';
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
  transactionHash: Address
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

export async function fetchProposals(
  address: string,
  orderBy: string,
  orderDirection: string,
  first: number,
  where: object = {},
  showDescription: boolean = false
) {
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
