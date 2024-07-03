'use client';

import styles from '../../../../styles/following.module.css';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import List, { ListRow } from '@/components/common/List';
import Avatar from '@/components/common/Avatar';
import { getTotalPages } from '@/shared/utils/detailUtil';
import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';
import { getFollowerList, getFollowerInfo } from '@/services/followService';
import { getFollowUserListsPaginated } from '@/services/userService';
import { useInfiniteScroll } from '@/hooks';
import { FOLLOW_PAGE_SIZE } from '@/constants';

const FollowerPage = () => {
    const router = useRouter();

    const { data: followerInfo } = useQuery({
        queryKey: ['followerInfo', 'all'],
        queryFn: () => getFollowerInfo(),
    });

    const totalPage = getTotalPages(followerInfo, FOLLOW_PAGE_SIZE);

    const {
        data: followerIds,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['followerList'],
        queryFn: ({ pageParam }) => getFollowerList(pageParam, FOLLOW_PAGE_SIZE),
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

    // console.log('ids', followerIds);
    // console.log(followerUserDatas.data);

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
