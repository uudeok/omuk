import { createClient } from '@/shared/lib/supabase/brower-client';

export type FollowStatusType = {
    status: 'pending' | 'accepted';
};

export type FollowType = {
    requester_id: string;
    requestee_id: string;
    status: FollowStatusType;
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

// following list pagination 으로 가져오기 (주체 : 나 > 다른 사람)
export const getFollowingList = async (pageParam: number, pageSize: number): Promise<FollowType[] | undefined> => {
    const supabase = createClient();

    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: followingList, error } = await supabase
        .from('follow')
        .select('*')
        .eq('requester_id', user_id)
        .range((pageParam - 1) * pageSize, pageParam * pageSize - 1);

    if (error) {
        throw new Error(error.message);
    }

    return followingList;
};

// follower list 가져오기 (주체 : 다른 사람 > 나)
export const getFollowerList = async (pageParam: number, pageSize: number): Promise<FollowType[] | undefined> => {
    const supabase = createClient();

    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: followerList, error } = await supabase
        .from('follow')
        .select('*')
        .eq('requestee_id', user_id)
        .range((pageParam - 1) * pageSize, pageParam * pageSize - 1);

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

    const { data: followingData, error }: any = await supabase
        .from('follow')
        .select('*')
        .eq('requester_id', user_id)
        .explain({ format: 'json', analyze: true });

    if (error) {
        throw new Error(error.message);
    }

    const actualRows = followingData[0].Plan.Plans[0]['Actual Rows'];

    return actualRows;
};

// follower 페이지 정보 (주쳬 : 다른 사람 > 나)
export const getFollowerInfo = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: followerData, error }: any = await supabase
        .from('follow')
        .select('*')
        .eq('requestee_id', user_id)
        .explain({ format: 'json', analyze: true });

    if (error) {
        throw new Error(error.message);
    }

    const actualRows = followerData[0].Plan.Plans[0]['Actual Rows'];

    return actualRows;
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

// 팔로워한 유저들의 id 가져오기
export const getFollowerUserIds = async () => {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getSession();

    if (!userData.session) return;

    const user_id = userData.session.user.id;

    const { data: followData, error } = await supabase
        .from('follow')
        .select('requestee_id')
        .eq('requester_id', user_id);

    if (error) {
        throw new Error(error.message);
    }

    const followeeIds = followData.map((follow) => follow.requestee_id);

    return followeeIds;
};

//  팔로우한 유저의 리뷰 갯수 가져오기, 페이지네이션 정보
export const getFollowerReviewCount = async () => {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getSession();

    if (!userData.session) return;

    // Step 1: 팔로우한 유저의 ID를 가져옵니다.
    const followeeIds = await getFollowerUserIds();

    if (followeeIds && followeeIds.length === 0) {
        return 0;
    }

    // Step 2: 해당 유저들의 리뷰 갯수를 가져옵니다.
    const { data, error }: any = await supabase
        .from('review')
        .select('*')
        .in('user_id', followeeIds!)
        .explain({ format: 'json', analyze: true });

    if (error) {
        throw new Error(error.message);
    }
    const actualRows = data[0].Plan.Plans[0]['Actual Rows'];

    return actualRows;
};
