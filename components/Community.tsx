'use client';

import styles from '../styles/components/community.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getFollowerReviewsWithImages, getPaginatedReviewsWithImages } from '@/services/reviewService';
import List from './common/List';
import { useInfiniteScroll } from '@/hooks';
import ReviewCard from './ReviewCard';
import { CommunityReviewType } from '@/services/reviewService';
import { usePathname } from 'next/navigation';
import { AuthContext } from '@/shared/context/AuthProvider';
import EmptyState from './common/EmptyState';
import Badge from './common/Badge';
import { BUTTON_TO_FEEDBACK } from '@/constants';
import LoadingBar from './common/LoadingBar';
import Slider from 'react-slick';

type Props = {
    initialReviews: CommunityReviewType[];
};

const BUTTON_OPTIONS = ['아이와 함께', '부모님 모시고', '혼밥가능', '가성비최고', '분위기좋은', '뷰맛집', '펫 친화'];
const PAGE_SIZE = 10;

const Community = ({ initialReviews }: Props) => {
    const path = usePathname();
    const queryClient = useQueryClient();
    const session = useContext(AuthContext);

    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [filteredReviews, setFilteredReviews] = useState<CommunityReviewType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchInfiniteQuery = path === '/community' ? getPaginatedReviewsWithImages : getFollowerReviewsWithImages;

    // 2페이지부턴 csr 무한스크롤로 데이터 받아온다
    const {
        data: reviewList,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['paginatedTotalReview', searchKeyword],
        queryFn: ({ pageParam }) => fetchInfiniteQuery(pageParam, PAGE_SIZE, searchKeyword),
        initialPageParam: 1,
        enabled: isEnabled,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage && lastPage.length === PAGE_SIZE) {
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
            if (target.isIntersecting && !isEnabled) {
                setIsEnabled(true);
            } else if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
                setIsEnabled(false);
            }
        },
        [isEnabled, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading]
    );

    const { observerEl } = useInfiniteScroll({
        callbackFn: fetchNextPage,
        hasNextPage: hasNextPage,
        customHandleObserver: handleObserver,
    });

    useEffect(() => {
        queryClient.resetQueries({ queryKey: ['paginatedTotalReview', searchKeyword] });
        setIsEnabled(false);
    }, [path, queryClient, searchKeyword]);

    const handleSearchKeyword = async (e: React.SyntheticEvent, option: string) => {
        if (isDragging) {
            e.stopPropagation();
            return;
        }

        setIsLoading(true);
        const keyword = BUTTON_TO_FEEDBACK[option];
        setSearchKeyword(keyword);
        setIsEnabled(false);

        try {
            const result = await fetchInfiniteQuery(0, PAGE_SIZE, keyword);
            setFilteredReviews(result);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBeforeChange = useCallback(() => {
        setIsDragging(true);
    }, []);

    const handleAfterChange = useCallback(() => {
        setIsDragging(false);
    }, []);

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
            ) : filteredReviews && filteredReviews.length > 0 ? (
                <List>
                    {filteredReviews.map((review) => (
                        <ReviewCard list={review} key={review.id} />
                    ))}

                    <div ref={observerEl} />
                </List>
            ) : (
                <List>
                    {initialReviews.map((review) => (
                        <ReviewCard list={review} key={review.id} />
                    ))}

                    <div ref={observerEl} />
                </List>
            )}

            {reviewList?.map((review) => (
                <ReviewCard list={review} key={review.id} />
            ))}
        </div>
    );
};

export default Community;
