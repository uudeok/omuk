'use client';

import { useState, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPaginatedReviewsWithImages } from '@/services/reviewService';
import List from './common/List';
import { getTotalPages } from '@/shared/utils/detailUtil';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { useInfiniteScroll } from '@/hooks';
import Card from './Card';
import { CommunityReviewType } from '@/services/reviewService';

type Props = {
    totalReviews: number;
    initalReviews: CommunityReviewType[];
};

const Community = ({ totalReviews, initalReviews }: Props) => {
    const totalPage = getTotalPages(totalReviews, DEFAULT_PAGE_SIZE);
    const [enabled, setEnabled] = useState(false);

    const {
        data: reviewList,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['paginatedTotalReview'],
        queryFn: ({ pageParam }) => getPaginatedReviewsWithImages(pageParam, DEFAULT_PAGE_SIZE),
        initialPageParam: 2,
        enabled,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPageParam < totalPage) {
                return lastPageParam + 1;
            }
        },
        select: (data) => {
            return data.pages.flatMap((page) => page);
        },
    });

    console.log(initalReviews);

    // custom handleObserver 생성 - ssr 초기 페이지 받아올땐 실행되지 않도록 구현
    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && !enabled) {
                setEnabled(true);
            } else if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
                setEnabled(false);
            }
        },
        [enabled, hasNextPage, isFetchingNextPage, fetchNextPage]
    );

    const { observerEl } = useInfiniteScroll({
        callbackFn: fetchNextPage,
        hasNextPage: hasNextPage,
        customHandleObserver: handleObserver,
    });

    console.log(reviewList);

    return (
        <div>
            <List>
                {initalReviews.map((review: CommunityReviewType) => (
                    <Card list={review} key={review.id} />
                ))}
            </List>
            <List>
                {reviewList?.map((review) => (
                    <Card list={review} key={review.id} />
                ))}
            </List>

            <div ref={observerEl} />
        </div>
    );
};

export default Community;
