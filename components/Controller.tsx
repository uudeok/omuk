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
                내 페이지
            </Button>
            <Button size="lg" role="round" onClick={() => router.push('/community')}>
                커뮤니티
            </Button>
            <Button size="lg" role="round" onClick={() => router.push('store')}>
                가게홍보
            </Button>
        </div>
    );
};

export default Controller;
