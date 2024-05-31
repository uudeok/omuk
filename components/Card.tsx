'use client';

import styles from '../styles/card.module.css';
import List, { ListBox } from './common/List';
import Text from './common/Text';
import { useRouter } from 'next/navigation';
import { useMap } from '@/shared/context/MapProvider';
import { useCategory, useInfiniteScroll } from '@/hooks';
import { useEffect } from 'react';
import { ResponseType } from '@/shared/types';

const Card = () => {
    const router = useRouter();
    const { searchCategory } = useCategory();
    const { pagination, resData, map } = useMap();

    useEffect(() => {
        const { kakao } = window;
        if (!kakao || !map) return;

        kakao.maps.load(() => {
            searchCategory();
        });
    }, [searchCategory, map]);

    const fetchNextPage = () => {
        pagination?.gotoPage(pagination.current + 1);
    };

    const { observerEl } = useInfiniteScroll({ callbackFn: fetchNextPage, hasNextPage: pagination?.hasNextPage! });

    return (
        <List>
            {resData.map((res: ResponseType) => (
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
