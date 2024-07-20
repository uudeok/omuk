import { createClient } from '@/shared/lib/supabase/server-client';
import { CommunityReviewType } from '@/services/reviewService';
import { Suspense } from 'react';
import { generateSkeletonCards } from '@/shared/utils';
import dynamic from 'next/dynamic';

// STEP1. 'public' 으로 설정한 유저의 리뷰 총 갯수를 가져온다.
const getReviewTotalRows = async () => {
    const supabase = createClient();

    const { data, error }: any = await supabase
        .from('review')
        .select(
            `*,
        profiles!inner (id, username, avatar_url, email, expose)`
        )
        .eq('profiles.expose', 'public')
        .explain({ format: 'json', analyze: true });

    if (error) {
        throw new Error(error.message);
    }
    const actualRows = data[0].Plan.Plans[0]['Actual Rows'];

    return actualRows;
};

// STEP2. 'public' 으로 설정한 유저의 리뷰 데이터를 가져온다.
const fetchReviewsWithImages = async (pageParam: number, pageSize: number): Promise<CommunityReviewType[]> => {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();

    const user_id = userData?.user?.id || null;

    const { data, error } = await supabase
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

    const reviewsWithLikes = data.map((review) => {
        const likedByUser = review.review_likes.some((like: { user_id: string }) => like.user_id === user_id);
        return {
            ...review,
            likedByUser: likedByUser,
        };
    });

    return reviewsWithLikes;
};

const CommunintyComponent = dynamic(() => import('@/components/Community'), { ssr: false });

const CommunityPage = async () => {
    const initalPage = 0;
    const pageSize = 10;
    const totalReviews = await getReviewTotalRows();
    const initalReviews = await fetchReviewsWithImages(initalPage, pageSize);

    return (
        <Suspense fallback={generateSkeletonCards(5)}>
            <CommunintyComponent totalReviews={totalReviews} initalReviews={initalReviews} />
        </Suspense>
    );
};

export default CommunityPage;
