'use client';

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getFollowerReviewTotalRows } from '@/services/followService';
import { getTotalPages } from '@/shared/utils/detailUtil';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { getFollowerReviewsWithImages } from '@/services/reviewService';
import { useInfiniteScroll } from '@/hooks';
import List from '@/components/common/List';
import Card from '@/components/Card';

const FollowCommunityPage = () => {
    const { data: totalReviews } = useQuery({
        queryKey: ['followReviewTotalRows'],
        queryFn: getFollowerReviewTotalRows,
    });

    const totalPage = getTotalPages(totalReviews, DEFAULT_PAGE_SIZE);

    const {
        data: reviewList,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['paginatedFollowReview'],
        queryFn: ({ pageParam }) => getFollowerReviewsWithImages(pageParam, DEFAULT_PAGE_SIZE),
        initialPageParam: 0,
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
            <List>
                {reviewList?.map((review) => (
                    <Card list={review} key={review.id} />
                ))}
            </List>

            <div ref={observerEl} />
        </div>
    );
};

export default FollowCommunityPage;
