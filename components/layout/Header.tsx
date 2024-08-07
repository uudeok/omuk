'use client';

import styles from '../../styles/layouts/header.module.css';
import { useRouter } from 'next/navigation';
import List, { ListRow } from '../common/List';
import Icons from '../common/Icons';
import Text from '../common/Text';
import { signOut } from '@/shared/utils';
import { useContext } from 'react';
import { AuthContext } from '@/shared/context/AuthProvider';

const Header = () => {
    const router = useRouter();
    const session = useContext(AuthContext);

    const redirectPage = async () => {
        if (session) {
            await signOut();
            router.replace('/');
        } else {
            router.push('/login');
        }
    };

    return (
        <div className={styles.header}>
            <List>
                <ListRow
                    left={
                        <div onClick={() => (window.location.href = '/')}>
                            <Icons.Utensils width={18} />
                            <Text typography="t4">MUKIROK</Text>
                        </div>
                    }
                    right={
                        <div className={styles.mypage} onClick={redirectPage}>
                            {session ? '로그아웃' : '로그인'}
                        </div>
                    }
                />
            </List>
        </div>
    );
};

export default Header;
