'use client';

import styles from '../styles/components/restaurantList.module.css';
import List, { ListBox } from './common/List';
import Text from './common/Text';
import { useMap } from '@/shared/context/MapProvider';
import { useCategory, useInfiniteScroll } from '@/hooks';
import { useEffect } from 'react';
import { ResponseType } from '@/shared/types';
import LoadingBar from './common/LoadingBar';
import Link from 'next/link';

const RestaurantList = () => {
    const { searchCategory, isLoading, errorMsg } = useCategory();
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

    const { observerEl } = useInfiniteScroll({
        callbackFn: fetchNextPage,
        hasNextPage: pagination?.hasNextPage!,
    });

    return (
        <div>
            {isLoading && <LoadingBar />}
            {errorMsg && <div className={styles.error}>{errorMsg}</div>}

            <List>
                {resData.map((res: ResponseType) => (
                    <Link key={res.id} prefetch href={`/${res.id}`}>
                        <ListBox
                            top={
                                <div className={styles.information}>
                                    <Text typography="t4">{res.place_name}</Text>
                                    <Text typography="st3">{res.road_address_name}</Text>
                                    <Text typography="st3">{res.phone}</Text>
                                </div>
                            }
                            bottom={''}
                        />
                    </Link>
                ))}
            </List>
            <div ref={observerEl} />
        </div>
    );
};

export default RestaurantList;
