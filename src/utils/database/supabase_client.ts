'use client';

import { createClient } from '@supabase/supabase-js';
import { SUPABASE } from '@/utils/constants';
import { Database } from './database.types';

if (!SUPABASE.url || !SUPABASE.public_key) {
  throw new Error('Missing SUPABASE env variables');
}

/**
 * Supabase client for public access
 * Use on client side
 */
export const supabase = createClient<Database>(
  SUPABASE.url,
  SUPABASE.public_key
);
