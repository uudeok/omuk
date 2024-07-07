import { useCallback, useRef } from 'react';

export const useDebounce = <T extends (...args: any[]) => void>(callback: T, delay: number) => {
    const timer = useRef<NodeJS.Timeout | null>(null);
    console.log('sdsd');
    return useCallback(
        (...args: Parameters<T>) => {
            console.log('??');
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );
};
