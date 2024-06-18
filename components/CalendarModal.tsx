'use client';

import styles from '../styles/calendar.module.css';
import dayjs from 'dayjs';
import { useState, Dispatch, SetStateAction } from 'react';
import { useCalendar } from '@/hooks';
import AngleRight from '../assets/angle-right.svg';
import AngleLeft from '../assets/angle-left.svg';

type Props = {
    setSelectedDate: Dispatch<SetStateAction<Date>>;
    onClose: () => void;
};

const CalendarModal = ({ setSelectedDate, onClose }: Props) => {
    const [selected, setSelected] = useState<Date>();

    const handleDate = (date: Date) => {
        setSelected(date);
        setSelectedDate(date);
        onClose();
    };

    const { prevController, nextController, body, curMonth, curYear, weeks } = useCalendar();

    return (
        <div className={styles.container}>
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
                            {rows.map((row) => (
                                <td key={row.value}>
                                    <button
                                        className={`${styles.dateCell} ${row.date === selected ? styles.selected : ''}`}
                                        onClick={() => handleDate(row.date)}
                                        disabled={row.date > new Date()}
                                    >
                                        {row.date.getDate()}
                                    </button>
                                    {dayjs().isSame(row.date, 'day') && <div className={styles.today}>Today</div>}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CalendarModal;
