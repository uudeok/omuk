'use client';

import styles from '../../../styles/communityLayout.module.css';
import { ReactNode } from 'react';
import Slide from '@/components/layout/Slide';
import { useSession } from '@/hooks';
import { ProfileType } from '@/services/userService';
import Avatar from '@/components/common/Avatar';
import Text from '@/components/common/Text';
import User from '../../../assets/user.svg';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';

const BusinessLayout = ({ children }: { children: ReactNode }) => {
    const session = useSession();
    const router = useRouter();

    const profile = {
        avatar_url: session?.user.user_metadata.avatar_url,
        email: session?.user.email,
        username: session?.user.user_metadata.name,
        id: session?.user.id,
    } as ProfileType;

    return (
        <Slide styles={{ width: '352px', left: '352px' }}>
            <div className={styles.header}>
                {session ? (
                    <Avatar profile={profile} />
                ) : (
                    <div className={styles.user} onClick={() => router.push('/login')}>
                        <User width={27} />
                        <Text typography="t4">로그인 해주세요</Text>
                    </div>
                )}
            </div>

            <main>{children}</main>
        </Slide>
    );
};

export default BusinessLayout;
