import { createClient } from '@/shared/lib/supabase/brower-client';
import { ProfileType } from './userService';
import { ReviewLikesType } from './reviewLikeService';
import { getFollowerUserIds } from './followService';

export type ReviewType = {
    rate: number;
    positive: string[];
    negative: string[];
    res_id: string;
    placeName: string;
    visitDate: Date;
    companions: string | null;
    content: string;
    id?: number;
    created_at?: string;
    review_images?: ReviewImagesType[];
    profiles?: ProfileType;
    review_likes?: ReviewLikesType[];
};

export type ReviewImagesType = {
    images_url: string[];
};

// 유저_id 로 특정 음식점 리뷰 조회
export const getReviewData = async (res_id: string) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: review, error } = await supabase
        .from('review')
        .select('*')
        .eq('res_id', res_id)
        .eq('user_id', user_id)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return review;
};

// 새 리뷰 작성
export const postReview = async ({
    rate,
    content,
    positive,
    negative,
    res_id,
    placeName,
    visitDate,
    companions,
}: ReviewType) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: review, error } = await supabase
        .from('review')
        .insert([
            {
                rate: rate,
                content: content,
                positive: positive,
                negative: negative,
                res_id: res_id,
                placeName: placeName,
                visitDate: visitDate,
                companions: companions,
                user_id: user_id,
            },
        ])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    const review_id = review[0].id;

    return review_id;
};

// 리뷰 수정
export const updateReview = async ({
    rate,
    content,
    positive,
    negative,
    res_id,
    placeName,
    visitDate,
    companions,
}: ReviewType) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: review, error } = await supabase
        .from('review')
        .update({
            rate: rate,
            content: content,
            positive: positive,
            negative: negative,
            res_id: res_id,
            placeName: placeName,
            visitDate: visitDate,
            companions: companions,
        })
        .eq('user_id', user_id)
        .eq('res_id', res_id)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    const review_id = review[0].id;

    return review_id;
};

export const deleteReview = async (res_id: string) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { error } = await supabase.from('review').delete().eq('user_id', user_id).eq('res_id', res_id).select();

    if (error) {
        throw new Error(error.message);
    }
};

// 유저_id 로 작성한 모든 리뷰 가져오기
export const getReviewList = async (): Promise<ReviewType[] | undefined | []> => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: reviewList, error } = await supabase.from('review').select('*').eq('user_id', user_id).select();

    if (error) {
        throw new Error(error.message);
    }

    return reviewList;
};

// review 데이터 총 갯수 가져오기
export const getReviewTotalReviews = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: reviewData, error }: any = await supabase
        .from('review')
        .select('*')
        .eq('user_id', user_id)
        .explain({ format: 'json', analyze: true });

    if (error) {
        throw new Error(error.message);
    }

    const actualRows = reviewData[0].Plan.Plans[0]['Actual Rows'];

    return actualRows;
};

// 사용자에 대한 리뷰 목록을 페이지 단위로 가져오기
export const getPaginatedUserReviews = async (
    pageParam: number,
    pageSize: number
): Promise<ReviewType[] | undefined> => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: reviewList, error } = await supabase
        .from('review')
        .select('*')
        .eq('user_id', user_id)
        .range((pageParam - 1) * pageSize, pageParam * pageSize - 1);

    if (error) {
        throw new Error(error.message);
    }

    return reviewList;
};

export type CommunityReviewType = {
    id: number;
    created_at: string;
    res_id: string;
    user_id: string;
    rate: number;
    content: string;
    positive: string[];
    negative: string[];
    placeName: string;
    companions: string;
    visitDate: string;
    review_images: ReviewImagesType[];
    profiles: ProfileType;
    review_likes: ReviewLikesType[];
    likedByUser: boolean;
};

// 리뷰 목록을 최신 순으로 페이지 단위로 가져오기
export const getPaginatedReviewsWithImages = async (
    pageParam: number,
    pageSize: number
): Promise<CommunityReviewType[]> => {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getSession();

    const user_id = userData?.session?.user.id || null;

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
        .range((pageParam - 1) * pageSize, pageParam * pageSize - 1)
        .order('created_at', { ascending: false })
        .eq('profiles.expose', 'public');

    if (error) {
        throw new Error(error.message);
    }

    const reviewsWithLikes = reviewList.map((review) => {
        const likedByUser = review.review_likes.some((like: { user_id: string }) => like.user_id === user_id);
        return {
            ...review,
            likedByUser: likedByUser,
        };
    });

    return reviewsWithLikes;
};

// 팔로우한 유저의 ID 를 조회해 해당 유저들의 리뷰를 가져온다
export const getFollowerReviewsWithImages = async (
    pageParam: number,
    pageSize: number
): Promise<CommunityReviewType[]> => {
    const supabase = createClient();
    const { data: userData, error } = await supabase.auth.getSession();

    const user_id = userData?.session?.user.id || null;

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
        .range((pageParam - 1) * pageSize, pageParam * pageSize - 1)
        .order('created_at', { ascending: false })
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
