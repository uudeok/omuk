import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/shared/lib/supabase';
import { UserMetadata } from '@supabase/supabase-js';

export const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState<UserMetadata | null>(null);

    const fetchUserInfo = useCallback(async () => {
        const authInfo = await supabase.auth.getSession();
        const userData = authInfo?.data?.session?.user?.user_metadata;

        if (userData) {
            setUserInfo(userData);
        }
    }, []);

    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo]);

    return userInfo;
};
