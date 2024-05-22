import React, { ReactNode } from 'react';
import styles from '../../styles/Common.module.css';
import { valueOf } from '@/types/data';

export const Typography = {
    T1: 't1',
    T2: 't2',
    T3: 't3',
    T4: 't4',
    T5: 't5',
    ST1: 'st1',
    ST2: 'st2',
    ST3: 'st3',
    ST4: 'st4',
    ST5: 'st5',
} as const;

export type TypographyValue = valueOf<typeof Typography>;

export type TextProps = {
    children: ReactNode;
    color?: string;
    textAlign?: string;
    typography: TypographyValue;
};

const Text = (props: TextProps) => {
    const { typography, color, textAlign, children, ...rest } = props;
    return (
        <span className={`${styles.textBase} ${styles[typography]}`} style={{ color }}>
            {children}
        </span>
    );
};

export default Text;
