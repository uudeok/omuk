'use client';

import styles from '../styles/components/reviewform.module.css';
import dayjs from 'dayjs';
import { useEffect, useState, useRef, useContext, useCallback, useMemo } from 'react';
import List, { ListRow } from '@/components/common/List';
import { useBoolean, useInput, useS3FileUploader } from '@/hooks';
import Text from '@/components/common/Text';
import Badge from '@/components/common/Badge';
import Button from './common/Button';
import Icons from './common/Icons';
import Input from './common/Input';
import InputBase from './common/InputBase';
import Rating from './common/Rating';
import { useRouter } from 'next/navigation';
import { FEEDBACK_LIST, COMPANIONS } from '@/constants';
import { FeedBackItem } from '@/shared/types';
import { deleteReview, getReviewData, postReview, updateReview } from '@/services/reviewService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Modal from './common/Modal';
import { initializeDate, makeAdress } from '@/shared/utils';
import { getImageData, updateImages, uploadImages } from '@/services/imageService';
import { AuthContext } from '@/shared/context/AuthProvider';
import Spinner from './common/Spinner';
import dynamic from 'next/dynamic';
import PreviewImage from './common/PreviewImage';
import { updateImagesUrls } from '@/services/reviewImageService';
import useResStore from '@/shared/lib/store/useResStore';

const AlertModal = dynamic(() => import('@/components/modal/AlertModal'));
const CalendarModal = dynamic(() => import('@/components/modal/CalendarModal'));

