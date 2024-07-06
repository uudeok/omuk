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

// updateUser 메서드는 현재 로그인한 사용자의 정보를 업데이트합니다
export const updateAvatarUrl = async (url: string) => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.updateUser({
        data: { avatar_url: url },
    });

    if (error) {
        console.error('Error updating user:', error);
        throw new Error(error.message);
    }

    return data.user;
};
