import { supabase } from '@/shared/lib/supabase';

// 특정 음식점 리뷰 데이터 가져오기
export const getReviewData = async (res_id: string) => {
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

type ReviewType = {
    rate: number;
    value: string;
    positive: string[];
    negative: string[];
    res_id: string;
    placeName: string;
};

// 리뷰 작성
export const postReview = async ({ rate, value, positive, negative, res_id, placeName }: ReviewType) => {
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const { data: review, error } = await supabase
        .from('review')
        .insert([
            {
                rate: rate,
                comment: value,
                positive: positive,
                negative: negative,
                res_id: res_id,
                placeName: placeName,
            },
        ])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return review;
};

// 리뷰 수정
export const updateReview = async ({ rate, value, positive, negative, res_id, placeName }: ReviewType) => {
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: review, error } = await supabase
        .from('review')
        .update({
            rate: rate,
            comment: value,
            positive: positive,
            negative: negative,
            res_id: res_id,
            placeName: placeName,
        })
        .eq('user_id', user_id)
        .eq('res_id', res_id);

    if (error) {
        throw new Error(error.message);
    }

    return review;
};

// user_id 로 작성한 모든 리뷰 가져오기 >  총 리뷰 갯수 확인용 수정 필요
export const getReviewList = async () => {
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: reviewList, error } = await supabase.from('review').select('*').eq('user_id', user_id).select();

    if (error) {
        throw new Error(error.message);
    }

    return reviewList;
};

// review 페이지네이션을 위한 정보
export const getReviewPageInfo = async () => {
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: reviewData, error } = await supabase
        .from('review')
        .select('*')
        .eq('user_id', user_id)
        .explain({ format: 'json', analyze: true });

    if (error) {
        throw new Error(error.message);
    }

    return reviewData;
};

// 사용자에 대한 리뷰 목록을 페이지 단위로 가져오기
export const getUserReviewsPaginated = async (pageParam: number, pageSize: number) => {
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    console.log('pageParam', pageParam);

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
