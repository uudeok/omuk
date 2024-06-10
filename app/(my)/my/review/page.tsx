'use client';

import styles from '../../../../styles/myreview.module.css';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getReviewList, getReviewList2, getReviewPageInfo } from '@/services/reviewService';
import Button from '@/components/common/Button';
import List, { ListBox } from '@/components/common/List';
import Text from '@/components/common/Text';
import Rating from '@/components/common/Rating';
import { useCallback, useEffect, useState } from 'react';
import { useInfiniteScroll } from '@/hooks';
import { supabase } from '@/shared/lib/supabase';

const MyReviewList = () => {
    const router = useRouter();
    const pageNumber = 15;
    const [rate, setRate] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [reviewList, setReviewList] = useState<any>([]);
    const [pagination, setPagination] = useState<any>();

    const getReviewPageInfo = async () => {
        const { data } = await supabase.auth.getSession();

        if (!data.session) return;

        const user_id = data.session.user.id;

        const { data: pagination, error } = await supabase
            .from('review')
            .select('*')
            .eq('user_id', user_id)
            .explain({ format: 'json', analyze: true });

        if (error) {
            throw new Error(error.message);
        }

        setPagination(pagination);
    };

    useEffect(() => {
        getReviewPageInfo();
    }, []);

    useEffect(() => {
        if (Array.isArray(pagination)) {
            console.log('page', page);
            const plan = pagination[0].Plan as any;
            const totalRows = plan.Plans[0]['Actual Rows'];
            console.log('totalReview', totalRows);

            const totalPages = Math.ceil(totalRows / pageNumber);
            console.log('totalPages', totalPages);
            const hasNextPage = page < totalRows - page;
            console.log('hasNextpage', hasNextPage);
            setHasNextPage(hasNextPage);
        }
    }, [page, pagination]);

    const getReviewList2 = async (page: number, limit: number) => {
        const { data } = await supabase.auth.getSession();

        if (!data.session) return;

        const user_id = data.session.user.id;

        const { data: reviewList, error } = await supabase
            .from('review')
            .select('*')
            .eq('user_id', user_id)
            .range(page, page + limit - 1);

        if (error) {
            throw new Error(error.message);
        }

        if (page === 0) {
            setReviewList(reviewList);
        } else {
            setReviewList((prev: any) => [...prev, ...reviewList]);
        }
    };

    useEffect(() => {
        getReviewList2(page, pageNumber);
    }, [page]);

    const loadNextPage = useCallback(() => {
        console.log('실행');
        setPage((prePage) => prePage + 15);
    }, []);

    const { observerEl } = useInfiniteScroll({
        callbackFn: loadNextPage,
        hasNextPage: hasNextPage,
    });

    console.log(reviewList);

    if (reviewList && reviewList.length === 0) {
        return (
            <div className={styles.nonReview}>
                <Text typography="st2">아직 리뷰가 없어요😢</Text>
                <Button size="sm" role="round" onClick={() => router.push('/')}>
                    작성하러 가기
                </Button>
            </div>
        );
    }

    return (
        <div>
            <Button size="sm" role="none" onClick={() => router.back()}>
                뒤로가기
            </Button>

            <div className={styles.layout}>
                <List>
                    {reviewList?.map((item: any) => (
                        <ListBox
                            key={item.id}
                            top={
                                <div>
                                    <Text typography="t4">{item.placeName}</Text>
                                    <Rating ratingIndex={item.rate} setRatingIndex={setRate} />
                                </div>
                            }
                            bottom={
                                <div className={styles.bottom}>
                                    <Text typography="st3">{item.comment}</Text>
                                    <Button size="sm" role="none" onClick={() => router.push(`/${item.res_id}`)}>
                                        보러가기 ▶︎
                                    </Button>
                                </div>
                            }
                        />
                    ))}
                </List>
            </div>
            <div ref={observerEl} />
        </div>
    );
};

export default MyReviewList;
