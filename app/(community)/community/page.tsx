import { Suspense } from 'react';
import { generateSkeletonCards, getMetadata } from '@/shared/utils';
import Community from '@/components/Community';
import { createClient } from '@/shared/lib/supabase/server-client';
import { CommunityReviewType } from '@/services/reviewService';

const URL = 'https://pzcyaccpdcqzgqwcutut.supabase.co/rest/v1';

const getReivewDatas = async (pageParam: number, pageSize: number, filter?: string) => {
    const supabase = createClient();

    const { data: userData } = await supabase.auth.getSession();
    const access_token = userData.session?.access_token;
    const user_id = userData.session?.user.id;

    const response = await fetch(
        `${URL}/review?select=*,review_images(images_url),profiles(id,username,avatar_url,email,expose),review_likes(user_id,review_id)&order=created_at.desc&profiles.expose=eq.public&or=(profiles.not.is.null)`,
        {
            headers: {
                apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                // Authorization: `Bearer ${access_token}`,
                Range: `${pageParam}-${pageSize}`,
            },
            cache: 'no-store',
        }
    );

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const result = await response.json();

    if (user_id) {
        const reviewsWithLikes = result.map((review: CommunityReviewType) => {
            const likedByUser = review.review_likes.some((like: { user_id: string }) => like.user_id === user_id);
            return {
                ...review,
                likedByUser: likedByUser,
            };
        });
        return reviewsWithLikes;
    }
    const reviewWithoutLikes = result.map((review: CommunityReviewType) => ({
        ...review,
        likedByUser: false,
    }));

    return reviewWithoutLikes;
};

export const generateMetadata = async () => {
    return getMetadata();
};

const CommunityPage = async () => {
    const PAGE_SIZE = 10;
    const initialPage = 0;

    const initialReviews = await getReivewDatas(initialPage, PAGE_SIZE);

    return (
        <Suspense fallback={generateSkeletonCards(5)}>
            <Community initialReviews={initialReviews} />
        </Suspense>
    );
};

export default CommunityPage;
