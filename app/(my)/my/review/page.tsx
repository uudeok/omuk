'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPaginatedUserReviews, ReviewType } from '@/services/reviewService';
import { useInfiniteScroll } from '@/hooks';
import Review from '@/components/Review';
import EmptyState from '@/components/common/EmptyState';

const PAGE_SIZE = 15;

const MyReviewList = () => {
    const router = useRouter();

    const {
        data: reviewList = [],
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isFetching,
    } = useInfiniteQuery({
        queryKey: ['paginatedReview'],
        queryFn: ({ pageParam }) => getPaginatedUserReviews(pageParam, PAGE_SIZE),
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

    return (
        <div>
            <Button size="sm" role="none" onClick={() => router.back()}>
                뒤로가기
            </Button>

            <div>
                {!isFetching && reviewList.length === 0 ? (
                    <EmptyState label="아직 작성한 리뷰가 없어요😅" />
                ) : (
                    <Review reviewList={reviewList as ReviewType[]} />
                )}
            </div>
            <div ref={observerEl} />
        </div>
    );
};

export default MyReviewList;
