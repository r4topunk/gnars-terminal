import { DAO_ADDRESSES } from '@/utils/constants';
import { PropDateInterface } from '@/utils/database/interfaces';
import { supabase } from '@/utils/database/supabase_server';
import { PropDate } from '@/utils/database/types';
import { PostgrestError } from '@supabase/supabase-js';
import { Address } from 'viem';

export const fetchAllPropDates = async (): Promise<{
  data: PropDateInterface[] | null;
  error: PostgrestError | null;
}> => {
  const { data, error } = await supabase
    .from('propdates')
    .select(
      '*, proposal:proposals!inner(*), author:users!propdates_author_fkey(*)'
    )
    .eq('proposal.dao', DAO_ADDRESSES.token)
    .order('created_at', { ascending: false });

  return { data, error };
};

export const fetchAllPropDatesByProposalId = async (
  proposal: Address
): Promise<{
  data: PropDateInterface[] | null;
  error: PostgrestError | null;
}> => {
  const { data, error } = await supabase
    .from('propdates')
    .select('*, proposal:proposals(*), author:users!propdates_author_fkey(*)')
    .eq('proposal', proposal)
    .order('created_at', { ascending: false });

  return { data, error };
};

export const fetchAllPropDatesByAuthorId = async (
  author: Address
): Promise<{ data: PropDate[] | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from('propdates')
    .select('*, proposal:proposals(*), author:users!propdates_author_fkey(*)')
    .eq('proposal.author', author)
    .eq('dao', DAO_ADDRESSES.token)
    .order('created_at', { ascending: false });

  return { data, error };
};

export const fetchPropDateById = async (
  id: Address
): Promise<{ data: PropDate | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from('propdates')
    .select('*, proposal:proposals(*), author:users!propdates_author_fkey(*)')
    .eq('id', id)
    .eq('dao', DAO_ADDRESSES.token)
    .single();

  return { data, error };
};

export const createPropDate = async (propDate: PropDate) => {
  const { error } = await supabase.from('propdates').insert([propDate]);

  return { success: !error, error };
};

export const updatePropDate = async (propDate: PropDate) => {
  const { error } = await supabase
    .from('propdates')
    .update(propDate)
    .eq('id', propDate.id);

  return { success: !error, error };
};

export const deletePropDate = async (id: Address) => {
  const { error } = await supabase.from('propdates').delete().eq('id', id);

  return { success: !error, error };
};

export const fetchCompletePropDate = async (
  id: Address
): Promise<{ data: PropDate | null; error: PostgrestError | null }> => {
  const { data, error } = await supabase
    .from('propdates')
    .select(
      `
      *,
      author:users(*),
      proposal:proposals(*)
    `
    )
    .eq('id', id)
    .eq('dao', DAO_ADDRESSES.token)
    .single();

  return { data, error };
};
