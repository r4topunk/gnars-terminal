import { supabase } from '@/utils/database/supabase_server';
import { Editor } from '@/utils/database/types';

export const fetchAllEditors = async (): Promise<Editor[]> => {
  const { data, error } = await supabase
    .from('editors')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Error fetching editors: ${error.message}`);
  }

  return data;
};

export const fetchEditorById = async (id: number): Promise<Editor> => {
  const { data, error } = await supabase
    .from('editors')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Error fetching editor: ${error.message}`);
  }

  return data;
};

export const createEditor = async (editor: Editor): Promise<true> => {
  const { error } = await supabase.from('editors').insert([editor]);

  if (error) {
    throw new Error(`Error creating editor: ${error.message}`);
  }

  return true;
};

export const updateEditor = async (editor: Editor): Promise<true> => {
  const { error } = await supabase
    .from('editors')
    .update(editor)
    .eq('id', editor.id);

  if (error) {
    throw new Error(`Error updating editor: ${error.message}`);
  }

  return true;
};

export const deleteEditor = async (id: number): Promise<true> => {
  const { error } = await supabase.from('editors').delete().eq('id', id);

  if (error) {
    throw new Error(`Error deleting editor: ${error.message}`);
  }

  return true;
};
