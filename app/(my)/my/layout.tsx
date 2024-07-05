'use client';

import styles from '../../../styles/mypageLayout.module.css';
import Slide from '@/components/layout/Slide';
import { ReactNode } from 'react';
import Avatar from '@/components/common/Avatar';
import Alarm from '@/components/Alarm';
import { useSession } from '@/hooks';
import { ProfileType } from '@/services/userService';

const MypageLayout = ({ children }: { children: ReactNode }) => {
    const session = useSession();
    if (!session) return;

    console.log(session);

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
