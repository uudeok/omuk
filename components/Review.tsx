'use client';

import styles from '../styles/review.module.css';
import { useState } from 'react';
import List, { ListRow } from '@/components/common/List';
import Text from '@/components/common/Text';
import { FEEDBACK_LIST } from '@/constants/review';
import Badge from '@/components/common/Badge';
import { FeedBackItem } from '@/shared/types';

const Review = () => {
    const [positiveList, setPositiveList] = useState<any>([]);
    const [negativeList, setNegativeList] = useState<any>([]);

    const positiveFeedback = FEEDBACK_LIST.find((feedback) => feedback.type === 'positive')!;
    const negativeFeedback = FEEDBACK_LIST.find((feedback) => feedback.type === 'negative')!;

    const handlePositiveReview = (id: number) => {
        const updatedList = positiveFeedback.items.map((item) =>
            item.id === id ? { ...item, selected: !item.selected } : { item }
        );
        setPositiveList(updatedList);
    };

    const handleNegativeReview = (id: number) => {};

    console.log(positiveList);

    return (
        <div className={styles.review}>
            <List>
                <ListRow left={<Text typography="t5">이런 점이 좋아용!😁</Text>} right="" />
                <div className={styles.positive}>
                    {positiveFeedback?.items.map((positive) => (
                        <Badge key={positive.id} onClick={() => handlePositiveReview(positive.id)}>
                            {positive.label}
                        </Badge>
                    ))}
                </div>
                <ListRow left={<Text typography="t5">이런 점이 아쉬워용!😅</Text>} right="" />
                <div className={styles.negative}>
                    {negativeFeedback?.items.map((negative) => (
                        <Badge key={negative.id} onClick={() => handleNegativeReview(negative.id)}>
                            {negative.label}
                        </Badge>
                    ))}
                </div>
            </List>

            <div>
                <Text typography="t5">다음에도 방문하고 싶다면?</Text>
            </div>
        </div>
    );
};

export default Review;
