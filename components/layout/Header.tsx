'use client';

import styles from '../../styles/header.module.css';
import { useRouter } from 'next/navigation';
import List, { ListRow } from '../common/List';
import Utensils from '../../assets/utensils.svg';
import Text from '../common/Text';
import { useContext } from 'react';
import { AuthContext } from '@/shared/context/AuthProvider';

const Header = () => {
    const router = useRouter();
    const session = useContext(AuthContext);

    const redirectPage = async () => {
        if (session) {
            router.push('/my');
        } else {
            router.push('/login');
        }
    };

    return (
        <div className={styles.header}>
            <List>
                <ListRow
                    left={
                        <div>
                            <Utensils width={18} />
                            <Text typography="t4">OMUK</Text>
                        </div>
                    }
                    right={
                        <div className={styles.mypage} onClick={redirectPage}>
                            MyPage
                        </div>
                    }
                />
            </List>
        </div>
    );
};

export default Header;
