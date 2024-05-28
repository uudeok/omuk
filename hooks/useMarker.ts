'use client';

import { useMap } from '@/shared/context/MapProvider';
import { useCallback } from 'react';
import { ResponseType } from '@/shared/types';

export const useMarker = () => {
    const { map, setMarkers } = useMap();

    const addMarker = useCallback(
        (data: ResponseType[]) => {
            const { kakao } = window;
            if (!kakao || !data || !map) return;

            const bounds = new kakao.maps.LatLngBounds();

            let markersArr: any[] = [];

            data.forEach((res) => {
                const position = new kakao.maps.LatLng(Number(res.y), Number(res.x));

                const marker = new kakao.maps.Marker({
                    map: map,
                    position: position,
                });

                console.log('각자', marker);

                bounds.extend(new kakao.maps.LatLng(Number(res.y), Number(res.x)));

                /* marker 생성 */
                marker.setMap(map);

                /* map bound 생성 */
                map.setBounds(bounds);

                /* marker 객체 생성 */
                markersArr.push(marker);
            });

            /* setMarkers 에 데이터 넣기  */
            setMarkers((prev) => [...prev, ...markersArr]);
        },
        [map, setMarkers]
    );

    return { addMarker };
};
