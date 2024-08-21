import { createClient } from '@/shared/lib/supabase/brower-client';

export type UserDetailType = {
    review_count: number;
    follower_count: number;
    following_count: number;
    bookmark_count: number;
    rating_total: number;
    badges: string[] | null;
};

export const getUserDetailData = async (): Promise<UserDetailType> => {
    const supabase = createClient();

    const { data } = await supabase.auth.getSession();

    const user_id = data?.session?.user.id || null;

    const { data: userData, error } = await supabase
        .from('user_detail')
        .select('*')
        .eq('user_id', user_id)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return userData;
};
