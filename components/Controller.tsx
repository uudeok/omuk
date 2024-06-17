'use client';

import styles from '../styles/controller.module.css';
import Button from './common/Button';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks';

const Controller = () => {
    const router = useRouter();
    const session = useSession();

    const redirectPage = (param: string) => {
        if (session) {
            router.push(`/${param}`);
        } else {
            router.push('/login');
        }
    };

    return (
        <div className={styles.controller}>
            <Button size="lg" role="round" onClick={() => redirectPage('my')}>
                MyPage
            </Button>
            <Button size="lg" role="round" onClick={() => redirectPage('my/review')}>
                방문한 음식점 보기
            </Button>
            <Button size="lg" role="round" onClick={() => redirectPage('my/bookmark')}>
                즐겨찾기한 음식점 보기
            </Button>
        </div>
    );
};

export default Controller;
