'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPaginatedUserReviews, getReviewTotalReviews, ReviewType } from '@/services/reviewService';
import { useInfiniteScroll } from '@/hooks';
import Review from '@/components/Review';
import { getTotalPages } from '@/shared/utils/detailUtil';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import EmptyState from '@/components/common/EmptyState';

const MyReviewList = () => {
    const router = useRouter();

    const { data: pageInfo } = useQuery({
        queryKey: ['reviewTotalRows'],
        queryFn: () => getReviewTotalReviews(),
    });

    const totalPage = getTotalPages(pageInfo, DEFAULT_PAGE_SIZE);

    const {
        data: reviewList,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['paginatedReview'],
        queryFn: ({ pageParam }) => getPaginatedUserReviews(pageParam, DEFAULT_PAGE_SIZE),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPageParam < totalPage) {
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
                {reviewList && reviewList.length === 0 ? (
                    <EmptyState label="작성한 리뷰가 없어요" />
                ) : (
                    <Review reviewList={reviewList as ReviewType[]} />
                )}
            </div>
            <div ref={observerEl} />
        </div>
    );
};

export default MyReviewList;
