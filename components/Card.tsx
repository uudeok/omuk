'use client';

import styles from '../styles/Card.module.css';
import List, { ListBox } from './common/List';
import Text from './common/Text';
import { useRouter } from 'next/navigation';
import { useMap } from '@/shared/context/MapProvider';
import { useCategory } from '@/hooks';
import { useEffect } from 'react';

const Card = () => {
    const router = useRouter();
    const { searchCategory } = useCategory();
    const { restaurantData } = useMap();

    useEffect(() => {
        const { kakao } = window;
        if (!kakao) return;

        kakao.maps.load(() => {
            searchCategory();
        });
    }, [searchCategory]);

    return (
        <List>
            {restaurantData?.map((res: any) => (
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
        </List>
    );
};

export default Card;
