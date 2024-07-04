'use client';

import Text from '@/components/common/Text';
import Slide from '@/components/layout/Slide';
import { useRouter } from 'next/navigation';

const NotFound = () => {
    const router = useRouter();

    return (
        <Slide styles={{ width: '352px', left: '352px' }}>
            <Text typography="t1">존재하지 않는 페이지 입니다.</Text>
            <div onClick={() => router.push('/')}>홈으로</div>
        </Slide>
    );
};

export default NotFound;
