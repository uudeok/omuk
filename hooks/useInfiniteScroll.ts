'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

type InfiniteScrollType = {
    callbackFn: () => void;
    hasNextPage: boolean;
    customHandleObserver?: (entries: IntersectionObserverEntry[]) => void;
};

export const useInfiniteScroll = ({ callbackFn, hasNextPage, customHandleObserver }: InfiniteScrollType) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const observerEl = useRef<HTMLDivElement>(null);

    const defaultHandleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && !isLoading && hasNextPage) {
                setIsLoading(true);
                callbackFn();
                setIsLoading(false);
            }
        },
        [callbackFn, isLoading, hasNextPage]
    );

    // custom observer 가 있는 경우
    const handleObserver = customHandleObserver || defaultHandleObserver;

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, { threshold: 0 });
        const currentEl = observerEl.current;
        if (currentEl) observer.observe(currentEl);

        return () => {
            if (currentEl) observer.unobserve(currentEl);
        };
    }, [handleObserver]);

    return { observerEl, isLoading };
};
