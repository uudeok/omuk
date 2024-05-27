import { useMap } from '@/shared/context/MapProvider';
import { useCallback } from 'react';

export const useKeyword = () => {
    const { map, setMarkers, setPagination, resData } = useMap();

    const searchKeyword = useCallback(
        (keyword: string) => {
            const { kakao } = window;
            if (!map || !kakao) return;

            const ps = new kakao.maps.services.Places();

            if (resData.current.length > 0) {
                resData.current = [];
            }

            ps.keywordSearch(
                keyword,
                (data, status, pagination: any) => {
                    if (status === kakao.maps.services.Status.OK) {
                        const bounds = new kakao.maps.LatLngBounds();

                        let markers = [];

                        for (let i = 0; i < data.length; i++) {
                            // @ts-ignore
                            markers.push({
                                position: {
                                    lat: data[i].y,
                                    lng: data[i].x,
                                },
                                content: data[i].place_name,
                            });

                            // @ts-ignore
                            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                        }

                        setMarkers(markers);

                        setPagination(pagination);

                        resData.current = [...resData.current, ...data];

                        map.setBounds(bounds);
                    }
                },
                {
                    category_group_code: 'FD6',
                    useMapBounds: true,
                }
            );
        },
        [setPagination, resData, setMarkers, map]
    );

    return { searchKeyword };
};
