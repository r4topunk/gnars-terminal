import { createClient } from '@supabase/supabase-js';
import { SUPABASE } from '@/utils/constants';
import { Database } from './database.types';

if (!SUPABASE.url || !SUPABASE.private_key) {
  throw new Error('Missing SUPABASE env variables');
}

/**
 * Supabase client for private access
 * Use on server side
 */
export const supabase = createClient<Database>(
  SUPABASE.url,
  SUPABASE.private_key
);
