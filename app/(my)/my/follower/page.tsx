'use client';

import styles from '../../../../styles/following.module.css';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import List, { ListRow } from '@/components/common/List';
import Avatar from '@/components/common/Avatar';
import useFollowStore from '@/shared/lib/store/useFollowStore';
import { getTotalPages } from '@/shared/utils/detailUtil';
import { useInfiniteQuery, useQueries } from '@tanstack/react-query';
import { getFollowerList } from '@/services/followService';
import { getFollowUserListsPaginated } from '@/services/userService';
import { useInfiniteScroll } from '@/hooks';

const pageSize = 20;

const FollowerPage = () => {
    const router = useRouter();
    const { followerPagination } = useFollowStore();
    const totalPage = getTotalPages(followerPagination, pageSize);

    const {
        data: followerIds,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['followerList'],
        queryFn: ({ pageParam }) => getFollowerList(pageParam, pageSize),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPageParam < totalPage) {
                return lastPageParam + 1;
            }
        },
        select: (data) => {
            return data.pages.flat().map((page) => page?.requester_id);
        },
    });

    // if (isFetchingNextPage) return <LoadingBar />;

    const followerUserDatas = useQueries({
        queries:
            followerIds?.map((id) => ({
                queryKey: ['followerUser', id],
                queryFn: () => getFollowUserListsPaginated(id!),
            })) || [],
        combine: (results) => {
            return {
                data: results.map((result) => result.data).flat(),
                // pending: results.some((result) => result.isPending),
            };
        },
    });

    const { observerEl } = useInfiniteScroll({
        callbackFn: fetchNextPage,
        hasNextPage: hasNextPage,
    });

    return (
        <div>
            <Button size="sm" role="none" onClick={() => router.back()}>
                뒤로가기
            </Button>

            <div className={styles.following}>
                <List>
                    {followerUserDatas?.data?.map((user, idx) => (
                        <ListRow
                            key={idx}
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

export default FollowerPage;

//     <div className={styles.nothing}>
//         <Text typography="st3">아직 친구가 없어용🥲</Text>
//         <Button size="sm" role="round">
//             만들러가기
//         </Button>
//     </div>
// )
