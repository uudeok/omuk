'use client';

import styles from '../../../../styles/following.module.css';
import Button from '@/components/common/Button';
import useFollowStore from '@/shared/lib/store/useFollowStore';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery, useQueries } from '@tanstack/react-query';
import { getFollowingList } from '@/services/followService';
import { useInfiniteScroll } from '@/hooks';
import { getFollowingUserListsPaginated } from '@/services/userService';
import LoadingBar from '@/components/common/LoadingBar';
import Avatar from '@/components/common/Avatar';
import { getTotalPages } from '@/shared/utils/detailUtil';
import List, { ListRow } from '@/components/common/List';

const pageSize = 20;

const FollowingPage = () => {
    const router = useRouter();
    const { followingPagination } = useFollowStore();
    const totalPage = getTotalPages(followingPagination, pageSize);

    const {
        data: followingIds,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['paginatedReview'],
        queryFn: ({ pageParam }) => getFollowingList(pageParam, pageSize),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPageParam < totalPage) {
                return lastPageParam + 1;
            }
        },
        select: (data) => {
            return data.pages.flat().map((page) => page?.requestee_id);
        },
    });

    if (isFetchingNextPage) return <LoadingBar />;

    // if (followingIds && followingIds.length === 0) return <div>no data</div>;

    const follwingUserDatas = useQueries({
        queries:
            followingIds?.map((id) => ({
                queryKey: ['followingUser', id],
                queryFn: () => getFollowingUserListsPaginated(id!),
            })) || [],
        combine: (results) => {
            return {
                data: results.map((result) => result.data).flat(),
                pending: results.some((result) => result.isPending),
            };
        },
    });

    const { observerEl } = useInfiniteScroll({
        callbackFn: fetchNextPage,
        hasNextPage: hasNextPage,
    });

    if (follwingUserDatas.pending) return <LoadingBar />;

    return (
        <div>
            <Button size="sm" role="none" onClick={() => router.back()}>
                뒤로가기
            </Button>

            <div className={styles.following}>
                <List>
                    {follwingUserDatas?.data?.map((user) => (
                        <ListRow
                            key={user.id}
                            left={<Avatar profile={user} />}
                            right={
                                <div>
                                    <Button size="sm" role="round">
                                        방문
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
