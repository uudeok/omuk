'use client';

import styles from '../../../styles/mypageLayout.module.css';
import Slide from '@/components/layout/Slide';
import { ReactNode } from 'react';
import Text from '@/components/common/Text';
import { useSession } from '@/hooks';

const MypageLayout = ({ children }: { children: ReactNode }) => {
    const session = useSession();
    const userInfo = session?.user.user_metadata;

    return (
        <Slide styles={{ width: '352px', left: '352px' }}>
            <div className={styles.header}>
                <div className={styles.avatar}>
                    <img src={userInfo?.avatar_url} width="50px" alt="img" />
                    <Text typography="t2">{userInfo?.name}</Text>
                </div>
            </div>
            <main className={styles.content}>{children}</main>
        </Slide>
    );
};

export default MypageLayout;
