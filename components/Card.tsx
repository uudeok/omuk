'use client';

import List, { ListBox } from './common/List';
import Text from './common/Text';
import styles from '../styles/Card.module.css';
import { useRouter } from 'next/navigation';
import { useMap } from '@/shared/context/MapProvider';
import { useCategory } from '@/hooks/useCategory';
import { useEffect, useState } from 'react';

const Card = () => {
    const router = useRouter();
    const { searchCategory } = useCategory();
    const { restaurantData } = useMap();
    const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

    useEffect(() => {
        const { kakao } = window;
        if (!kakao) return;

        kakao.maps.load(() => {
            searchCategory();
        });
    }, [searchCategory]);

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer,drawing&autoload=false`;
    //     script.onload = () => {
    //         kakao.maps.load(() => {
    //             setIsKakaoLoaded(true);
    //         });
    //     };
    //     document.head.appendChild(script);
    // }, []);

    // useEffect(() => {
    //     if (isKakaoLoaded) {
    //         searchCategory();
    //     }
    // }, [isKakaoLoaded, searchCategory]);

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
