import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { valueOf } from '@/types/common';

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
    children?: ReactNode;
    color?: string;
    textAlign?: string;
    typography: TypographyValue;
};

const Text = (props: TextProps) => {
    const { typography, color, textAlign, children, ...rest } = props;
    return (
        <TextBase typography={typography} style={{ color }}>
            {children}
        </TextBase>
    );
};

export default Text;

const TextBase = styled.span<{ typography: string }>`
    font-weight: normal;
    color: inherit;
    text-align: inherit;

    ${({ typography }) => {
        switch (typography) {
            case 't1':
                return css`
                    font-size: 30px;
                    font-weight: bold;
                `;
            case 't2':
                return css`
                    font-size: 28px;
                    font-weight: bold;
                `;
            case 't3':
                return css`
                    font-size: 26px;
                    font-weight: bold;
                `;
            case 't4':
                return css`
                    font-size: 24px;
                    font-weight: bold;
                `;
            case 't5':
                return css`
                    font-size: 22px;
                    font-weight: bold;
                `;
            case 'st1':
                return css`
                    font-size: 24px;
                    font-weight: normal;
                `;
            case 'st2':
                return css`
                    font-size: 20px;
                    font-weight: normal;
                `;
            case 'st3':
                return css`
                    font-size: 16px;
                    font-weight: normal;
                `;
            case 'st4':
                return css`
                    font-size: 14px;
                    font-weight: normal;
                `;
            case 'st5':
                return css`
                    font-size: 12px;
                    font-weight: normal;
                `;
            default:
                return null;
        }
    }}
`;
