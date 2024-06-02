'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/mypageLayout.module.css';
import Slide from '@/components/Slide';
import Text from '@/components/common/Text';
import { useUserInfo } from '@/hooks';
import { signOut } from '@/shared/utils/authUtil';

const MypageLayout = ({ children }: { children: ReactNode }) => {
    const userInfo = useUserInfo();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.replace('/');
    };

    return (
        <Slide styles={{ width: '352px', left: '352px' }}>
            <div className={styles.header}>
                <div className={styles.avatar}>
                    <img src={userInfo?.avatar_url} width="50px" alt="user_name" />
                    <Text typography="t2">{userInfo?.name}</Text>
                </div>
                <div className={styles.logout} onClick={handleLogout}>
                    <Text typography="st3">로그아웃</Text>
                </div>
            </div>

            <main>{children}</main>
        </Slide>
    );
};

export default MypageLayout;