import Community, { CommunityReviewType } from '@/components/Community';
import { createClient } from '@/shared/lib/supabase/server-client';

export const getPagination = async () => {
    const supabase = createClient();

    const { data, error }: any = await supabase.from('review').select('*').explain({ format: 'json', analyze: true });

    if (error) {
        throw new Error(error.message);
    }
    const actualRows = data[0].Plan.Plans[0]['Actual Rows'];

    return actualRows;
};

export const fetchReviewsWithImages = async (pageParam: number, pageSize: number): Promise<CommunityReviewType[]> => {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) return [];

    const user_id = userData.user.id;

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
        .range(pageParam, pageSize)
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
    const pageSize = 14;
    const totalReviews = await getPagination();
    const initalReviews = await fetchReviewsWithImages(initalPage, pageSize);

    return <Community totalReviews={totalReviews} initalReviews={initalReviews} />;
};

export default CommunityPage;
