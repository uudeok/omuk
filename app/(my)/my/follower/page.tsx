'use client';

import styles from '../../../../styles/pages/follower.module.css';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import List, { ListRow } from '@/components/common/List';
import Avatar from '@/components/common/Avatar';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFollowerList, acceptedFollowRequest, cancleFollowRequest } from '@/services/followService';
import { useInfiniteScroll } from '@/hooks';
import Text from '@/components/common/Text';

const PAGE_SIZE = 20;

const FollowerPage = () => {
    const router = useRouter();

    // follower list 페이지네이션 가져오기
    const {
        data: followerList,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        refetch: refetchFollowerList,
    } = useInfiniteQuery({
        queryKey: ['followerList'],
        queryFn: ({ pageParam }) => getFollowerList(pageParam, PAGE_SIZE),
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

    const handleAcceptFollower = async (follower_id: string) => {
        await acceptedFollowRequest(follower_id);
        refetchFollowerList();
    };

    const handleRejectFollower = async (follower_id: string) => {
        const process = window.confirm('팔로우 요청을 거절하시겠습니까?');
        if (process) {
            await cancleFollowRequest(follower_id);
            refetchFollowerList();
        }
    };

    const pendingList = followerList?.filter((follower) => follower.status === 'pending');
    const acceptedList = followerList?.filter((follower) => follower.status === 'accepted');

    return (
        <div>
            <Button size="sm" role="none" onClick={() => router.back()}>
                뒤로가기
            </Button>

            <div className={styles.pending}>
                <List>
                    <Text typography="t5">팔로우 요청 {pendingList?.length}명</Text>

                    {pendingList?.map((follower) => (
                        <ListRow
                            key={follower.id}
                            left={<Avatar profile={follower.profiles} />}
                            right={
                                <div className={styles.button}>
                                    <Button
                                        size="sm"
                                        role="round"
                                        onClick={() => handleAcceptFollower(follower.requester_id)}
                                    >
                                        확인
                                    </Button>
                                    <Button
                                        size="sm"
                                        role="round"
                                        onClick={() => handleRejectFollower(follower.requester_id)}
                                    >
                                        취소
                                    </Button>
                                </div>
                            }
                        />
                    ))}
                </List>
            </div>

            <div className={styles.accepted}>
                <List>
                    <Text typography="t5">모든 팔로우 {acceptedList?.length}명 </Text>
                    {acceptedList?.map((follower) => (
                        <ListRow
                            key={follower.id}
                            left={<Avatar profile={follower.profiles} />}
                            right={
                                <div className={styles.button}>
                                    <Button
                                        size="sm"
                                        role="round"
                                        onClick={() => handleRejectFollower(follower.requester_id)}
                                    >
                                        취소
                                    </Button>
                                </div>
                            }
                        />
                    ))}
                </List>
            </div>

            <div ref={observerEl} />
        </div>
    );
};

export default FollowerPage;
