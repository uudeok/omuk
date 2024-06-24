import { createClient } from '@/shared/lib/supabase/brower-client';

export type ProfileType = {
    id: string;
    username: string;
    email: string;
    avatar_url: string;
};

export const searchUserData = async (emailOrUsername: string): Promise<ProfileType> => {
    const supabase = createClient();

    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .or(`email.eq.${emailOrUsername},username.eq.${emailOrUsername}`)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return profiles;
};

// 팔로잉한 유저들 정보 가져오기
export const getFollowingUserListsPaginated = async (requestee_id: string, pageParam: number, pageSize: number) => {
    const supabase = createClient();

    const { data: followingList, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', requestee_id)
        .range((pageParam - 1) * pageSize, pageParam * pageSize - 1);

    if (error) {
        throw new Error(error.message);
    }

    return followingList;
};
