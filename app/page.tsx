'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// mobile 로 접속 시 url 이동시킴

const HomePage = () => {
    const router = useRouter();

    useEffect(() => {
        const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
        const mobileDevice = /Mobi|Android/i.test(userAgent);

        if (mobileDevice) {
            router.push('/m');
        } else return;
    }, []);

    return;
};

export default HomePage;
