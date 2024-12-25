import { Database } from './database.types';

export type PropDate = Database['public']['Tables']['propdates']['Row'];
export type Editor = Database['public']['Tables']['editors']['Row'];
export type Proposal = Database['public']['Tables']['proposals']['Row'];
export type Like = Database['public']['Tables']['likes']['Row'];
export type DAO = Database['public']['Tables']['dao']['Row'];
export type User = Database['public']['Tables']['users']['Row'];
