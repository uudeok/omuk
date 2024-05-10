'use client';

import { useState, useRef } from 'react';
import { removeNonNumeric } from '@/utils/string';

interface Options {
    initialValue?: string;
    maxLength?: number;
    minLength?: number;
    type?: 'number' | 'string';
}

type returnType = [string, (e: React.ChangeEvent<HTMLInputElement>) => void, boolean];

/**
 * 간단한 유효성 검사 가능
 * type 에 따라 추가 로직 구현 가능
 */

const useInput = (options?: Options): returnType => {
    const { initialValue = '', maxLength, minLength = 0, type = 'string' } = options || {};
    const [value, setValue] = useState<string>(initialValue || '');
    const isValid = useRef<boolean>(true);

    const handleNumber = (receivedValue: string) => {
        let result: string = receivedValue;

        if (type === 'number') {
            result = removeNonNumeric(result);
        }

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
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetValue: string = e.target.value || '';

        if (type === 'number') {
            handleNumber(removeNonNumeric(targetValue));
        } else {
            handleString(targetValue);
        }
    };

    return [value, onChangeInput, isValid.current];
};

export default useInput;
