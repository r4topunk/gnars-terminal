import { Address } from 'viem';

export const WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string;
export const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY as string;
export const RPC_URL = `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;
export const GRAPHQL_URL =
  'https://api.goldsky.com/api/public/project_clkk1ucdyf6ak38svcatie9tf/subgraphs/nouns-builder-base-mainnet/stable/gn';

export const DAO_ADDRESSES = {
  token: process.env.NEXT_PUBLIC_TOKEN as Address,
  metadata: process.env.NEXT_PUBLIC_METADATA as Address,
  auction: process.env.NEXT_PUBLIC_AUCTION as Address,
  treasury: process.env.NEXT_PUBLIC_TREASURY as Address,
  governor: process.env.NEXT_PUBLIC_GOVERNOR as Address,
};
