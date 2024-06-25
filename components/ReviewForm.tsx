'use client';

import styles from '../styles/reviewform.module.css';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import List, { ListRow } from '@/components/common/List';
import { useBoolean, useInput, useSession } from '@/hooks';
import Text from '@/components/common/Text';
import Badge from '@/components/common/Badge';
import Button from './common/Button';
import FillStar from '../assets/fillStar.svg';
import Pencil from '../assets/pencil.svg';
import Input from './common/Input';
import InputBase from './common/InputBase';
import Rating from './common/Rating';
import { useRouter } from 'next/navigation';
import { FEEDBACK_LIST, COMPANIONS } from '@/constants';
import { FeedBackItem } from '@/shared/types';
import { getReviewData, postReview, updateReview } from '@/services/reviewService';
import { useQuery } from '@tanstack/react-query';
import Modal from './common/Modal';
import CalendarModal from './CalendarModal';
import { initializeDate } from '@/shared/utils/calendarUtil';

const ReviewForm = ({ res_id, resName }: { res_id: string; resName: string }) => {
    const session = useSession();
    const router = useRouter();

    const [value, onChangeInput, isValid, setValue] = useInput({ maxLength: 30, minLength: 2 });
    const { value: isOpen, setFalse: closeModal, toggle: ModalToggle } = useBoolean();

    const [rate, setRate] = useState<number>(0);
    const [selectedPositives, setSelectedPositives] = useState<FeedBackItem[]>([]);
    const [selectedNegatives, setSelectedNegatives] = useState<FeedBackItem[]>([]);
    const [selectedCompanions, setSelectedCompanions] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(initializeDate);

    const date = dayjs(selectedDate).format('YYYY-MM-DD');
    const positiveFeedback = FEEDBACK_LIST.find((feedback) => feedback.type === 'positive')!;
    const negativeFeedback = FEEDBACK_LIST.find((feedback) => feedback.type === 'negative')!;

    const { data: reviewData } = useQuery({
        queryKey: ['review', res_id],
        queryFn: () => getReviewData(res_id),
        enabled: !!session,
    });

    // 리뷰가 있는 경우 데이터 채워넣기
    useEffect(() => {
        if (reviewData) {
            setRate(reviewData.rate);
            setValue(reviewData.comment);
            setSelectedPositives(positiveFeedback.items.filter((item) => reviewData.positive?.includes(item.value)));
            setSelectedNegatives(negativeFeedback.items.filter((item) => reviewData.negative?.includes(item.value)));
            setSelectedCompanions(reviewData.companions);
            setSelectedDate(reviewData.visitDate);
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

    const handleCompanionClick = (companion: string) => {
        setSelectedCompanions(companion);
    };

    const handleUpdateReview = async (method: 'post' | 'update') => {
        const reviewData = {
            rate: rate,
            positive: selectedPositives.map((item) => item.value),
            negative: selectedNegatives.map((item) => item.value),
            res_id: res_id,
            placeName: resName,
            visitDate: selectedDate,
            companions: selectedCompanions,
            comment: value,
        };

        if (method === 'post') {
            await postReview(reviewData);
        } else if (method === 'update') {
            await updateReview(reviewData);
        }

        router.replace(`/${res_id}`);
    };

    const isFormValid = () => !isValid || rate === 0 || !value || !selectedCompanions;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div>
                    <List>
                        <ListRow left={<Text typography="t5">누구와 ?</Text>} right={''} />
                        <div className={styles.companions}>
                            {COMPANIONS.map((item) => (
                                <Badge
                                    key={item.key}
                                    onClick={() => handleCompanionClick(item.key)}
                                    isSelected={item.key === selectedCompanions}
                                >
                                    {item.value}
                                </Badge>
                            ))}
                        </div>
                    </List>
                </div>

                <div>
                    <List>
                        <ListRow
                            left={<Text typography="t5">언제 방문했나요?</Text>}
                            right={
                                <div onClick={() => ModalToggle()} className={styles.date}>
                                    <Text typography="st3" color="white">
                                        {date}
                                    </Text>
                                </div>
                            }
                        />
                    </List>
                </div>

                <List>
                    <ListRow left={<Text typography="t5">이런 점이 좋았어용!😆</Text>} right="" />
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
                    <ListRow left={<Text typography="t5">이런 점이 아쉬웠어요!😅</Text>} right="" />
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
                        <div className={styles.comment}>
                            <Input>
                                <InputBase
                                    onChange={onChangeInput}
                                    $hasError={!isValid}
                                    placeholder="30자 이내로 한줄평을 작성해주세요"
                                    value={value}
                                />
                            </Input>
                        </div>
                    </List>
                </div>
            </div>
            <div>
                {reviewData ? (
                    <Button size="lg" disabled={isFormValid()} onClick={() => handleUpdateReview('update')}>
                        수정하기
                    </Button>
                ) : (
                    <Button size="lg" disabled={isFormValid()} onClick={() => handleUpdateReview('post')}>
                        등록하기
                    </Button>
                )}
            </div>

            <Modal isOpen={isOpen} onClose={closeModal}>
                <CalendarModal setSelectedDate={setSelectedDate} onClose={closeModal} selectedDate={selectedDate} />
            </Modal>
        </div>
    );
};

export default ReviewForm;
