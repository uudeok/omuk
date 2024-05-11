'use client';

import styled, { css } from 'styled-components';

const InputBase = styled.input<{ hasError?: boolean }>`
    width: 100%;
    color: ${(props) => props.theme.colors.grey800};
    padding: 0 0 8px;
    color: ${(props) => props.theme.colors.grey900};
    height: 40px;
    font-weight: 500;
    font-size: 22px;
    border-radius: 1px;
    caret-color: ${(props) => props.theme.colors.mainColorDk};
    outline: none;
    border: 0 none;
    border-bottom: 2px solid ${(props) => props.theme.colors.grey300};
    :focus {
        border-bottom-color: ${(props) => props.theme.colors.mainColorlg};
    }
    ${({ hasError }) => (hasError ? errorStyle : '')}
    transition: background-color 0.2s ease;
`;

const errorStyle = css`
    color: ${(props) => props.theme.colors.red500};
    border-bottom-color: ${(props) => props.theme.colors.red500};
    :focus {
        border-bottom-color: ${(props) => props.theme.colors.red500};
    }
`;

export default InputBase;