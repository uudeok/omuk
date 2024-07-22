'use client';

import styles from '../styles/components/community.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    getFollowerReviewsWithImages,
    getPaginatedReviewsWithImages,
    getPublicReviewCountByKeyword,
    getFolloweeReviewCountByKeyword,
    getReviewTotalRows,
    getFollowReviewTotalRows,
} from '@/services/reviewService';
import List from './common/List';
import { generateSkeletonCards, getTotalPages } from '@/shared/utils';
import { useInfiniteScroll } from '@/hooks';
import ReviewCard from './ReviewCard';
import { usePathname } from 'next/navigation';
import { AuthContext } from '@/shared/context/AuthProvider';
import EmptyState from './common/EmptyState';
import Badge from './common/Badge';
import { BUTTON_TO_FEEDBACK } from '@/constants';
import LoadingBar from './common/LoadingBar';
import Slider from 'react-slick';

const BUTTON_OPTIONS = ['아이와 함께', '부모님 모시고', '혼밥가능', '가성비최고', '분위기좋은', '뷰맛집', '펫 친화'];
const PAGE_SIZE = 10;

const Community = () => {
    const path = usePathname();
    const queryClient = useQueryClient();
    const session = useContext(AuthContext);

    const [totalPage, setTotalPage] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchTotalReviews = path === '/community' ? getReviewTotalRows : getFollowReviewTotalRows;
    const fetchInfiniteQuery = path === '/community' ? getPaginatedReviewsWithImages : getFollowerReviewsWithImages;
    const fetchReviewCount = path === '/community' ? getPublicReviewCountByKeyword : getFolloweeReviewCountByKeyword;

    // 필터 시에는 동작하지 않도록 구현, 새로운 totalPage 값이 적용되게끔
    const { data: totalRow } = useQuery({
        queryKey: ['totalRows'],
        queryFn: fetchTotalReviews,
        enabled: !searchKeyword,
    });

    useEffect(() => {
        if (totalRow !== undefined) {
            setTotalPage(getTotalPages(totalRow, PAGE_SIZE));
        }
    }, [totalRow]);

    const {
        data: reviewList = [],
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isPending,
    } = useInfiniteQuery({
        queryKey: ['paginatedTotalReview', searchKeyword],
        queryFn: ({ pageParam }) => fetchInfiniteQuery(pageParam, PAGE_SIZE, searchKeyword),
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

    useEffect(() => {
        queryClient.resetQueries({ queryKey: ['paginatedTotalReview', searchKeyword] });
        queryClient.resetQueries({ queryKey: ['totalRows'] });
    }, [path, queryClient, searchKeyword]);

    const { observerEl } = useInfiniteScroll({
        callbackFn: fetchNextPage,
        hasNextPage: hasNextPage,
    });

    const handleSearchKeyword = async (e: React.SyntheticEvent, option: string) => {
        if (isDragging) {
            e.stopPropagation();
            return;
        }

        setIsLoading(true);
        const keyword = BUTTON_TO_FEEDBACK[option];
        setSearchKeyword(keyword);

        try {
            const reviewCount = await fetchReviewCount(keyword);
            const total = getTotalPages(reviewCount, PAGE_SIZE);
            setTotalPage(total);

            queryClient.resetQueries({ queryKey: ['paginatedTotalReview', searchKeyword] });
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBeforeChange = useCallback(() => setIsDragging(true), []);

    const handleAfterChange = useCallback(() => setIsDragging(false), []);

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        variableWidth: true,
        draggable: true,
        beforeChange: handleBeforeChange,
        afterChange: handleAfterChange,
    };

    return (
        <div>
            <Slider {...settings} className={styles.slider}>
                <div className={styles.badge} onClick={(e) => handleSearchKeyword(e, '')}>
                    <Badge isSelected={!searchKeyword}>전체</Badge>
                </div>
                {BUTTON_OPTIONS.map((option) => (
                    <div className={styles.badge} key={option}>
                        <Badge
                            isSelected={BUTTON_TO_FEEDBACK[option] === searchKeyword}
                            onClick={(e) => handleSearchKeyword(e, option)}
                        >
                            {option}
                        </Badge>
                    </div>
                ))}
            </Slider>

            {!session && path === '/community/follow' && <EmptyState label="로그인이 필요한 서비스 입니다" />}

            {isLoading ? (
                <LoadingBar />
            ) : (
                reviewList && (
                    <List>
                        {reviewList?.map((review) => (
                            <ReviewCard list={review} key={review.id} />
                        ))}

                        <div ref={observerEl} />
                    </List>
                )
            )}

            {session && !isPending && reviewList.length === 0 && <EmptyState label="아직 리뷰가 없어용😅" />}
        </div>
    );
};

export default Community;
