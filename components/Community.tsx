'use client';

import styles from '../styles/community.module.css';
import { useState, useCallback } from 'react';
import { useInfiniteQuery, useQueries } from '@tanstack/react-query';
import { getPaginatedReviews } from '@/services/reviewService';
import List, { ListBox } from './common/List';
import Text from './common/Text';
import Button from './common/Button';
import { getTotalPages } from '@/shared/utils/detailUtil';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { useInfiniteScroll } from '@/hooks';
import Card from './Card';
import { ReviewImages } from '@/services/reviewService';
import { ProfileType } from '@/services/userService';
import { ReviewLikesType } from '@/services/reviewLikeService';

type Props = {
    totalReviews: number;
    initalReviews: CommunityReviewType[];
};

export type CommunityReviewType = {
    id: number;
    created_at: string;
    res_id: string;
    user_id: string;
    rate: number;
    comment: string;
    positive: string[];
    negative: string[];
    placeName: string;
    companions: string;
    visitDate: string;
    review_images: ReviewImages[];
    profiles: ProfileType;
    review_likes: ReviewLikesType[];
    likedByUser: boolean;
};

const Community = ({ totalReviews, initalReviews }: Props) => {
    const totalPage = getTotalPages(totalReviews, DEFAULT_PAGE_SIZE);
    const [enabled, setEnabled] = useState(false);

    console.log('123', initalReviews);

    const {
        data: reviewList,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['paginatedTotalReview'],
        queryFn: ({ pageParam }) => getPaginatedReviews(pageParam, DEFAULT_PAGE_SIZE),
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

    return (
        <div>
            <div className={styles.controller}>
                <Button size="sm">리뷰</Button>
                <Button size="sm">베스트 리뷰</Button>
            </div>

            <List>
                {initalReviews.map((review: any) => (
                    <Card list={review} key={review.id} />
                ))}
            </List>

            {/* <List>
                {reviewList?.map((review) => (
                    <ListBox
                        key={review.id}
                        top={
                            <div>
                                <Text typography="t5">{review.placeName}</Text>
                            </div>
                        }
                        bottom={<div>{review.comment}</div>}
                    />
                ))}
            </List> */}

            <div ref={observerEl} />
        </div>
    );
};

export default Community;
