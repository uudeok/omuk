'use client';

import styles from '../../styles/layouts/map.module.css';
import { useMap } from '@/shared/context/MapProvider';
import LoadingBar from '../common/LoadingBar';
import { useEffect, useState } from 'react';
import { useGeoLocation } from '@/hooks';

const Map = () => {
    const { mapEl, setMap } = useMap();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { curLocation } = useGeoLocation();

    useEffect(() => {
        const { kakao } = window;
        if (!kakao || !mapEl?.current) return;
        setIsLoading(true);

        kakao.maps.load(() => {
            if (!curLocation) return;

            const { latitude, longitude } = curLocation;

            const center = new kakao.maps.LatLng(latitude, longitude);
            const options = {
                center,
                level: 3,
            };
            const map = new kakao.maps.Map(mapEl.current!, options);
            setMap(map);
            setIsLoading(false);
        });
    }, [curLocation]);

    return (
        <>
            {isLoading && (
                <div className={styles.loadingOverlay}>
                    <LoadingBar status="오늘은 뭐 먹지?" />
                </div>
            )}
            <div ref={mapEl} className={styles.map}></div>
        </>
    );
};

export default Map;

// 'use client';

// import styles from '../../styles/layouts/map.module.css';
// import { useMap } from '@/shared/context/MapProvider';
// import LoadingBar from '../common/LoadingBar';

// const Map = () => {
//     const { mapEl, isLoading } = useMap();

//     return (
//         <>
//             {isLoading && (
//                 <div className={styles.loadingOverlay}>
//                     <LoadingBar status="오늘은 뭐 먹지?" />
//                 </div>
//             )}
//             <div ref={mapEl} className={styles.map}></div>
//         </>
//     );
// };

// export default Map;
