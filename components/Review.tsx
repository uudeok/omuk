'use client';

import styles from '../styles/review.module.css';
import { useState } from 'react';
import List, { ListRow } from '@/components/common/List';
import Text from '@/components/common/Text';
import { FEEDBACK_LIST } from '@/constants/review';
import Badge from '@/components/common/Badge';
import Bookmark from './Bookmark';
import Button from './common/Button';
import FillStar from '../assets/fillStar.svg';
import Pencil from '../assets/pencil.svg';
import Input from './common/Input';
import InputBase from './common/InputBase';
import { useInput } from '@/hooks';

const Review = () => {
    const [positiveList, setPositiveList] = useState<any>([]);
    const [negativeList, setNegativeList] = useState<any>([]);
    const [value, onChangeInput, isValid] = useInput({ maxLength: 50, minLength: 1 });

    const positiveFeedback = FEEDBACK_LIST.find((feedback) => feedback.type === 'positive')!;
    const negativeFeedback = FEEDBACK_LIST.find((feedback) => feedback.type === 'negative')!;

    const handlePositiveReview = (id: number) => {
        const updatedList = positiveFeedback.items.map((item) =>
            item.id === id ? { ...item, selected: !item.selected } : { item }
        );
        setPositiveList(updatedList);
    };

    const handleNegativeReview = (id: number) => {};

    return (
        <div className={styles.container}>
            <div className={styles.content}>
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

                <div className={styles.rate}>
                    <List>
                        <ListRow
                            left={
                                <div>
                                    <FillStar width={20} />
                                    <Text typography="t5">별점</Text>
                                </div>
                            }
                            right={
                                <div>
                                    <input type="text" placeholder="0.0" />
                                    /5.0
                                </div>
                            }
                        />
                    </List>
                </div>

                <div>
                    <List>
                        <ListRow
                            left={
                                <div>
                                    <Pencil width={20} />
                                    <Text typography="t5">한줄평</Text>
                                </div>
                            }
                            right=""
                        />
                        <ListRow
                            left={
                                <Input bottomText="50자 이내로 작성해주세요">
                                    <InputBase
                                        onChange={onChangeInput}
                                        hasError={!isValid}
                                        placeholder="한줄평을 작성해주세요"
                                        value={value}
                                    />
                                </Input>
                            }
                            right=""
                        />
                    </List>
                </div>

                <div>
                    <List>
                        <ListRow left={<Text typography="t5">또 방문하고 싶다면?</Text>} right={<Bookmark />} />
                    </List>
                </div>
            </div>
            <div className={styles.registerBtn}>
                <Button size="lg">등록하기</Button>
            </div>
        </div>
    );
};

export default Review;

{
    /* <div className={styles.rate}>
<List>
    <ListRow
        left={
            <div>
                <FillStar width={20} />
                <Text typography="t5">별점</Text>
            </div>
        }
        right={
            <div>
                <input type="text" placeholder="0.0" />
                /5.0
            </div>
        }
    />
</List>
</div> */
}
