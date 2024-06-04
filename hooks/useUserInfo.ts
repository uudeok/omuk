import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/shared/lib/supabase';
import { UserInfoType } from '@/shared/types';
import { UserMetadata } from '@supabase/supabase-js';

export const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState<UserInfoType | UserMetadata>();

    const getUserInfo = useCallback(async () => {
        const { data: authInfo, error } = await supabase.auth.getSession();

        if (error || !authInfo?.session) {
            console.error('Error fetching session:', error);
            return;
        }

        const user = authInfo.session.user;

        if (!user) {
            console.error('유저 정보를 찾을 수 없습니다.');
            return;
        }

        const user_id = user.identities?.[0]?.user_id;
        const userData = user.user_metadata;

        userData['user_id'] = user_id;

        setUserInfo(userData);
    }, []);

    useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);

    return { userInfo };
};
