'use client';

import { useCallback, useContext, useEffect, useState } from 'react';
import { UserInfoType } from '@/shared/types';
import { UserMetadata } from '@supabase/supabase-js';
import { AuthContext } from '@/shared/context/AuthProvider';

export const useUserInfo = () => {
    const session = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState<UserInfoType | UserMetadata>();

    const getUserInfo = useCallback(async () => {
        if (!session) {
            return;
        }

        const user = session.user;

        if (!user) {
            console.error('유저 정보를 찾을 수 없습니다.');
            return;
        }

        const user_id = user.identities?.[0]?.user_id;
        const userData = user.user_metadata;

        userData['user_id'] = user_id;

        setUserInfo(userData);
    }, [session]);

    useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);

    return { userInfo };
};
