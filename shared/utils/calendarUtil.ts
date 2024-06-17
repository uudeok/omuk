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

export type MONTH_LABEL_TYPE = typeof MONTH_LABEL;
export type MONTH_LABEL_KEYS = keyof MONTH_LABEL_TYPE;
export type MONTH_LABEL_VALUES = MONTH_LABEL_TYPE[MONTH_LABEL_KEYS];

export type Time = {
    label: string;
    value: Date;
    selectable: boolean;
};

export const MONTH_LABEL = {
    MONTH_PREV: 'prev',
    MONTH_CURRENT: 'current',
    MONTH_NEXT: 'next',
} as const;
