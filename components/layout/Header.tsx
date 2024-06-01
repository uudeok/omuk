'use client';

import styles from '../../styles/header.module.css';
import { useRouter } from 'next/navigation';
import List, { ListRow } from '../common/List';
import Utensils from '../../assets/utensils.svg';
import Text from '../common/Text';

const Header = () => {
    const router = useRouter();

    const handleMypage = () => {
        /** 로그인 여부 확인 후 마이페이지 이동 */
        // router.push('/mypage');
        router.push('/login');
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
                        <div className={styles.mypage} onClick={handleMypage}>
                            MyPage
                        </div>
                    }
                />
            </List>
        </div>
    );
};

export default Header;
