'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getPaginatedReviewsWithImages } from '@/services/reviewService';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import Card from '@/components/Card';

const StorePage = () => {
    const {
        data: reviewList,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['paginatedTotalReview'],
        queryFn: ({ pageParam }) => getPaginatedReviewsWithImages(pageParam, DEFAULT_PAGE_SIZE),
        initialPageParam: 2,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPageParam < 3) {
                return lastPageParam + 1;
            }
        },
        select: (data) => {
            return data.pages.flatMap((page) => page);
        },
    });

    return (
        <div>
            {reviewList?.map((review) => (
                <Card key={review.id} list={review} />
            ))}
        </div>
    );
};

export default StorePage;
