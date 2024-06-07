import { AuthContext } from '@/shared/context/AuthProvider';
import { useCallback, useContext } from 'react';
import { supabase } from '@/shared/lib/supabase';

export const useReviewData = () => {
    const session = useContext(AuthContext);

    const getReviewData = useCallback(
        async (res_id: string) => {
            if (!session) return;
            const user_id = session.user.id;

            const { data, error } = await supabase
                .from('review')
                .select('*')
                .eq('res_id', res_id)
                .eq('user_id', user_id)
                .select();
            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
        [session]
    );

    return { getReviewData };
};
