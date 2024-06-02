'use client';

import { ReactNode } from 'react';
import styles from '../../../styles/mypageLayout.module.css';
import Slide from '@/components/Slide';
import Text from '@/components/common/Text';
import { useUserInfo } from '@/hooks';

const MypageLayout = ({ children }: { children: ReactNode }) => {
    const userInfo = useUserInfo();

    // console.log(userInfo);

    return (
        <Slide styles={{ width: '352px', left: '352px' }}>
            <div className={styles.header}>
                <img src={userInfo?.avatar_url} width="50px" alt="user_name" />
                <Text typography="t2">{userInfo?.name}</Text>
            </div>

            <main>{children}</main>
        </Slide>
    );
};

export default MypageLayout;
