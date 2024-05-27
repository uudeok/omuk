'use client';

import styles from '../styles/Card.module.css';
import List, { ListBox } from './common/List';
import Text from './common/Text';
import { useRouter } from 'next/navigation';
import { useMap } from '@/shared/context/MapProvider';
import { useCategory } from '@/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';

const Card = () => {
    const router = useRouter();
    const { searchCategory } = useCategory();
    const [isLoading, setIsLoading] = useState(false);
    const observerEl = useRef<HTMLDivElement>(null);
    const { pagination, resData } = useMap();

    useEffect(() => {
        const { kakao } = window;
        if (!kakao) return;
        kakao.maps.load(() => {
            searchCategory();
        });
    }, [searchCategory]);

    const fetchNextPage = useCallback(() => {
        if (pagination?.hasNextPage) {
            setIsLoading(true);
            pagination.gotoPage(pagination.current + 1);
            setIsLoading(false);
        }
    }, [pagination]);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && !isLoading && pagination?.hasNextPage) {
                fetchNextPage();
            }
        },
        [fetchNextPage, isLoading, pagination]
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

    return (
        <List>
            {resData.map((res: any) => (
                <ListBox
                    onClick={() => {
                        router.push(`/${res.id}`);
                    }}
                    key={res.id}
                    top={
                        <div className={styles.title}>
                            <Text typography="t4">{res.place_name}</Text>
                            <Text typography="st3">{res.road_address_name}</Text>
                        </div>
                    }
                    bottom={
                        <div>
                            <Text typography="st3">{res.phone}</Text>
                        </div>
                    }
                />
            ))}
            <div ref={observerEl} />
        </List>
    );
};

export default Card;
