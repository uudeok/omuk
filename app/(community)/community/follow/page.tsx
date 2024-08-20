import { Suspense } from 'react';
import Community from '@/components/Community';
import { generateSkeletonCards } from '@/shared/utils';
import { createClient } from '@/shared/lib/supabase/server-client';
import { CommunityReviewType } from '@/services/reviewService';

// STEP1. 팔로워한 유저의 ids 가져오기 (프로필 비공개 제외)
const getFollowerUserIds = async () => {
    const supabase = createClient();

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) return;

    const user_id = userData.user.id;

    const { data: followData, error } = await supabase
        .from('follow')
        .select(
            `requestee_id,
            profiles!follow_requestee_id_fkey1 !inner(expose)`
        )

        .eq('requester_id', user_id)
        .not('profiles.expose', 'eq', 'privacy');

    if (error) {
        throw new Error(error.message);
    }

    const followeeIds = followData.map((follow) => follow.requestee_id) as string[];

    return followeeIds;
};

const getFollowerReviewsWithImages = async (
    pageParam: number,
    pageSize: number,
    filter?: string
): Promise<CommunityReviewType[]> => {
    const supabase = createClient();
    const { data: userData, error: authError } = await supabase.auth.getUser();

    const user_id = userData?.user?.id || null;

    // Step 1: 팔로우한 유저의 ID를 가져옵니다.
    const followeeIds = await getFollowerUserIds();

    if (followeeIds && followeeIds.length === 0) return [];

    // Step 2: 해당 유저들의 리뷰를 가져옵니다.
    const { data: reviews, error: reviewError } = await supabase
        .from('review')
        .select(
            `
        *,
        review_images (images_url),
        profiles!inner (id, username, avatar_url, email),
        review_likes (user_id, review_id)
        `
        )
        .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1)
        .order('visitDate', { ascending: false })
        .in('user_id', followeeIds!)
        .not('profiles.expose', 'eq', 'privacy');

    if (reviewError) {
        throw new Error(reviewError.message);
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
    const initialPage = 0;
    const PAGE_SIZE = 10;

    const initialReviews = await getFollowerReviewsWithImages(initialPage, PAGE_SIZE);

    return (
        <Suspense fallback={generateSkeletonCards(5)}>
            <Community initialReviews={initialReviews} />
        </Suspense>
    );
};

export default FollowCommunityPage;
