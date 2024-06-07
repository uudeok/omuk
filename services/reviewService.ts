import { supabase } from '@/shared/lib/supabase';

export const getReviewData = async (res_id: string) => {
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: review, error } = await supabase
        .from('review')
        .select('*')
        .eq('res_id', res_id)
        .eq('user_id', user_id)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return review;
};
