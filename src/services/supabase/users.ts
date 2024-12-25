import { supabase } from '@/utils/database/supabase_server';
import { User } from '@/utils/database/types';

export const fetchAllUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }

  return data;
};

export const fetchUserByAddress = async (e_address: string): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('e_address', e_address)
    .single();

  if (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }

  return data;
};

export const createUser = async (user: User): Promise<true> => {
  const { error } = await supabase.from('users').insert([user]);

  if (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }

  return true;
};

export const updateUser = async (user: User): Promise<true> => {
  const { error } = await supabase
    .from('users')
    .update(user)
    .eq('e_address', user.e_address);

  if (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }

  return true;
};

export const deleteUser = async (e_address: string): Promise<true> => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('e_address', e_address);

  if (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }

  return true;
};
