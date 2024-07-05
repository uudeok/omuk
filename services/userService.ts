import { createClient } from '@/shared/lib/supabase/brower-client';

export type ProfileType = {
    id: string;
    username: string;
    email: string;
    avatar_url: string;
};

export const searchUserData = async (emailOrUsername: string): Promise<ProfileType> => {
    const supabase = createClient();

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .or(`email.eq.${emailOrUsername},username.eq.${emailOrUsername}`)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return profile;
};

// 팔로잉한 유저들 정보 가져오기
export const getFollowUserListsPaginated = async (requestee_id: string) => {
    const supabase = createClient();

    const { data: followingList, error } = await supabase.from('profiles').select('*').eq('id', requestee_id);

    if (error) {
        throw new Error(error.message);
    }

    return followingList;
};

export const getUserData = async () => {
    const supabase = createClient();

    const { data: userData } = await supabase.auth.getSession();

    if (!userData.session) return;

    const user_id = userData.session.user.id;

    const { data, error } = await supabase.from('profiles').select('*').eq('id', user_id).maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
