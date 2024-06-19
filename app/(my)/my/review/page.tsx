'use client';

import styles from '../../../../styles/myreview.module.css';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getUserReviewsPaginated, getReviewPageInfo, ReviewType } from '@/services/reviewService';
import { usePagination } from '@/hooks/usePagination';
import { useInfiniteScroll } from '@/hooks';
import Review from '@/components/Review';

const MyReviewList = () => {
    const router = useRouter();
    const pageSize = 15;

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
                {reviewList && reviewList.length === 0 ? (
                    <div className={styles.nonReview}>
                        <Text typography="st3">작성한 리뷰가 없어요🥲</Text>
                    </div>
                ) : (
                    <Review reviewList={reviewList as ReviewType[]} />
                )}
            </div>

            <div ref={observerEl} />
        </div>
    );
};

export default MyReviewList;
