import { Database } from '@/shared/types/supabase';
import { createBrowserClient } from '@supabase/ssr';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export function createClient() {
    return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
}
