'use client';

/** 검색어로 주변 음식점 검색 기능 */

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

            /** keyword 변경 시, 작업 초기화 */
            if (resData.length > 0) {
                setResData([]);
                setPagination(null);
                removeMarker();
            }

            ps.keywordSearch(
                keyword,
                (result, status, pagination: any) => {
                    if (status === kakao.maps.services.Status.OK) {
                        addMarker(result);

                        setPagination(pagination);

                        setResData((prev) => [...prev, ...result]);
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
