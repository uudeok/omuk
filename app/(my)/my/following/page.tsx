'use client';

import styles from '../../../../styles/following.module.css';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';
import { getFollowingList, getFollowingInfo } from '@/services/followService';
import { useInfiniteScroll } from '@/hooks';
import { getFollowUserListsPaginated } from '@/services/userService';
import Avatar from '@/components/common/Avatar';
import { getTotalPages } from '@/shared/utils/detailUtil';
import List, { ListRow } from '@/components/common/List';
import { FOLLOW_PAGE_SIZE } from '@/constants';

const FollowingPage = () => {
    const router = useRouter();

    const { data: followingInfo } = useQuery({
        queryKey: ['followingInfo'],
        queryFn: getFollowingInfo,
    });

    const totalPage = getTotalPages(followingInfo, FOLLOW_PAGE_SIZE);

    const {
        data: followingIds,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['followingList'],
        queryFn: ({ pageParam }) => getFollowingList(pageParam, FOLLOW_PAGE_SIZE),
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

    const followingUserDatas = useQueries({
        queries:
            followingIds?.map((id) => ({
                queryKey: ['followingUser', id],
                queryFn: () => getFollowUserListsPaginated(id!),
            })) || [],
        combine: (results) => {
            return {
                data: results.map((result) => result.data).flat(),
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
                    {followingUserDatas?.data?.map((user, idx) => (
                        <ListRow
                            key={idx}
                            left={<Avatar profile={user} />}
                            right={
                                <div>
                                    <Button size="sm" role="round">
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

//     <div className={styles.nothing}>
//         <Text typography="st3">아직 친구가 없어용🥲</Text>
//         <Button size="sm" role="round">
//             만들러가기
//         </Button>
//     </div>
