import { supabase } from '@/shared/lib/supabase';

export const checkBookmark = async (res_id: string) => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: isBookmark, error } = await supabase
        .from('review')
        .select('*')
        .eq('res_id', res_id)
        .eq('user_id', user_id)
        .select('bookmark');

    if (error) {
        throw new Error(error.message);
    }

    return isBookmark[0].bookmark;
};

export const updateBookmark = async (bookmark: boolean, res_id: string) => {
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: isBookmark, error } = await supabase
        .from('review')
        .update({
            bookmark: bookmark,
        })
        .eq('res_id', res_id)
        .eq('user_id', user_id)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return isBookmark;
};
