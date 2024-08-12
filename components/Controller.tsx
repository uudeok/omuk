'use client';

import styles from '../styles/components/controller.module.css';
import { useContext } from 'react';
import Button from './common/Button';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/shared/context/AuthProvider';
import Link from 'next/link';

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

            {/* <Link prefetch={true} href="/community"> */}

            <Button size="lg" role="round" onClick={() => redirectPage('community')}>
                커뮤니티
            </Button>
            {/* </Link> */}
        </div>
    );
};

export default Controller;
