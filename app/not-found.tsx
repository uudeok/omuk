'use client';

import Button from '@/components/common/Button';
import styles from '../styles/notFound.module.css';
import Text from '@/components/common/Text';
import Slide from '@/components/layout/Slide';
import { useRouter } from 'next/navigation';

const NotFound = () => {
    const router = useRouter();

    return (
        <Slide styles={{ width: '352px', left: '352px' }}>
            <div className={styles.layout}>
                <Text typography="t2">존재하지 않는 페이지 입니다.</Text>
                <Button size="sm" role="round" onClick={() => router.push('/')}>
                    홈으로
                </Button>
            </div>
        </Slide>
    );
};

export default NotFound;
