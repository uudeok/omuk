'use client';

import styles from '../styles/components/mycalendar.module.css';
import dayjs from 'dayjs';
import Icons from './common/Icons';
import { useState } from 'react';
import Text from './common/Text';
import { useCalendar } from '@/hooks';
import { ReviewType, getReviewsByMonth } from '@/services/reviewService';
import { cutText } from '@/shared/utils/stringUtil';
import CompactReview from './CompactReview';
import { useQuery } from '@tanstack/react-query';

const MyCalendar = () => {
    const { prevController, nextController, body, curMonth, curYear, weeks } = useCalendar();

    const [selectedReivewList, setSelectedReviewList] = useState<ReviewType[] | undefined>([]);
    const [selectedDate, setSelectedDate] = useState<Date>();

    const displayDate = dayjs(selectedDate).format('YYYY-MM-DD');

    const { data: reviewList } = useQuery({
        queryKey: ['reviewByMonth', curYear, curMonth],
        queryFn: () => getReviewsByMonth(curYear, curMonth),
    });

    const handleSelectedDate = (date: Date) => {
        setSelectedDate(date);
        const result = reviewList?.filter((review) => dayjs(review.visitDate).isSame(date));
        setSelectedReviewList(result);
    };

    // 현재 월보다 이후의 월을 선택하지 못하도록 한다
    const isNextMonthDisabled = () => {
        const date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth() + 1;

        const selectedLastDay = new Date(curYear, curMonth + 1, 0);
        const currentLastDay = new Date(currentYear, currentMonth, 0);

        return selectedLastDay >= currentLastDay;
    };

    // 달력에 표시된 날짜 중에서, 현재 선택된 월에 속하지 않는 날짜를 구분하기 위한 함수
    const checkIfNotCurrentMonth = (date: Date) => {
        return curMonth !== date.getMonth();
    };

    return (
        <div className={styles.container}>
            <Text typography="t5">날짜를 클릭해보세요</Text>
            <div className={styles.calendar}>
                <div className={styles.header}>
                    <div className={styles.controller} onClick={prevController}>
                        <Icons.AngleLeft width={15} />
                    </div>
                    <div className={styles.monthLabel}>
                        {curYear}년 {curMonth + 1}월
                    </div>
                    <div
                        className={`${styles.controller} ${isNextMonthDisabled() ? styles.disabled : ''}`}
                        onClick={nextController}
                    >
                        <Icons.AngleRight width={15} />
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
                                                className={`${styles.dateCell} ${review && styles.visited} ${
                                                    selectedDate === row.date && styles.selected
                                                } ${checkIfNotCurrentMonth(row.date) && styles.notCurrent}`}
                                                onClick={() => handleSelectedDate(row.date)}
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
                {selectedReivewList && <CompactReview reviewList={selectedReivewList} />}
            </div>
        </div>
    );
};

export default MyCalendar;
