import { createClient } from '@/shared/lib/supabase/brower-client';

export type ReviewImageType = {
    id: number;
    created_at: string;
    user_id: string;
    review_id: number;
    images_url: string[] | File[];
};

// 이미지 업로드 함수
export const uploadImages = async (files: string[], review_id: string) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: reviewImages, error } = await supabase
        .from('review_images')
        .insert([
            {
                user_id: user_id,
                images_url: files,
                review_id: review_id,
            },
        ])
        .select();

    if (error) {
        throw new Error('이미지 업로드 중 오류 발생');
    }

    return reviewImages;
};

// 저장된 이미지 찾기
export const getImageData = async (review_id: string) => {
    const supabase = createClient();

    const { data: existingImages, error } = await supabase
        .from('review_images')
        .select('*')
        .eq('review_id', review_id)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return existingImages;
};

// 이미지 수정 함수
export const updateImages = async (files: string[], review_id: string) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const isExist = await getImageData(review_id);

    // 저장된 이미지가 있다면 수정, 없다면 생성

    if (isExist) {
        const { data: reviewImages, error } = await supabase
            .from('review_images')
            .update({
                user_id: user_id,
                images_url: files,
                review_id: review_id,
            })
            .eq('review_id', review_id)
            .select();

        if (error) {
            throw new Error('이미지 업로드 중 오류 발생');
        }

        return reviewImages;
    } else {
        await uploadImages(files, review_id);
    }
};
