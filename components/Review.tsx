'use client';

import styles from '../styles/components/review.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReviewType } from '@/services/reviewService';
import Text from './common/Text';
import List, { ListBox } from './common/List';
import Rating from './common/Rating';
import { COMPANION } from '@/constants';
import Button from './common/Button';
import Pencil from '../assets/pencil.svg';

type Props = {
    reviewList: ReviewType[];
};

const Review = ({ reviewList }: Props) => {
    const router = useRouter();
    const [rate, setRate] = useState<number>(0);

    return (
        <List>
            {reviewList?.map((review) => (
                <ListBox
                    key={review.res_id}
                    top={
                        <div>
                            <Text typography="t5">{review.placeName}</Text>
                            <Rating ratingIndex={review.rate} setRatingIndex={setRate} />
                        </div>
                    }
                    bottom={
                        <div className={styles.bottom}>
                            <Text typography="st3">{COMPANION[`${review.companions}`]}</Text>
                            <div className={styles.comment}>
                                <Text typography="st3">
                                    <Pencil width={15} /> {review.content}
                                </Text>
                            </div>
                            <Button size="sm" role="none" onClick={() => router.push(`/${review.res_id}`)}>
                                보러가기 ▶︎
                            </Button>
                        </div>
                    }
                />
            ))}
        </List>
    );
};

export default Review;
