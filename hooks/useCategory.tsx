'use client';

import { useMap } from '@/shared/context/MapProvider';
import { useGeoLocation } from './useGeoLocation';
import { useCallback } from 'react';

export const useCategory = () => {
    const { curLocation } = useGeoLocation();
    const { setPagination, resData } = useMap();

    const searchCategory = useCallback(() => {
        const { kakao } = window;
        if (!curLocation || !kakao) return;
        const ps = new kakao.maps.services.Places();

        const { latitude, longitude } = curLocation;

        ps.categorySearch(
            'FD6',
            (result, status, pagination) => {
                if (status === kakao.maps.services.Status.OK) {
                    // console.log('useCategory', result);
                    // console.log(pagination);
                    setPagination(pagination);

                    console.log('=================start==========================');

                    // resData.current = result;
                    resData.current = [...resData.current, ...result];
                }
            },
            {
                location: new kakao.maps.LatLng(latitude, longitude),
            }
        );
    }, [curLocation, setPagination, resData]);

    return { searchCategory };
};
