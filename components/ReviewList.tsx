'use client';

import styles from '../styles/components/reviewList.module.css';
import List, { ListRow } from './common/List';
import EmptyState from './common/EmptyState';
import Icons from './common/Icons';
import Text from './common/Text';
import DetailReview from './DetailReview';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getReviewList, getRestaurantReviewCount } from '@/services/reviewService';
import Button from './common/Button';
import { useState } from 'react';

const ReviewList = ({ res_id }: { res_id: string }) => {
    const [reviewsPerPage, setReviewsPerPage] = useState(3); // 처음에는 3개씩 가져옴

    const { data: reviewCount } = useQuery({
        queryKey: ['restaurantReviewCount', res_id],
        queryFn: () => getRestaurantReviewCount(res_id),
    });

    const {
        data: reviewList = [],
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['reviewsList'],
        queryFn: ({ pageParam }) => getReviewList(res_id, pageParam, reviewsPerPage),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage && lastPage.length === reviewsPerPage) {
                return lastPageParam + 1;
            }
        },
        select: (data) => {
            return data.pages.flatMap((page) => page);
        },
    });

    const getMoreReviewData = () => {
        setReviewsPerPage(5);
        fetchNextPage();
    };

    return (
        <div className={styles.layout}>
            <List>
                <ListRow
                    left={
                        <div>
                            <Icons.Search width={15} />
                            <Text typography="st3">후기 보기</Text>
                        </div>
                    }
                    right={reviewCount !== 0 && <Text typography="st2">{reviewCount}개의 리뷰</Text>}
                />

                {reviewList.length > 0 ? (
                    reviewList.map((review) => <DetailReview key={review.id} reviewDetail={review} />)
                ) : (
                    <EmptyState label="리뷰가 없습니다." />
                )}
            </List>

            {hasNextPage && (
                <Button size="lg" onClick={getMoreReviewData}>
                    더보기
                </Button>
            )}
        </div>
    );
};

export default ReviewList;
