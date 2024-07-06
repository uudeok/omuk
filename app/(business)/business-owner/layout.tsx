'use client';

import styles from '../../../styles/businessLayout.module.css';
import Slide from '@/components/layout/Slide';
import { ProfileType } from '@/services/userService';
import Avatar from '@/components/common/Avatar';
import { ReactNode } from 'react';
import { useSession } from '@/hooks';

const BusinessLayout = ({ children }: { children: ReactNode }) => {
    const session = useSession();

    const profile = {
        avatar_url: session?.user.user_metadata.avatar_url,
        email: session?.user.email,
        username: session?.user.user_metadata.name,
        id: session?.user.id,
    } as ProfileType;

    return (
        <Slide styles={{ width: '352px', left: '352px' }}>
            <div className={styles.header}>
                <Avatar profile={profile} />
            </div>

            <main className={styles.content}>{children}</main>
        </Slide>
    );
};

export default BusinessLayout;
