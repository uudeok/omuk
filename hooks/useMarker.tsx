'use client';

import styles from '../styles/ui/overlay.module.css';
import { useMap } from '@/shared/context/MapProvider';
import { useCallback, useState } from 'react';
import { ResponseType } from '@/shared/types';
import { cutCategory } from '@/shared/utils';

export const useMarker = () => {
    const { map, setMarkers } = useMap();
    const [overlayArr, setOverlayArr] = useState<kakao.maps.CustomOverlay[]>([]);

    const addMarker = useCallback(
        (data: ResponseType[]) => {
            const { kakao } = window;

            if (!kakao || !map) return;

            const bounds = new kakao.maps.LatLngBounds();

            let markersArr: kakao.maps.Marker[] = [];

            data.forEach(async (res) => {
                const position = new kakao.maps.LatLng(Number(res.y), Number(res.x));

                const marker = new kakao.maps.Marker({
                    map: map,
                    position: position,
                });

                /* 화면 안에 marker 바운드  */
                bounds.extend(new kakao.maps.LatLng(Number(res.y), Number(res.x)));
                map.setBounds(bounds);

                /** custom overlay 구현 */
                const content = `            
            <div class="${styles.customOverlay}">
                <div class="${styles.header}">
                    <h2 class="${styles.placeName}">${res.place_name}</h2>   
                    <button class="${styles.closeButton}">X</button>
                </div>

                <div class="${styles.content}">
                    <span>${cutCategory(res.category_name)}</span>
                    <span>${res.phone}</span>
                    <p>${res.road_address_name}</p>
                </div>
                 <div class="${styles.overlayArrow}"></div>
          
            </div>
                `;

                const overlay = new kakao.maps.CustomOverlay({
                    position: position,
                    content: content,
                    zIndex: 3,
                    clickable: true,
                    yAnchor: 1.5,
                });

                kakao.maps.event.addListener(marker, 'click', function () {
                    overlayArr.forEach((o) => o.setMap(null));

                    overlay.setMap(map);
                });

                markersArr.push(marker);
                overlayArr.push(overlay);
            });

            document.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;
                if (target && target.classList.contains(styles.closeButton)) {
                    overlayArr.forEach((o) => o.setMap(null));
                }
            });

            /* setMarkers 에 데이터 쌓기 : 이동 시 마커 삭제하기 위함  */
            setMarkers((prev: kakao.maps.Marker[]) => [...prev, ...markersArr]);
            setOverlayArr((prev) => [...prev, ...overlayArr]);
        },
        [map, setMarkers]
    );

    return { addMarker };
};
