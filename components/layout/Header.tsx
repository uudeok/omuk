'use client';

import styles from '../../styles/header.module.css';
import { useRouter } from 'next/navigation';
import List, { ListRow } from '../common/List';
import Utensils from '../../assets/utensils.svg';
import Text from '../common/Text';
import { signOut } from '@/shared/utils/authUtil';
import { Session } from '@supabase/supabase-js';
import { useContext } from 'react';
import { AuthContext } from '@/shared/context/AuthProvider';

const Header = () => {
    const router = useRouter();

    // console.log('header session', session);

    const session = useContext(AuthContext);

    const redirectPage = async () => {
        if (session) {
            await signOut();
            window.location.href = '/';
        } else {
            router.push('/login');
        }
    };

    return (
        <div className={styles.header}>
            <List>
                <ListRow
                    left={
                        <div onClick={() => router.push('/')}>
                            <Utensils width={18} />
                            <Text typography="t4">OMUK</Text>
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

// const Header = ({ session }: { session: Session | null }) => {

// const redirectPage = async () => {
//     if (session) {
//         router.push('/my');
//     } else {
//         router.push('/login');
//     }
// };

// right={
//     <div className={styles.mypage} onClick={redirectPage}>
//         MyPage
//     </div>
// }
