'use client';

import styles from '../../../styles/communityLayout.module.css';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Slide from '@/components/layout/Slide';
import { useSession } from '@/hooks';
import Avatar from '@/components/common/Avatar';
import { ProfileType } from '@/services/userService';
import Text from '@/components/common/Text';
import User from '../../../assets/user.svg';

const CommunityLayout = ({ children }: { children: ReactNode }) => {
    const session = useSession();
    const router = useRouter();

    const profile = {
        avatar_url: session?.user.user_metadata.avatar_url,
        email: session?.user.email,
        username: session?.user.user_metadata.name,
        id: session?.user.id,
    } as ProfileType;

    return (
        <Slide styles={{ width: '352px', left: '352px', backgroundColor: '#f9fafb' }}>
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

export default CommunityLayout;

{
    /* <main className={styles.content}>{children}</main> */
}