const ReviewForm = ({ res_id, resName }: { res_id: string; resName: string }) => {
    const queryClient = useQueryClient();
    const session = useContext(AuthContext);
    const router = useRouter();
    const fileRef = useRef<HTMLInputElement>(null);
    const { resData } = useResStore();

    const { handleFileInputChange, uploadFiles, alertMessage, imageUrls, setImageUrls, deleteFiles } =
        useS3FileUploader({
            maxSize: 5,
        });
    const [value, onChangeInput, isValid, setValue] = useInput({ maxLength: 30, minLength: 2 });
    const { value: isCalendarOpen, setFalse: closeCalendarModal, toggle: calendarModalToggle } = useBoolean();
    const { value: isErrorOpen, setFalse: closeErrorModal, setTrue: openErrorModal } = useBoolean();

    const [rate, setRate] = useState<number>(0);
    const [selectedPositives, setSelectedPositives] = useState<FeedBackItem[]>([]);
    const [selectedNegatives, setSelectedNegatives] = useState<FeedBackItem[]>([]);
    const [selectedCompanions, setSelectedCompanions] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(initializeDate);
    const [deleteImages, setDeleteImages] = useState<string[]>([]);

    const date = dayjs(selectedDate).format('YYYY-MM-DD');
    const positiveFeedback = useMemo(() => FEEDBACK_LIST.find((feedback) => feedback.type === 'positive')!, []);
    const negativeFeedback = useMemo(() => FEEDBACK_LIST.find((feedback) => feedback.type === 'negative')!, []);

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

    const reviewObj = {
        rate: rate,
        positive: selectedPositives.map((item) => item.value),
        negative: selectedNegatives.map((item) => item.value),
        res_id: res_id,
        placeName: resName,
        visitDate: selectedDate,
        companions: selectedCompanions,
        content: value,
        address: makeAdress(resData.basicInfo?.address),
    };

    // Review 작성
    const postReviewMutation = useMutation({
        mutationFn: async () => {
            const review_id = await postReview(reviewObj);
            const uploadedUrls = await uploadFiles();
            if (uploadedUrls) {
                await uploadImages(uploadedUrls, review_id);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['review', res_id] });
            router.replace(`/${res_id}`);
        },
        onError: (error) => {
            console.error(error);
            openErrorModal();
        },
    });

    // Review 수정
    const updateReviewMutation = useMutation({
        mutationFn: async () => {
            const review_id = await updateReview(reviewObj);
            const uploadedUrls = await uploadFiles();
            await deleteFiles(deleteImages);

            await updateImagesUrls(imageUrls, reviewData.id);

            if (uploadedUrls) {
                const newUrls = [...existingImages.images_url, ...uploadedUrls];
                await updateImages(newUrls, review_id);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['review', res_id] });
            router.replace(`/${res_id}`);
        },
        onError: (error) => {
            console.error(error);
            openErrorModal();
        },
    });

    const removeImage = (file: string) => {
        setImageUrls((prevImages) => prevImages.filter((img) => img !== file));
        setDeleteImages((prev) => [...prev, file]);
    };

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

    useEffect(() => {
        if (existingImages) {
            setImageUrls(existingImages.images_url);
        }
    }, [existingImages, setImageUrls]);

    const handleFeedbackClick = useCallback((feedback: FeedBackItem, isPositive: boolean) => {
        const setSelected = isPositive ? setSelectedPositives : setSelectedNegatives;
        setSelected((prev) => {
            const isSelected = prev.some((item) => item.id === feedback.id);
            return isSelected ? prev.filter((item) => item.id !== feedback.id) : [...prev, feedback];
        });
    }, []);

    const isFormValid = useMemo(
        () => !isValid || rate === 0 || !value || !selectedCompanions,
        [isValid, rate, value, selectedCompanions]
    );

    const handleDeleteReview = async () => {
        const process = window.confirm('리뷰를 삭제하시겠습니까?');
        if (process) {
            try {
                await deleteReview(res_id);
                await deleteFiles(imageUrls);
                router.replace(`/${res_id}`);
            } catch (error) {
                openErrorModal();
            } finally {
                queryClient.invalidateQueries({ queryKey: ['review', res_id] });
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {reviewData && (
                    <List>
                        <div className={styles.delete}>
                            <Button size="sm" role="none" onClick={handleDeleteReview}>
                                리뷰 삭제하기
                            </Button>
                        </div>
                    </List>
                )}

                <List>
                    <form className={styles.images} onSubmit={(e) => e.preventDefault()}>
                        <Text typography="t5">사진첨부</Text>

                        <div className={styles.slide}>
                            {imageUrls?.map((file, index) => (
                                <PreviewImage imageUrl={file} key={index} removeImage={removeImage} />
                            ))}
                        </div>

                        <div onClick={() => fileRef?.current?.click()} className={styles.addImg}>
                            사진을 추가해보세요 ({imageUrls.length}/5)
                        </div>

                        <Input bottomText={alertMessage && alertMessage}>
                            <InputBase
                                ref={fileRef}
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

                <List>
                    <ListRow
                        left={<Text typography="t5">언제 방문했나요?</Text>}
                        right={
                            <div onClick={() => calendarModalToggle()} className={styles.date}>
                                <Text typography="st3" color="white">
                                    {date}
                                </Text>
                            </div>
                        }
                    />
                </List>

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
                                    <Icons.FillStar width={20} />
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
                                    <Icons.Pencil width={20} />
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
                    <Button size="lg" disabled={isFormValid} onClick={() => updateReviewMutation.mutate()}>
                        {updateReviewMutation.isPending ? <Spinner size="md" /> : '수정하기'}
                    </Button>
                ) : (
                    <Button
                        size="lg"
                        disabled={isFormValid || postReviewMutation.isPending}
                        onClick={() => postReviewMutation.mutate()}
                    >
                        {postReviewMutation.isPending ? <Spinner size="md" /> : '등록하기'}
                    </Button>
                )}
            </div>

            <Modal isOpen={isCalendarOpen} onClose={closeCalendarModal}>
                <CalendarModal
                    setSelectedDate={setSelectedDate}
                    onClose={closeCalendarModal}
                    selectedDate={selectedDate}
                />
            </Modal>

            <Modal isOpen={isErrorOpen} onClose={closeErrorModal} showCloseButton={false}>
                <AlertModal
                    onClose={closeErrorModal}
                    redirectPath="/"
                    top={<Text typography="t5">오류가 발생했습니다</Text>}
                    bottom={<Text typography="t5">잠시 후 다시 시도해주세요</Text>}
                />
            </Modal>
        </div>
    );
};

export default ReviewForm;
