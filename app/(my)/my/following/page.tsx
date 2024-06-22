'use client';

import Button from '@/components/common/Button';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const FollowingPage = () => {
    const router = useRouter();

    return (
        <div>
            <Button size="sm" role="none" onClick={() => router.back()}>
                뒤로가기
            </Button>
        </div>
    );
};

export default FollowingPage;
