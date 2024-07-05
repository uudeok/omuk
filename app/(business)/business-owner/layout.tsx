'use client';

import styles from '../../../styles/communityLayout.module.css';
import { ReactNode } from 'react';
import Slide from '@/components/layout/Slide';
import { useSession } from '@/hooks';
import { ProfileType } from '@/services/userService';
import Avatar from '@/components/common/Avatar';
import Text from '@/components/common/Text';
import AddUser from '../../../assets/addUser.svg';

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
                {profile.avatar_url ? (
                    <Avatar profile={profile} />
                ) : (
                    <div className={styles.user}>
                        <AddUser width={30} />

                        <Text typography="t4">{profile.username}</Text>
                    </div>
                )}
            </div>
            <main>{children}</main>
        </Slide>
    );
};

export default BusinessLayout;
