'use client';

import { useMap } from '@/shared/context/MapProvider';
import { useCallback } from 'react';
import { IMarker, ResponseType } from '@/shared/types';
import { findUserBookmark } from '@/services/bookmarkService';
import { findUserReview } from '@/services/reviewService';

export const useMarker = () => {
    const { map, setMarkers } = useMap();

    const addMarker = useCallback(
        async (data: ResponseType[]) => {
            const { kakao } = window;

            if (!kakao || !map) return;

            const bounds = new kakao.maps.LatLngBounds();

            // 모든 비동기 작업을 처리할 배열
            const markersPromises = data.map(async (res) => {
                const position = new kakao.maps.LatLng(Number(res.y), Number(res.x));
                const name = res.place_name;

                let markerImage = null;
                try {
                    const hasBookmark = await findUserBookmark(res.id);

                    if (hasBookmark) {
                        const imageSrc = './bookmark.png';
                        const imageSize = new kakao.maps.Size(55, 50);
                        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
                    }
                } catch (error) {
                    console.error('Error checking bookmark:', error);
                }

                const marker = new kakao.maps.Marker({
                    map: map,
                    position: position,
                    image: markerImage || undefined, // image property is optional
                });

                bounds.extend(position);

                const content = `<div style="font-weight: bold; border-radius: 15px; padding: 10px; background-color: #fbc62e; color: white; font-size: 14px;">${name}</div>`;
                const customOverlay = new kakao.maps.CustomOverlay({
                    position: position,
                    content: content,
                    yAnchor: 2.2,
                });

                kakao.maps.event.addListener(marker, 'mouseover', () => {
                    customOverlay.setMap(map);
                });

                kakao.maps.event.addListener(marker, 'mouseout', () => {
                    customOverlay.setMap(null);
                });

                return marker;
            });

            try {
                // 모든 비동기 작업이 완료될 때까지 기다립니다.
                const markersArr = await Promise.all(markersPromises);

                // 화면 안에 전부 보이도록
                map.setBounds(bounds);

                // setMarkers에 데이터 쌓기
                setMarkers((prev: any) => [...prev, ...markersArr]);
            } catch (error) {
                console.error('Error creating markers:', error);
            }
        },
        [map, setMarkers]
    );

    return { addMarker };
};

// 'use client';

// import { useMap } from '@/shared/context/MapProvider';
// import { useCallback } from 'react';
// import { ResponseType } from '@/shared/types';

// export const useMarker = () => {
//     const { map, setMarkers } = useMap();

//     const addMarker = useCallback(
//         (data: ResponseType[]) => {
//             const { kakao } = window;

//             if (!kakao || !map) return;

//             const bounds = new kakao.maps.LatLngBounds();

//             let markersArr: any[] = [];

//             data.forEach(async (res) => {
//                 const position = new kakao.maps.LatLng(Number(res.y), Number(res.x));
//                 const name = res.place_name;

//                 const marker = new kakao.maps.Marker({
//                     map: map,
//                     position: position,
//                 });

//                 bounds.extend(new kakao.maps.LatLng(Number(res.y), Number(res.x)));

//                 /* marker 생성 */
//                 // marker.setMap(map);

//                 const content = `<div style="font-weight : bold; border-radius : 15px; padding: 10px; background-color: #fbc62e; color: white; font-size: 14px;">${name}</div>`;

//                 const customOverlay = new kakao.maps.CustomOverlay({
//                     position: position,
//                     content: content,
//                     yAnchor: 2.2,
//                 });

//                 kakao.maps.event.addListener(marker, 'mouseover', function () {
//                     customOverlay.setMap(map);
//                 });

//                 kakao.maps.event.addListener(marker, 'mouseout', function () {
//                     customOverlay.setMap(null);
//                 });

//                 /* 화면 안에 전부 보이도록  */
//                 map.setBounds(bounds);

//                 /* marker 객체 생성 */
//                 markersArr.push(marker);
//             });

//             /* setMarkers 에 데이터 쌓기  */
//             setMarkers((prev) => [...prev, ...markersArr]);
//         },
//         [map, setMarkers]
//     );

//     return { addMarker };
// };
