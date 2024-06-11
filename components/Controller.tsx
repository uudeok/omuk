'use client';

import styles from '../styles/controller.module.css';
import Button from './common/Button';
import { useRouter } from 'next/navigation';

const Controller = () => {
    const router = useRouter();

    return (
        <div className={styles.controller}>
            <Button size="lg" role="round" onClick={() => router.push('/my')}>
                MyPage
            </Button>
            <Button size="lg" role="round" onClick={() => router.push('/my/review')}>
                방문한 음식점 보기
            </Button>
            <Button size="lg" role="round" onClick={() => router.push('/my/bookmark')}>
                즐겨찾기한 음식점 보기
            </Button>
        </div>
    );
};

export default Controller;
