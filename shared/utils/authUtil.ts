import { supabase } from '../lib/supabase';

export const signOut = async () => {
    await supabase.auth.signOut();
};

export const checkReviewExists = async (user_id: string, res_id: string) => {
    const { data, error } = await supabase
        .from('review')
        .select('id')
        .eq('user_id', user_id)
        .eq('res_id', res_id)
        .single();

    if (error && error.code !== 'PGRST116') {
        // PGRST116 error code indicates no matching rows, so it can be ignored
        throw new Error(error.message);
    }

    console.log(data);

    return data !== null;
};
