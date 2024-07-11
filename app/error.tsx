'use client';

import styles from '../styles/pages/errorPage.module.css';
import Slide from '@/components/layout/Slide';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';

const ErrorPage = ({ error, reset }: any) => {
    console.log(error);

    return (
        <Slide styles={{ width: '352px', left: '352px' }}>
            <div className={styles.error}>
                <Text typography="t5">데이터를 불러오는데 실패했습니다</Text>
                <Text typography="t5">혹은 잘못된 접근입니다.</Text>
                <Button size="sm" role="round" onClick={() => reset()}>
                    다시 시도하기
                </Button>
                <Button size="sm" role="round" onClick={() => (window.location.href = '/')}>
                    홈으로
                </Button>
            </div>
        </Slide>
    );
};

export default ErrorPage;
