import { createClient } from '@/shared/lib/supabase/server-client';
import { Suspense } from 'react';
import { CommunityReviewType } from '@/services/reviewService';
import Community from '@/components/Community';
import { generateSkeletonCards } from '@/shared/utils/uiUtil';

// STEP1. 팔로워한 유저 ids 가져온다.
const getFollowerIds = async () => {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    const user_id = userData.user.id;

    const { data: followData, error } = await supabase
        .from('follow')
        .select('requestee_id')
        .eq('requester_id', user_id);

    if (error) {
        throw new Error(error.message);
    }
    const followeeIds = followData.map((follow) => follow.requestee_id) as string[];

    return followeeIds;
};

// STEP2. 리뷰 테이블에서 해당 유저 ids 가 작성한 리뷰 갯수를 가져온다.
const getFollowReviewTotalRows = async () => {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const followeeIds = await getFollowerIds();

    if (followeeIds && followeeIds.length === 0) {
        return 0;
    }
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

// STEP3. 리뷰 테이블에서 초기 데이터를 가져온다.
const fetchFollowerReviewsWithImages = async (pageParam: number, pageSize: number): Promise<CommunityReviewType[]> => {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();

    const user_id = userData?.user?.id;

    const followeeIds = await getFollowerIds();
    if (followeeIds && followeeIds.length === 0) return [];

    const { data: reviews, error } = await supabase
        .from('review')
        .select(
            `
        *,
        review_images (images_url),
        profiles!inner (id, username, avatar_url, email),
        review_likes (user_id, review_id)
        `
        )
        .in('user_id', followeeIds!)
        .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    const reviewsWithLikes = reviews.map((review) => {
        const likedByUser = review.review_likes.some((like: { user_id: string }) => like.user_id === user_id);
        return {
            ...review,
            likedByUser,
        };
    });

    return reviewsWithLikes;
};

const FollowCommunityPage = async () => {
    const initalPage = 0;
    const pageSize = 15;
    const totalReviews = await getFollowReviewTotalRows();
    const initalReviews = await fetchFollowerReviewsWithImages(initalPage, pageSize);

    return (
        <Suspense fallback={generateSkeletonCards(5)}>
            <Community initalReviews={initalReviews} totalReviews={totalReviews} />
        </Suspense>
    );
};

export default FollowCommunityPage;
