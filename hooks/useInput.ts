'use client';

import { useState, useRef, Dispatch, SetStateAction, useCallback } from 'react';
import { removeNonNumeric } from '@/shared/utils';

/* 간단한 유효성 검사 가능 type 에 따라 추가 로직 구현 가능 */

type Options = {
    type?: 'number' | 'string';
    initialValue?: string;
    maxLength?: number;
    minLength?: number;
};

type returnType = [
    string,
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    boolean,
    Dispatch<SetStateAction<string>>
];

export const useInput = (options?: Options): returnType => {
    const { initialValue = '', maxLength, minLength = 0, type = 'string' } = options || {};
    const [value, setValue] = useState<string>(initialValue || '');
    const isValid = useRef<boolean>(true);

    const handleNumber = (receivedValue: string) => {
        let result: string = receivedValue;

        if (maxLength && result.length > maxLength) {
            result = result.slice(0, maxLength);
        }

        isValid.current = result.length >= minLength;
        setValue(result);
    };

    const handleString = (receivedValue: string) => {
        let result: string = receivedValue;

        if (maxLength && result.length > maxLength) {
            result = result.slice(0, maxLength);
        }
        isValid.current = result.length >= minLength;
        setValue(result);
    };

    /** 첫번째로 실행되어 type에 따라 함수 호출 */
    const onChangeInput = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            const targetValue: string = e.target.value || '';

            if (type === 'number') {
                handleNumber(removeNonNumeric(targetValue));
            } else if (type === 'string') {
                handleString(targetValue);
            }
        },
        [type]
    );

    return [value, onChangeInput, isValid.current, setValue];
};
