'use client';

import { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import { calculateMonthInfo } from '@/shared/utils';
import { MONTH_LABEL_VALUES } from '@/shared/types';
import { MONTH_LABEL } from '@/constants/calendar';

export interface WeekLabels {
    ko: string[];
    en: string[];
}

export interface CalendarCell {
    date: Date;
    value: string;
}

const TOTAL_DAYS = 42;

export const useCalendar = () => {
    const [curYear, setCurYear] = useState<number>(new Date().getFullYear());
    const [curMonth, setCurMonth] = useState<number>(new Date().getMonth());
    const [weeks, setWeeks] = useState<WeekLabels>({
        ko: ['일', '월', '화', '수', '목', '금', '토'],
        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
    });

    const [body, setBody] = useState<CalendarCell[][]>([]);

    const prevController = (): void => {
        if (curMonth === 0) {
            setCurMonth(11);
            setCurYear((prevYear) => prevYear - 1);
        } else {
            setCurMonth((prevMonth) => prevMonth - 1);
        }
    };

    const nextController = (): void => {
        if (curMonth === 11) {
            setCurMonth(0);
            setCurYear((prevYear) => prevYear + 1);
        } else {
            setCurMonth((prevMonth) => prevMonth + 1);
        }
    };

    const renderDate = useCallback(() => {
        const { firstDay, lastDate } = calculateMonthInfo(curYear, curMonth);
        let dateCell: number = new Date(curYear, curMonth, 1 - firstDay).getDate();

        let count: number = 0;
        let monthLabel: MONTH_LABEL_VALUES = MONTH_LABEL.MONTH_PREV;
        let month: number = curMonth - 1;

        let cells = [];

        while (count < TOTAL_DAYS) {
            if (count === firstDay) {
                monthLabel = MONTH_LABEL.MONTH_CURRENT;
                month++;
                dateCell = 1;
            }

            if (count > firstDay && dateCell > lastDate) {
                monthLabel = MONTH_LABEL.MONTH_NEXT;
                month++;
                dateCell = 1;
            }

            const formattedDate = dayjs(new Date(curYear, month, dateCell)).format('YYYY-MM-DD');

            cells.push({ date: new Date(curYear, month, dateCell), value: formattedDate });

            count++;
            dateCell++;
        }

        let rows = [];
        while (cells.length) {
            const row = cells.splice(0, 7);
            rows.push(row);
        }

        setBody(rows);
    }, [curMonth, curYear]);

    useEffect(() => {
        renderDate();
    }, [curYear, curMonth, renderDate]);

    return { prevController, nextController, curYear, curMonth, weeks, body };
};
