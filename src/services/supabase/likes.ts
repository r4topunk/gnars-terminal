import { supabase } from '@/utils/database/supabase_server';
import { Like } from '@/utils/database/types';

export const fetchAllLikes = async (): Promise<Like[]> => {
  const { data, error } = await supabase
    .from('likes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Error fetching likes: ${error.message}`);
  }

  return data;
};

// Since 'likes' might have a composite key, adjust the fetch by ID accordingly
export const fetchLikeById = async (
  propdate: number,
  user: string
): Promise<Like> => {
  const { data, error } = await supabase
    .from('likes')
    .select('*')
    .eq('propdate', propdate)
    .eq('user', user)
    .single();

  if (error) {
    throw new Error(`Error fetching like: ${error.message}`);
  }

  return data;
};

export const createLike = async (like: Like): Promise<true> => {
  const { error } = await supabase.from('likes').insert([like]);

  if (error) {
    throw new Error(`Error creating like: ${error.message}`);
  }

  return true;
};

export const deleteLike = async (
  propdate: number,
  user: string
): Promise<true> => {
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('propdate', propdate)
    .eq('user', user);

  if (error) {
    throw new Error(`Error deleting like: ${error.message}`);
  }

  return true;
};

// Note: Update operation might not be necessary for likes as it's typically a toggle action
