'use client';

import { useMap } from '@/shared/context/MapProvider';
import { useGeoLocation } from './useGeoLocation';
import { useCallback } from 'react';

export const useCategory = () => {
    const { curLocation } = useGeoLocation();
    const { setResData, setPagination } = useMap();

    const searchCategory = useCallback(() => {
        const { kakao } = window;
        if (!curLocation || !kakao) return;
        const ps = new kakao.maps.services.Places();

        const { latitude, longitude } = curLocation;

        ps.categorySearch(
            'FD6',
            (result, status, pagination) => {
                if (status === kakao.maps.services.Status.OK) {
                    setPagination(pagination);
                    setResData((prev) => [...prev, ...result]);
                }
            },
            {
                location: new kakao.maps.LatLng(latitude, longitude),
            }
        );
    }, [curLocation, setResData, setPagination]);

    return { searchCategory };
};
