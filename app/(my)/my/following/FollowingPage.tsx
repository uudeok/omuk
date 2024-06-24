'use client';
import Button from '@/components/common/Button';
import { getFollowingInfo2, searchUserData } from '@/services/userService';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const FollowingPage = () => {
    const router = useRouter();

    const { data: followingList } = useQuery({
        queryKey: ['followingList'],
        queryFn: getFollowingInfo2,
    });

    const requestee_ids = followingList?.map((follow) => follow.requestee_id);
    console.log(requestee_ids);

    if (!followingList) return;

    const combinedQueries = useQueries({
        queries: followingList.map((follow) => ({
            queryKey: [follow.requestee_id],
            queryFn: () => searchUserData(follow.requestee_id),
        })),
    });

    return (
        <div>
            <Button size="sm" role="none" onClick={() => router.back()}>
                뒤로가기
            </Button>
        </div>
    );
};
