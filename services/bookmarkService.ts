import { supabase } from '@/shared/lib/supabase';

// bookmark 데이터 가져오기
export const getBookmark = async (res_id: string) => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: isBookmark, error } = await supabase
        .from('bookmark')
        .select('*')
        .eq('res_id', res_id)
        .eq('user_id', user_id);

    if (error) {
        throw new Error(error.message);
    }

    return isBookmark;
};

export const postBookmark = async (res_id: string) => {
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: bookmark, error } = await supabase
        .from('bookmark')
        .insert([{ res_id: res_id, user_id: user_id }])
        .select();

    return bookmark;
};

export const deleteBookmark = async (res_id: string) => {
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { error } = await supabase.from('bookmark').delete().eq('user_id', user_id).eq('res_id', res_id).select();
};
