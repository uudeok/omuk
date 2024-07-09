import Community from '@/components/Community';
import { createClient } from '@/shared/lib/supabase/server-client';
import { CommunityReviewType } from '@/services/reviewService';
import { Suspense } from 'react';
import SkeletonCard from '@/components/SkeletonCard';

const getReviewTotalRows = async () => {
    const supabase = createClient();

    const { data, error }: any = await supabase.from('review').select('*').explain({ format: 'json', analyze: true });

    if (error) {
        throw new Error(error.message);
    }
    const actualRows = data[0].Plan.Plans[0]['Actual Rows'];

    return actualRows;
};

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
    profiles (id, username, avatar_url, email),
    review_likes (user_id, review_id)
  `
        )
        .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1)
        .order('created_at', { ascending: false });

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

const CommunityPage = async () => {
    const initalPage = 0;
    const pageSize = 15;
    const totalReviews = await getReviewTotalRows();
    const initalReviews = await fetchReviewsWithImages(initalPage, pageSize);
    const Array = [1, 2, 3, 4, 5];

    return (
        <Suspense
            fallback={Array.map((arr: number) => (
                <SkeletonCard key={arr} />
            ))}
        >
            <Community totalReviews={totalReviews} initalReviews={initalReviews} />
        </Suspense>
    );
};

export default CommunityPage;
