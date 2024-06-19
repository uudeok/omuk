import { MONTH_LABEL } from '@/constants/calendar';
import { MONTH_LABEL_VALUES } from '../types';

export const calculateMonthInfo = (year: number, month: number) => {
    const firstDay = new Date(year, month).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    return { firstDay, lastDate };
};

export const getSelectedMonth = (month: MONTH_LABEL_VALUES, curMonth: number) => {
    switch (month) {
        case MONTH_LABEL.MONTH_PREV:
            return curMonth === 0 ? 11 : curMonth - 1;
        case MONTH_LABEL.MONTH_CURRENT:
            return curMonth;
        case MONTH_LABEL.MONTH_NEXT:
            return curMonth === 11 ? 0 : curMonth + 1;
        default:
            throw new Error('error : Calendar.invalid Month Name');
    }
};

export const initializeDate = () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
};
