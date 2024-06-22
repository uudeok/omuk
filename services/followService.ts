import { createClient } from '@/shared/lib/supabase/brower-client';

export type FollowType = {
    requester_id: string;
    requestee_id: string;
    status: FollowStatusType;
};

export type FollowStatusType = {
    status: 'pending' | 'accepted';
};

// follow 요청하기
export const requestFollow = async ({
    requester_id,
    requestee_id,
}: {
    requester_id: string;
    requestee_id: string;
}): Promise<FollowType[]> => {
    const supabase = createClient();

    const { data: follow, error } = await supabase
        .from('follow')
        .insert([{ requester_id: requester_id, requestee_id: requestee_id }])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return follow;
};

// unfollow 하기 (follow 데이터 지우기)
export const requestUnFollow = async (requestee_id: string) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { error } = await supabase
        .from('follow')
        .delete()
        .eq('requester_id', user_id)
        .eq('requestee_id', requestee_id)
        .select();
};

// following list 가져오기 (주체 : 나 > 다른 사람)
export const getFollowingList = async () => {
    const supabase = createClient();

    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: followingList, error } = await supabase.from('follow').select('*').eq('requester_id', user_id);

    if (error) {
        throw new Error(error.message);
    }

    return followingList;
};

// follower list 가져오기 (주체 : 다른 사람 > 나)
export const getFollowerList = async () => {
    const supabase = createClient();

    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: followerList, error } = await supabase.from('follow').select('*').eq('requestee_id', user_id);

    if (error) {
        throw new Error(error.message);
    }

    return followerList;
};

// 나를 팔로우 한 사람이 있는지 확인
export const getFollowListByStatus = async (status: string) => {
    const supabase = createClient();

    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: followList, error } = await supabase
        .from('follow')
        .select('*')
        .eq('requestee_id', user_id)
        .eq('status', status);

    if (error) {
        throw new Error(error.message);
    }

    return followList;
};

// following 페이지 정보 (주쳬 : 나 > 다른사람)
export const getFollowingInfo = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: followingData, error } = await supabase
        .from('follow')
        .select('*')
        .eq('requester_id', user_id)
        .explain({ format: 'json', analyze: true });

    if (error) {
        throw new Error(error.message);
    }

    return followingData;
};

// follower 페이지 정보 (주쳬 : 다른 사람 > 나)
export const getFollowerInfo = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: followerData, error } = await supabase
        .from('follow')
        .select('*')
        .eq('requestee_id', user_id)
        .explain({ format: 'json', analyze: true });

    if (error) {
        throw new Error(error.message);
    }

    return followerData;
};

// 특정인과 팔로우 했는지 확인 (주체 : 나 > 다른 사람)
export const checkFollowing = async (requestee_id: string) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: isFollow, error } = await supabase
        .from('follow')
        .select('*')
        .eq('requester_id', user_id)
        .eq('requestee_id', requestee_id)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return isFollow;
};
