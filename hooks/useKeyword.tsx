'use client';

import { useMap } from '@/shared/context/MapProvider';
import { useCallback } from 'react';
import { useMarker } from './useMarker';
import { useRemove } from './useRemove';

export const useKeyword = () => {
    const { map, setPagination, resData, setResData } = useMap();
    const { addMarker } = useMarker();
    const { removeMarker } = useRemove();

    const searchKeyword = useCallback(
        (keyword: string) => {
            const { kakao } = window;
            if (!map || !kakao) return;

            const ps = new kakao.maps.services.Places();

            if (resData.length > 0) {
                setResData([]);
                setPagination(null);
                removeMarker();
            }

            ps.keywordSearch(
                keyword,
                (data, status, pagination: any) => {
                    if (status === kakao.maps.services.Status.OK) {
                        addMarker(data);

                        setPagination(pagination);

                        setResData((prev) => [...prev, ...data]);
                    }
                },
                {
                    category_group_code: 'FD6',
                    useMapBounds: true,
                }
            );
        },
        [setPagination, setResData, resData, addMarker, map, removeMarker]
    );

    return { searchKeyword };
};
