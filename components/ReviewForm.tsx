'use client';

import styles from '../styles/review.module.css';
import { useContext, useEffect, useState } from 'react';
import List, { ListRow } from '@/components/common/List';
import { useInput } from '@/hooks';
import Text from '@/components/common/Text';
import Badge from '@/components/common/Badge';
import Button from './common/Button';
import FillStar from '../assets/fillStar.svg';
import Pencil from '../assets/pencil.svg';
import Input from './common/Input';
import InputBase from './common/InputBase';
import Rating from './common/Rating';
import { useRouter } from 'next/navigation';
import { FEEDBACK_LIST } from '@/constants/review';
import { FeedBackItem } from '@/shared/types';
import { getReviewData, postReview, updateReview } from '@/services/reviewService';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '@/shared/context/AuthProvider';

const ReviewForm = ({ res_id, resName }: { res_id: string; resName: string }) => {
    const session = useContext(AuthContext);
    const router = useRouter();
    const [value, onChangeInput, isValid, setValue] = useInput({ maxLength: 30, minLength: 2 });
    const [rate, setRate] = useState<number>(0);
    const [selectedPositives, setSelectedPositives] = useState<FeedBackItem[]>([]);
    const [selectedNegatives, setSelectedNegatives] = useState<FeedBackItem[]>([]);

    const positiveFeedback = FEEDBACK_LIST.find((feedback) => feedback.type === 'positive')!;
    const negativeFeedback = FEEDBACK_LIST.find((feedback) => feedback.type === 'negative')!;

    const { data: reviewData } = useQuery({
        queryKey: ['review', res_id],
        queryFn: () => getReviewData(res_id),
        enabled: !!session,
    });

    useEffect(() => {
        if (reviewData) {
            setRate(reviewData.rate);
            setValue(reviewData.comment);
            setSelectedPositives(positiveFeedback.items.filter((item) => reviewData.positive?.includes(item.value)));
            setSelectedNegatives(negativeFeedback.items.filter((item) => reviewData.negative?.includes(item.value)));
        }
    }, [reviewData, setValue, positiveFeedback.items, negativeFeedback.items]);

    const handleFeedbackClick = (feedback: FeedBackItem, isPositive: boolean) => {
        const setSelected = isPositive ? setSelectedPositives : setSelectedNegatives;
        setSelected((prev) =>
            prev.some((item) => item.id === feedback.id)
                ? prev.filter((item) => item.id !== feedback.id)
                : [...prev, feedback]
        );
    };

    // review 생성
    const handlePostReview = async () => {
        await postReview({
            rate: rate,
            value: value,
            positive: selectedPositives.map((item) => item.value),
            negative: selectedNegatives.map((item) => item.value),
            res_id: res_id,
            placeName: resName,
        });
        router.replace(`/${res_id}`);
    };

    // review 수정
    const handleUpdateReview = async () => {
        await updateReview({
            rate: rate,
            value: value,
            positive: selectedPositives.map((item) => item.value),
            negative: selectedNegatives.map((item) => item.value),
            res_id: res_id,
            placeName: resName,
        });
        router.replace(`/${res_id}`);
    };

    const isFormValid = () => !isValid || rate === 0 || !value;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <List>
                    <ListRow left={<Text typography="t5">이런 점이 좋아용!😁</Text>} right="" />
                    <div className={styles.positive}>
                        {positiveFeedback?.items.map((positive) => (
                            <Badge
                                key={positive.id}
                                onClick={() => handleFeedbackClick(positive, true)}
                                isSelected={selectedPositives.some((item) => item.id === positive.id)}
                            >
                                {positive.label}
                            </Badge>
                        ))}
                    </div>
                    <ListRow left={<Text typography="t5">이런 점이 아쉬워용!😅</Text>} right="" />
                    <div className={styles.negative}>
                        {negativeFeedback?.items.map((negative) => (
                            <Badge
                                key={negative.id}
                                onClick={() => handleFeedbackClick(negative, false)}
                                isSelected={selectedNegatives.some((item) => item.id === negative.id)}
                            >
                                {negative.label}
                            </Badge>
                        ))}
                    </div>
                </List>

                <div>
                    <List>
                        <ListRow
                            left={
                                <div>
                                    <FillStar width={20} />
                                    <Text typography="t5">별점</Text>
                                </div>
                            }
                            right={<Rating ratingIndex={rate} setRatingIndex={setRate} />}
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
                                <Input bottomText="30자 이내로 작성해주세요">
                                    <InputBase
                                        onChange={onChangeInput}
                                        $hasError={!isValid}
                                        placeholder="한줄평을 작성해주세요"
                                        value={value}
                                    />
                                </Input>
                            }
                            right=""
                        />
                    </List>
                </div>
            </div>
            <div>
                {reviewData ? (
                    <Button size="lg" onClick={handleUpdateReview}>
                        수정하기
                    </Button>
                ) : (
                    <Button size="lg" disabled={isFormValid()} onClick={handlePostReview}>
                        등록하기
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ReviewForm;
