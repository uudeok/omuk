'use client';

/** 초기 진입시
 *  위치 기반 주변 음식점 검색 기능
 */

import { useMap } from '@/shared/context/MapProvider';
import { useGeoLocation } from './useGeoLocation';
import { useCallback } from 'react';
import { useMarker } from './useMarker';

export const useCategory = () => {
    const { curLocation } = useGeoLocation();
    const { setResData, setPagination } = useMap();
    const { addMarker } = useMarker();

    const searchCategory = useCallback(() => {
        const { kakao } = window;
        if (!curLocation || !kakao) return;
        const ps = new kakao.maps.services.Places();

        const { latitude, longitude } = curLocation;

        ps.categorySearch(
            'FD6',
            (result, status, pagination) => {
                if (status === kakao.maps.services.Status.OK) {
                    addMarker(result);

                    setPagination(pagination);

                    setResData((prev) => [...prev, ...result]);
                }
            },
            {
                location: new kakao.maps.LatLng(latitude, longitude),
            }
        );
    }, [curLocation, setResData, setPagination, addMarker]);

    return { searchCategory };
};
