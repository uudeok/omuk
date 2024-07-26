'use client';

import styles from '../../../../styles/pages/following.module.css';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFollowingList, requestUnFollow } from '@/services/followService';
import { useInfiniteScroll } from '@/hooks';
import Avatar from '@/components/common/Avatar';
import List, { ListRow } from '@/components/common/List';
import Text from '@/components/common/Text';

const PAGE_SIZE = 20;

const FollowingPage = () => {
    const router = useRouter();

    const {
        data: followingList,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        refetch: refetchFollowingList,
    } = useInfiniteQuery({
        queryKey: ['followingList'],
        queryFn: ({ pageParam }) => getFollowingList(pageParam, PAGE_SIZE),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage && lastPage.length === PAGE_SIZE) {
                return lastPageParam + 1;
            }
        },
        select: (data) => {
            return data.pages.flatMap((page) => page);
        },
    });

    const { observerEl } = useInfiniteScroll({
        callbackFn: fetchNextPage,
        hasNextPage: hasNextPage,
    });

    const handleUnfollowRequest = async (requestee_id: string) => {
        const process = window.confirm('언팔로우 하시겠습니까?');
        if (process) {
            await requestUnFollow(requestee_id);
            refetchFollowingList();
        }
    };

    return (
        <div>
            <Button size="sm" role="none" onClick={() => router.back()}>
                뒤로가기
            </Button>

            <div className={styles.following}>
                <List>
                    <Text typography="t5">모든 팔로워 {followingList?.length}명</Text>
                    {followingList &&
                        followingList.map((following) => (
                            <ListRow
                                key={following.id}
                                left={<Avatar profile={following.profiles!} />}
                                right={
                                    <div>
                                        <Button
                                            size="sm"
                                            role="round"
                                            onClick={() => handleUnfollowRequest(following.requestee_id)}
                                        >
                                            취소
                                        </Button>
                                    </div>
                                }
                            ></ListRow>
                        ))}
                </List>
            </div>

            <div ref={observerEl} />
        </div>
    );
};

export default FollowingPage;
