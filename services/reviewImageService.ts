import { createClient } from '@/shared/lib/supabase/brower-client';

export const updateImagesUrls = async (images_url: string[], review_id: number) => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session) return;

    const user_id = data.session.user.id;

    const { data: imageUrls, error } = await supabase
        .from('review_images')
        .update({
            images_url: images_url,
        })
        .eq('review_id', review_id)
        .eq('user_id', user_id)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return imageUrls;
};
