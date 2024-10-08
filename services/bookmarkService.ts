import { createClient } from '@/shared/lib/supabase/brower-client';

// bookmark 특정 음식점의 북마크 데이터 가져오기
export const getBookmark = async (res_id: string) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: bookmark, error } = await supabase
        .from('bookmark')
        .select('*')
        .eq('res_id', res_id)
        .eq('user_id', user_id);

    if (error) {
        throw new Error(error.message);
    }

    return bookmark;
};

export type BookmarkType = {
    res_id: string;
    placeName: string;
    category: string;
    address: string | undefined;
    user_id?: string;
    id?: number;
};

// bookmark 생성하기
export const postBookmark = async ({ res_id, category, address, placeName }: BookmarkType) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: bookmark, error } = await supabase
        .from('bookmark')
        .insert([
            {
                res_id: res_id,
                user_id: user_id,
                address: address,
                category: category,
                placeName: placeName,
            },
        ])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return bookmark;
};

// bookmark 지우기
export const deleteBookmark = async (res_id: string) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { error } = await supabase.from('bookmark').delete().eq('user_id', user_id).eq('res_id', res_id).select();
};

// bookmark 유저 북마크 리스트 가져오기
export const getBookmarkList = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: bookmarkList, error } = await supabase.from('bookmark').select('*').eq('user_id', user_id);

    if (error) {
        throw new Error(error.message);
    }

    return bookmarkList;
};

// // 사용자에 대한 북마크 목록을 페이지 단위로 가져오기
export const getUserBookmarksPaginated = async (pageParam: number, pageSize: number) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: bookmarkList, error } = await supabase
        .from('bookmark')
        .select('*')
        .eq('user_id', user_id)
        .range((pageParam - 1) * pageSize, pageParam * pageSize - 1);

    if (error) {
        throw new Error(error.message);
    }

    return bookmarkList;
};

export const findUserBookmark = async (res_id: string) => {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getSession();

    const user_id = userData?.session?.user.id || null;

    const { data, error } = await supabase
        .from('bookmark')
        .select('*')
        .eq('user_id', user_id)
        .eq('res_id', res_id)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
