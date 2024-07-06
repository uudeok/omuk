'use client';

import styles from '../styles/reviewform.module.css';
import dayjs from 'dayjs';
import { useEffect, useState, useRef } from 'react';
import List, { ListRow } from '@/components/common/List';
import { useBoolean, useInput, useS3FileUpload, useSession } from '@/hooks';
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
import CalendarModal from './modal/CalendarModal';
import { initializeDate } from '@/shared/utils/calendarUtil';
import { getImageData, updateImages, uploadImages } from '@/services/imageService';

const ReviewForm = ({ res_id, resName }: { res_id: string; resName: string }) => {
    const session = useSession();
    const router = useRouter();
    const fileRef = useRef<HTMLInputElement>(null);

    const { setFiles, files, handleFileInputChange, uploadFiles, alertMessage, convertToFile } = useS3FileUpload({
        maxSize: 5,
    });
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

    const { data: existingImages } = useQuery({
        queryKey: ['exisitImage', reviewData?.id],
        queryFn: () => getImageData(reviewData?.id),
        enabled: !!reviewData,
    });

    // 리뷰가 있는 경우 데이터 채워넣기
    useEffect(() => {
        if (reviewData) {
            setRate(reviewData.rate);
            setValue(reviewData.content);
            setSelectedPositives(positiveFeedback.items.filter((item) => reviewData.positive?.includes(item.value)));
            setSelectedNegatives(negativeFeedback.items.filter((item) => reviewData.negative?.includes(item.value)));
            setSelectedCompanions(reviewData.companions);
            setSelectedDate(reviewData.visitDate);
        }
    }, [reviewData, setValue, positiveFeedback.items, negativeFeedback.items]);

    // 업로드 한 이미지가 있는 경우, 이미지 Url 을 File 객체로 변환작업
    useEffect(() => {
        if (existingImages) {
            convertToFile(existingImages);
        }
    }, [existingImages, convertToFile]);

    const handleFeedbackClick = (feedback: FeedBackItem, isPositive: boolean) => {
        const setSelected = isPositive ? setSelectedPositives : setSelectedNegatives;
        setSelected((prev) =>
            prev.some((item) => item.id === feedback.id)
                ? prev.filter((item) => item.id !== feedback.id)
                : [...prev, feedback]
        );
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
            content: value,
        };

        if (method === 'post') {
            const review_id = await postReview(reviewData);
            const uploadedUrls = await uploadFiles();
            if (uploadedUrls) {
                await uploadImages('review_images', uploadedUrls, review_id);
            }
        } else if (method === 'update') {
            const review_id = await updateReview(reviewData);
            const uploadedUrls = await uploadFiles();
            if (uploadedUrls) {
                await updateImages('review_images', uploadedUrls, review_id);
            }
        }

        router.replace(`/${res_id}`);
    };

    // 가려진 input file 을 trigger 하는 함수
    const triggerFileInput = () => {
        fileRef?.current?.click();
    };

    const removeImage = (file: File) => {
        setFiles((prevImages) => prevImages.filter((img) => img !== file));
    };

    const isFormValid = () => !isValid || rate === 0 || !value || !selectedCompanions;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <List>
                    <form className={styles.images} onSubmit={(e) => e.preventDefault()}>
                        <Text typography="t5">사진첨부</Text>

                        <div className={styles.slide}>
                            {files?.map((file, index) => (
                                <div className={styles.slideImg} key={index}>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        width="160px"
                                        height="160px"
                                        alt={`image${index}`}
                                    />
                                    <Button size="sm" role="round" onClick={() => removeImage(file)}>
                                        x
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <div onClick={triggerFileInput} className={styles.addImg}>
                            사진을 추가해보세요 ({files.length}/5)
                        </div>

                        <Input bottomText={alertMessage && alertMessage}>
                            <InputBase
                                ref={fileRef}
                                // name="file"
                                className={styles.hidden}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileInputChange}
                            ></InputBase>
                        </Input>
                    </form>
                </List>

                <List>
                    <ListRow left={<Text typography="t5">누구와 ?</Text>} right={''} />
                    <div className={styles.companions}>
                        {COMPANIONS.map((item) => (
                            <Badge
                                key={item.key}
                                onClick={() => setSelectedCompanions(item.key)}
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
