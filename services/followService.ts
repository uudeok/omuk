import { createClient } from '@/shared/lib/supabase/brower-client';

export type FollowType = {
    requester_id: string;
    requestee_id: string;
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

export const getFollowListByStatus = async (status: string) => {
    const supabase = createClient();

    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: followList, error } = await supabase
        .from('follow')
        .select('*')
        .eq('requester_id', user_id)
        .eq('status', status);

    if (error) {
        throw new Error(error.message);
    }

    return followList;
};
