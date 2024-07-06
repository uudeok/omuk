'use client';

import styles from '../../../styles/mypageLayout.module.css';
import Slide from '@/components/layout/Slide';
import { ReactNode, useContext } from 'react';
import Avatar from '@/components/common/Avatar';
import Alarm from '@/components/Alarm';
import { ProfileType } from '@/services/userService';
import { AuthContext } from '@/shared/context/AuthProvider';

const MypageLayout = ({ children }: { children: ReactNode }) => {
    const session = useContext(AuthContext);

    if (!session) return;

    const profile = {
        avatar_url: session.user.user_metadata.avatar_url,
        email: session.user.email,
        username: session.user.user_metadata.name,
        id: session.user.id,
    } as ProfileType;

    return (
        <Slide styles={{ width: '352px', left: '352px' }}>
            <div className={styles.header}>
                <Avatar profile={profile} />
                <Alarm />
            </div>

            <main className={styles.content}>{children}</main>
        </Slide>
    );
};

export default MypageLayout;
