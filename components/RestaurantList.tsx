'use client';

import styles from '../styles/restaurantList.module.css';
import List, { ListBox } from './common/List';
import Text from './common/Text';
import { useRouter } from 'next/navigation';
import { useMap } from '@/shared/context/MapProvider';
import { useCategory, useInfiniteScroll } from '@/hooks';
import { useEffect } from 'react';
import { ResponseType } from '@/shared/types';
import LoadingBar from './common/LoadingBar';

const RestaurantList = () => {
    const router = useRouter();
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
        <List>
            {isLoading && <LoadingBar />}
            {errorMsg && <div className={styles.error}>{errorMsg}</div>}

            {resData.map((res: ResponseType) => (
                <ListBox
                    onClick={() => {
                        router.push(`/${res.id}`);
                        // router.push(`/${res.id}`);
                    }}
                    key={res.id}
                    top={
                        <div className={styles.information}>
                            <Text typography="t4">{res.place_name}</Text>
                            <Text typography="st3">{res.road_address_name}</Text>
                            <Text typography="st3">{res.phone}</Text>
                        </div>
                    }
                    bottom={''}
                />
            ))}

            <div ref={observerEl} />
        </List>
    );
};

export default RestaurantList;

// m 버전 수정 전
// 'use client';

// import styles from '../styles/restaurantList.module.css';
// import List, { ListBox } from './common/List';
// import Text from './common/Text';
// import { useRouter } from 'next/navigation';
// import { useMap } from '@/shared/context/MapProvider';
// import { useCategory, useInfiniteScroll } from '@/hooks';
// import { useEffect } from 'react';
// import { ResponseType } from '@/shared/types';
// import LoadingBar from './common/LoadingBar';

// const RestaurantList = () => {
//     const router = useRouter();
//     const { searchCategory, isLoading, errorMsg } = useCategory();
//     const { pagination, resData, map } = useMap();

//     useEffect(() => {
//         const { kakao } = window;
//         if (!kakao || !map) return;

//         kakao.maps.load(() => {
//             searchCategory();
//         });
//     }, [searchCategory, map]);

//     const fetchNextPage = () => {
//         pagination?.gotoPage(pagination.current + 1);
//     };

//     const { observerEl } = useInfiniteScroll({
//         callbackFn: fetchNextPage,
//         hasNextPage: pagination?.hasNextPage!,
//     });

//     return (
//         <List>
//             {isLoading && <LoadingBar />}
//             {errorMsg && <div className={styles.error}>{errorMsg}</div>}

//             {resData.map((res: ResponseType) => (
//                 <ListBox
//                     onClick={() => {
//                         router.push(`/${res.id}`);
//                     }}
//                     key={res.id}
//                     top={
//                         <div className={styles.information}>
//                             <Text typography="t4">{res.place_name}</Text>
//                             <Text typography="st3">{res.road_address_name}</Text>
//                             <Text typography="st3">{res.phone}</Text>
//                         </div>
//                     }
//                     bottom={''}
//                 />
//             ))}

//             <div ref={observerEl} />
//         </List>
//     );
// };

// export default RestaurantList;
