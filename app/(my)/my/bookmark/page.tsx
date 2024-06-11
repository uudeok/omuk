'use client';

import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

const MyBookmark = () => {
    const router = useRouter();

    return (
        <div>
            <Button size="sm" role="none" onClick={() => router.back()}>
                뒤로가기
            </Button>
        </div>
    );
};

export default MyBookmark;
