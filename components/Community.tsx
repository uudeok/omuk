'use client';

import { useState, useCallback, useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getFollowerReviewsWithImages, getPaginatedReviewsWithImages } from '@/services/reviewService';
import List from './common/List';
import { getTotalPages } from '@/shared/utils/detailUtil';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { useInfiniteScroll } from '@/hooks';
import ReviewCard from './ReviewCard';
import { CommunityReviewType } from '@/services/reviewService';
import { usePathname } from 'next/navigation';

type Props = {
    totalReviews: number;
    initalReviews: CommunityReviewType[];
};

const Community = ({ totalReviews, initalReviews }: Props) => {
    const totalPage = getTotalPages(totalReviews, DEFAULT_PAGE_SIZE);
    const [enabled, setEnabled] = useState(false);
    const path = usePathname();
    const queryClient = useQueryClient();

    const fetchInfiniteQuery = path === '/community' ? getPaginatedReviewsWithImages : getFollowerReviewsWithImages;

    useEffect(() => {
        queryClient.resetQueries({ queryKey: ['paginatedTotalReview'] });
        setEnabled(false);
    }, [path, queryClient]);

    // 2페이지부턴 csr 무한스크롤로 데이터 받아온다
    const {
        data: reviewList,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['paginatedTotalReview'],
        queryFn: ({ pageParam }) => fetchInfiniteQuery(pageParam, DEFAULT_PAGE_SIZE),
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

    // custom handleObserver 생성 - ssr 초기 페이지땐 실행되지 않도록 구현
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

    return (
        <div>
            <List>
                {initalReviews.map((review: CommunityReviewType) => (
                    <ReviewCard list={review} key={review.id} />
                ))}
            </List>

            <div ref={observerEl}>
                {reviewList?.map((review) => (
                    <ReviewCard list={review} key={review.id} />
                ))}
            </div>

            {/* <div ref={observerEl} /> */}
        </div>
    );
};

export default Community;
