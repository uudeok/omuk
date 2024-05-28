import { useState, useEffect, useRef, useCallback } from 'react';

type InfiniteScrollType = {
    callbackFn: () => void;
    hasNextPage: boolean;
};

export const useInfiniteScroll = ({ callbackFn, hasNextPage }: InfiniteScrollType) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const observerEl = useRef<HTMLDivElement>(null);

    const handleObserver = useCallback(
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

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, { threshold: 0 });
        const currentEl = observerEl.current;
        if (currentEl) {
            observer.observe(currentEl);
        }
        return () => {
            if (currentEl) {
                observer.unobserve(currentEl);
            }
        };
    }, [handleObserver]);

    return { observerEl, isLoading };
};
