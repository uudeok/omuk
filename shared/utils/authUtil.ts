import { createClient } from '../lib/supabase/brower-client';

export const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
};
