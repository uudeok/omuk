'use client';

import styles from '../../../../styles/myreview.module.css';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getReviewList } from '@/services/reviewService';
import Button from '@/components/common/Button';
import List, { ListBox } from '@/components/common/List';
import Text from '@/components/common/Text';
import Rating from '@/components/common/Rating';
import { useState } from 'react';

const MyReviewList = () => {
    const router = useRouter();
    const [rate, setRate] = useState<number>(0);

    const { data: reviewList } = useQuery({
        queryKey: ['reviewList'],
        queryFn: () => getReviewList(),
    });

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
                    {reviewList?.map((item) => (
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
        </div>
    );
};

export default MyReviewList;
