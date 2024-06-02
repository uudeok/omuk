'use client';

import Slide from '@/components/Slide';
import { useRouter } from 'next/navigation';

const ErrorPage = ({ error, reset }: any) => {
    const router = useRouter();

    return (
        <Slide styles={{ width: '352px', left: '352px' }}>
            <h3>데이터를 불러오는데 실패했습니다. 혹은 잘못된 접근입니다.</h3>
            <button onClick={() => reset()}>Try again</button>
            <button onClick={() => router.back()}>홈으로</button>
        </Slide>
    );
};

export default ErrorPage;
