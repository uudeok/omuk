'use client';

import Button from '@/components/common/Button';
import { getFollowingList } from '@/services/followService';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const FollowingPage = () => {
    const router = useRouter();

    const { data } = useQuery({
        queryKey: ['followingList'],
        queryFn: getFollowingList,
    });

    console.log(data);

    return (
        <div>
            <Button size="sm" role="none" onClick={() => router.back()}>
                뒤로가기
            </Button>
        </div>
    );
};

export default FollowingPage;
