'use client';

import { useContext } from 'react';
import styles from '../styles/controller.module.css';
import Button from './common/Button';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/shared/context/AuthProvider';

const Controller = () => {
    const router = useRouter();
    const session = useContext(AuthContext);

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
            {/* <Button size="lg" role="round">
                준비중
            </Button> */}
        </div>
    );
};

export default Controller;
