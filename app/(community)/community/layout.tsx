'use client';

import styles from '../../../styles/layouts/communityLayout.module.css';
import { ReactNode, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Slide from '@/components/layout/Slide';
import Avatar from '@/components/common/Avatar';
import { ProfileType } from '@/services/userService';
import Text from '@/components/common/Text';
import Icons from '../../../components/common/Icons';
import Button from '@/components/common/Button';
import { AuthContext } from '@/shared/context/AuthProvider';
import Link from 'next/link';

const CONTROLLER = [
    { key: '리뷰', path: '/community' },
    { key: '팔로워 리뷰', path: '/community/follow' },
];

const CommunityLayout = ({ children }: { children: ReactNode }) => {
    const session = useContext(AuthContext);
    const router = useRouter();
    const [selected, setSelected] = useState(0);

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
                        <Icons.User width={30} />
                        <Text typography="t4">로그인 해주세요</Text>
                    </div>
                )}
            </div>
            <div className={styles.controller}>
                {CONTROLLER.map((button, idx) => (
                    <Button
                        key={idx}
                        size="sm"
                        className={idx === selected ? styles.selected : ''}
                        onClick={() => {
                            router.push(`${button.path}`);
                            setSelected(idx);
                        }}
                    >
                        {button.key}
                    </Button>
                ))}
            </div>
            <main className={styles.content}>{children}</main>
        </Slide>
    );
};

export default CommunityLayout;

{
    /* <Link key={idx} prefetch={true} href={`${button.path}`} className={styles.button}>
<Button
    size="sm"
    className={idx === selected ? styles.selected : ''}
    onClick={() => {
        setSelected(idx);
    }}
>
    {button.key}
</Button>
</Link> */
}
