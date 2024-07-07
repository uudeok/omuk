'use client';

import styles from '../../../../styles/follower.module.css';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import List, { ListRow } from '@/components/common/List';
import Avatar from '@/components/common/Avatar';
import { getTotalPages } from '@/shared/utils/detailUtil';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
    getFollowerList,
    getFollowerTotalRows,
    acceptedFollowRequest,
    cancleFollowRequest,
} from '@/services/followService';
import { useInfiniteScroll } from '@/hooks';
import { FOLLOW_PAGE_SIZE } from '@/constants';
import Text from '@/components/common/Text';

const FollowerPage = () => {
    const router = useRouter();

    // query key 로 캐시 된 데이터 가져오기
    const { data: followerTotalRows } = useQuery({
        queryKey: ['followerTotalRows', 'all'],
        queryFn: () => getFollowerTotalRows(),
    });

    const totalPage = getTotalPages(followerTotalRows, FOLLOW_PAGE_SIZE);

    // follower list 페이지네이션 가져오기
    const {
        data: followerList,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        refetch: refetchFollowerList,
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
            return data.pages.flat().map((page) => page);
        },
    });

    const { observerEl } = useInfiniteScroll({
        callbackFn: fetchNextPage,
        hasNextPage: hasNextPage,
    });

    const handleAcceptFollower = async (follower_id: string) => {
        const result = await acceptedFollowRequest(follower_id);
        refetchFollowerList();
    };

    const handleRejectFollower = async (follower_id: string) => {
        const process = window.confirm('팔로우 요청을 거절하시겠습니까?');
        if (process) {
            await cancleFollowRequest(follower_id);
            refetchFollowerList();
        }
    };

    const pending = followerList?.filter((follower) => follower.status === 'pending');
    const accepted = followerList?.filter((follower) => follower.status === 'accepted');

    return (
        <div>
            <Button size="sm" role="none" onClick={() => router.back()}>
                뒤로가기
            </Button>

            <div className={styles.pending}>
                <List>
                    <Text typography="t5">팔로우 요청 {pending?.length}명</Text>

                    {followerList?.map(
                        (follower) =>
                            follower.status === 'pending' && (
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
                            )
                    )}
                </List>
            </div>

            <div className={styles.accepted}>
                <List>
                    <Text typography="t5">모든 팔로우 {accepted?.length}명 </Text>
                    {followerList?.map(
                        (follower) =>
                            follower.status === 'accepted' && (
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
                            )
                    )}
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

{
    /* <div className={styles.pending}>
<List>
    <Text typography="t5">팔로우 요청</Text>
    {followerList?.map(
        (follower) =>
            follower.status === 'pending' && (
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
            )
    )}
</List>
</div> */
}
