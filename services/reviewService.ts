import { supabase } from '@/shared/lib/supabase';

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
};

export const postReview = async ({ rate, value, positive, negative, res_id }: ReviewType) => {
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
            },
        ])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return review;
};

export const updateReview = async ({ rate, value, positive, negative, res_id }: ReviewType) => {
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
        })
        .eq('user_id', user_id)
        .eq('res_id', res_id);

    if (error) {
        throw new Error(error.message);
    }

    return review;
};

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
