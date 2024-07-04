import { createClient } from '@/shared/lib/supabase/brower-client';

export type ReviewLikesType = {
    user_id: string;
    review_id: number;
};

// 리뷰 좋아요 버튼 눌렀을때
export const addReviewLike = async (review_id: number) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: addLike, error } = await supabase
        .from('review_likes')
        .insert([
            {
                user_id: user_id,
                review_id: review_id,
            },
        ])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return addLike;
};

// 리뷰 좋아요 취소
export const removeReviewLike = async (review_id: number) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: removeLike, error } = await supabase
        .from('review_likes')
        .delete()
        .eq('user_id', user_id)
        .eq('review_id', review_id)
        .select();
};
