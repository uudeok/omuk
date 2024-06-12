'use client';

import styles from '../../../../styles/myreview.module.css';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import List, { ListBox } from '@/components/common/List';
import Text from '@/components/common/Text';
import Rating from '@/components/common/Rating';
import { useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getUserReviewsPaginated, getReviewPageInfo } from '@/services/reviewService';
import { usePagination } from '@/hooks/usePagination';
import { useInfiniteScroll } from '@/hooks';

const MyReviewList = () => {
    const router = useRouter();
    const pageSize = 15;
    const [rate, setRate] = useState<number>(0);

    const { data: pageInfo } = useQuery({
        queryKey: ['reviewPagination'],
        queryFn: () => getReviewPageInfo(),
    });

    const { totalPage } = usePagination(pageInfo, pageSize);

    const {
        data: reviewList,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['reviewList'],
        queryFn: ({ pageParam }) => getUserReviewsPaginated(pageParam, pageSize),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPageParam < totalPage) {
                return lastPageParam + 1;
            }
        },
        select: (data) => {
            return data.pages.flat();
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

            <div className={styles.layout}>
                {reviewList?.length === 0 && (
                    <div className={styles.nonReview}>
                        <Text typography="st3">작성한 리뷰가 없어요🥲</Text>
                    </div>
                )}
                <List>
                    {reviewList?.map((item: any) => (
                        <ListBox
                            key={item.id}
                            top={
                                <div className={styles.top}>
                                    <Text typography="t4">{item.placeName}</Text>
                                    <Rating ratingIndex={item.rate} setRatingIndex={setRate} />
                                </div>
                            }
                            bottom={
                                <div className={styles.bottom}>
                                    <Text typography="st3">{item.comment}</Text>
                                    <Button size="sm" role="none" onClick={() => router.push(`/${item.res_id}`)}>
                                        보러가기 ▶︎
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

export default MyReviewList;
