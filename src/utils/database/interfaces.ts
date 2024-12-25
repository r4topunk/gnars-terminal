export interface PropDateInterface {
  created_at: string;
  id: number;
  text: string;
  proposal: Proposal;
  author: User;
}

export interface Editor {
  created_at: string;
  id: number;
  proposal: string | null;
  user: string | null;
  proposalDetails?: Proposal | null;
  userDetails?: User | null;
}

export interface Proposal {
  created_at: string;
  dao: DAO | string;
  id: string;
  proposer: string;
}

export interface Like {
  created_at: string;
  propdate: number;
  user: string;
  propdateDetails?: PropDateInterface;
  userDetails?: User;
}

export interface DAO {
  auction: string | null;
  created_at: string;
  governor: string | null;
  metadata: string | null;
  name: string | null;
  token: string;
  treasury: string | null;
}

export interface User {
  created_at: string;
  e_address: string;
  f_id: number | null;
  f_username: string | null;
}
