import { supabase } from '@/utils/database/supabase_server';
import { DAO } from '@/utils/database/types';

export const fetchAllDaos = async (): Promise<DAO[]> => {
  const { data, error } = await supabase
    .from('dao')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Error fetching daos: ${error.message}`);
  }

  return data;
};

export const fetchDaoById = async (id: number): Promise<DAO> => {
  const { data, error } = await supabase
    .from('dao')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Error fetching dao: ${error.message}`);
  }

  return data;
};

export const createDao = async (dao: DAO): Promise<true> => {
  const { error } = await supabase.from('dao').insert([dao]);

  if (error) {
    throw new Error(`Error creating dao: ${error.message}`);
  }

  return true;
};

export const updateDao = async (dao: DAO): Promise<true> => {
  const { error } = await supabase
    .from('dao')
    .update(dao)
    .eq('token', dao.token);

  if (error) {
    throw new Error(`Error updating dao: ${error.message}`);
  }

  return true;
};

export const deleteDao = async (id: number): Promise<true> => {
  const { error } = await supabase.from('dao').delete().eq('id', id);

  if (error) {
    throw new Error(`Error deleting dao: ${error.message}`);
  }

  return true;
};
