import { useMap } from '@/shared/context/MapProvider';
import { useCallback } from 'react';

export function useKeyword() {
    const { setRestaurantData, map, setMarkers, setPagination, pagination } = useMap();

    const searchKeyword = useCallback(
        (keyword: string) => {
            const { kakao } = window;
            if (!map || !kakao) return;

            const ps = new kakao.maps.services.Places();

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
                        console.log('data', data);

                        setMarkers(markers);

                        setPagination(pagination);

                        setRestaurantData(data);

                        map.setBounds(bounds);
                    }
                },
                {
                    category_group_code: 'FD6',
                    useMapBounds: true,
                }
            );
        },
        [setPagination, setRestaurantData, setMarkers, map]
    );

    return { searchKeyword };
}
