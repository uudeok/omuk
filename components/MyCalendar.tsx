'use client';

import styles from '../styles/mycalendar.module.css';
import dayjs from 'dayjs';
import AngleRight from '../assets/angle-right.svg';
import AngleLeft from '../assets/angle-left.svg';
import { useState } from 'react';
import Text from './common/Text';
import { useCalendar } from '@/hooks';
import { ReviewType, getReviewList } from '@/services/reviewService';
import { cutText } from '@/shared/utils/stringUtils';
import Review from './Review';
import { useQuery } from '@tanstack/react-query';
import LoadingBar from './common/LoadingBar';

const MyCalendar = () => {
    const { prevController, nextController, body, curMonth, curYear, weeks } = useCalendar();

    const [selectedReivewList, setSelectedReviewList] = useState<ReviewType[] | undefined>([]);
    const [selectedDate, setSelectedDate] = useState<Date>();

    const displayDate = dayjs(selectedDate).format('YYYY-MM-DD');

    const { data: reviewList, isFetching } = useQuery({
        queryKey: ['reviewList'],
        queryFn: getReviewList,
    });

    const handleReview = (date: Date) => {
        setSelectedDate(date);
        const result = reviewList?.filter((review) => dayjs(review.visitDate).isSame(date));
        setSelectedReviewList(result);
    };

    return (
        <>
            <div className={styles.calendar}>
                <div className={styles.header}>
                    <div className={styles.controller} onClick={prevController}>
                        <AngleLeft width={15} />
                    </div>
                    <div className={styles.monthLabel}>
                        {curYear}년 {curMonth + 1}월
                    </div>
                    <div className={styles.controller} onClick={nextController}>
                        <AngleRight width={15} />
                    </div>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {weeks.ko.map((week, index) => (
                                <th key={index}>{week}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {body.map((rows, index) => (
                            <tr key={index}>
                                {rows.map((row) => {
                                    const review = reviewList?.find((review) =>
                                        dayjs(review.visitDate).isSame(row.date, 'day')
                                    );

                                    return (
                                        <td key={row.value}>
                                            <button
                                                className={`${styles.dateCell} ${review && styles.visited}`}
                                                onClick={() => handleReview(row.date)}
                                                disabled={row.date > new Date()}
                                            >
                                                {row.date.getDate()}
                                            </button>
                                            {review && (
                                                <div className={styles.placeName}>{cutText(review.placeName, 5)}</div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                {selectedDate && selectedReivewList && selectedReivewList.length > 0 && (
                    <div className={styles.review}>
                        <Text typography="t5">{displayDate} 에 방문했어요😋</Text>
                    </div>
                )}

                {selectedDate && selectedReivewList && selectedReivewList.length === 0 && (
                    <Text typography="t5">{displayDate} 리뷰가 없어요</Text>
                )}
                {selectedReivewList && <Review reviewList={selectedReivewList} />}
            </div>
        </>
    );
};

export default MyCalendar;