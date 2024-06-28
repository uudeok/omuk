import { createClient } from '@/shared/lib/supabase/brower-client';
import { uploadImages, updateImages } from './imageService';

export type ReviewType = {
    rate: number;
    positive: string[];
    negative: string[];
    res_id: string;
    placeName: string;
    visitDate: Date;
    companions: string | null;
    comment: string;
    id?: number;
    created_at?: string;
    files?: string[];
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
    comment,
    positive,
    negative,
    res_id,
    placeName,
    visitDate,
    companions,
    files = [],
}: ReviewType) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const { data: review, error } = await supabase
        .from('review')
        .insert([
            {
                rate: rate,
                comment: comment,
                positive: positive,
                negative: negative,
                res_id: res_id,
                placeName: placeName,
                visitDate: visitDate,
                companions: companions,
            },
        ])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    const review_id = review[0].id;

    if (files.length > 0) {
        await uploadImages(files, review_id);
    }
    return review;
};

// 리뷰 수정
export const updateReview = async ({
    rate,
    comment,
    positive,
    negative,
    res_id,
    placeName,
    visitDate,
    companions,
    files = [],
}: ReviewType) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: review, error } = await supabase
        .from('review')
        .update({
            rate: rate,
            comment: comment,
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

    console.log('추가된 files', files);

    if (files.length > 0) {
        await updateImages(files, review_id);
    }

    return review;
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

// review 페이지네이션
export const getReviewPageInfo = async () => {
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

// 리뷰 목록을 최신 순으로 페이지 단위로 가져오기
export const getPaginatedReviews = async (pageParam: number, pageSize: number): Promise<ReviewType[]> => {
    const supabase = createClient();

    const { data: reviewList, error } = await supabase
        .from('review')
        .select('*')
        .range((pageParam - 1) * pageSize, pageParam * pageSize - 1)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return reviewList;
};

// 리뷰 작성
// export const postReview = async ({
//     rate,
//     comment,
//     positive,
//     negative,
//     res_id,
//     placeName,
//     visitDate,
//     companions,
// }: ReviewType) => {
//     const supabase = createClient();
//     const { data } = await supabase.auth.getSession();

//     if (!data.session) return;

//     const { data: review, error } = await supabase
//         .from('review')
//         .insert([
//             {
//                 rate: rate,
//                 comment: comment,
//                 positive: positive,
//                 negative: negative,
//                 res_id: res_id,
//                 placeName: placeName,
//                 visitDate: visitDate,
//                 companions: companions,
//             },
//         ])
//         .select();

//     if (error) {
//         throw new Error(error.message);
//     }

//     return review;
// };

// 리뷰 수정
// export const updateReview = async ({
//     rate,
//     comment,
//     positive,
//     negative,
//     res_id,
//     placeName,
//     visitDate,
//     companions,
// }: ReviewType) => {
//     const supabase = createClient();
//     const { data } = await supabase.auth.getSession();

//     if (!data.session) return;

//     const user_id = data.session.user.id;

//     const { data: review, error } = await supabase
//         .from('review')
//         .update({
//             rate: rate,
//             comment: comment,
//             positive: positive,
//             negative: negative,
//             res_id: res_id,
//             placeName: placeName,
//             visitDate: visitDate,
//             companions: companions,
//         })
//         .eq('user_id', user_id)
//         .eq('res_id', res_id);

//     if (error) {
//         throw new Error(error.message);
//     }

//     return review;
// };
