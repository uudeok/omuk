'use client';

import { useMap } from '@/shared/context/MapProvider';
import { useCallback } from 'react';
import { ResponseType } from '@/shared/types';
import { getMarkerData } from '@/services/reviewService';

export const useMarker = () => {
    const { map, setMarkers } = useMap();

    const addMarker = useCallback(
        (data: ResponseType[]) => {
            const { kakao } = window;

            if (!kakao || !map) return;

            const bounds = new kakao.maps.LatLngBounds();

            let markersArr: any[] = [];

            data.forEach(async (res) => {
                const position = new kakao.maps.LatLng(Number(res.y), Number(res.x));
                const name = res.place_name;

                const marker = new kakao.maps.Marker({
                    map: map,
                    position: position,
                });

                bounds.extend(new kakao.maps.LatLng(Number(res.y), Number(res.x)));

                /* marker 생성 */
                // marker.setMap(map);

                const content = `<div style="font-weight : bold; border-radius : 15px; padding: 10px; background-color: #fbc62e; color: white; font-size: 14px;">${name}</div>`;

                const customOverlay = new kakao.maps.CustomOverlay({
                    position: position,
                    content: content,
                    yAnchor: 2.2,
                });

                kakao.maps.event.addListener(marker, 'mouseover', function () {
                    customOverlay.setMap(map);
                });

                kakao.maps.event.addListener(marker, 'mouseout', function () {
                    customOverlay.setMap(null);
                });

                /* 화면 안에 전부 보이도록  */
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
