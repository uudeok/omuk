import { Suspense } from 'react';
import { generateSkeletonCards, getMetadata } from '@/shared/utils';
import Community from '@/components/Community';
import { createClient } from '@/shared/lib/supabase/server-client';

const getReviewsWithImages = async (pageParam: number, pageSize: number, filter?: string) => {
    const supabase = createClient();

    const { data: userData } = await supabase.auth.getUser();
    const user_id = userData?.user?.id || null;

    const { data: reviewList, error } = await supabase
        .from('review')
        .select(
            `
            *,
            review_images (images_url),
            profiles!inner (id, username, avatar_url, email, expose),
            review_likes (user_id, review_id)
            `
        )
        .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1)
        .order('created_at', { ascending: false })
        .eq('profiles.expose', 'public');

    if (error) {
        throw new Error(error.message);
    }

    // 사용자 ID가 있는 경우, 로그인한 상태로 좋아요 여부를 확인합니다.
    if (user_id) {
        const reviewsWithLikes = reviewList.map((review) => {
            const likedByUser = review.review_likes.some((like: { user_id: string }) => like.user_id === user_id);
            return {
                ...review,
                likedByUser: likedByUser,
            };
        });
        return reviewsWithLikes;
    }

    // 로그인하지 않은 경우, 모든 리뷰에 대해 likedByUser 값을 false로 설정합니다.
    const reviewsWithoutLikes = reviewList.map((review) => ({
        ...review,
        likedByUser: false,
    }));

    return reviewsWithoutLikes;
};

export const generateMetadata = async () => {
    return getMetadata();
};

const CommunityPage = async () => {
    const PAGE_SIZE = 10;
    const initialPage = 0;

    const initialReviews = await getReviewsWithImages(initialPage, PAGE_SIZE);

    return (
        <Suspense fallback={generateSkeletonCards(5)}>
            <Community initialReviews={initialReviews} />
        </Suspense>
    );
};

export default CommunityPage;
