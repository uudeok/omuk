import { useCallback, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

type UseBooleanReturn = {
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
};

export const useBoolean = (defaultValue = false): UseBooleanReturn => {
    if (typeof defaultValue !== 'boolean') {
        throw new Error('defaultValue must be boolean');
    }
    const [value, setValue] = useState(defaultValue);

    const setTrue = useCallback(() => {
        setValue(true);
    }, []);

    const setFalse = useCallback(() => {
        setValue(false);
    }, []);

    const toggle = useCallback(() => {
        setValue((prev) => !prev);
    }, []);

    return { value, setValue, setTrue, setFalse, toggle };
};
