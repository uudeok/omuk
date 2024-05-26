'use client';

import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useRef, useState } from 'react';
import { useSearchStore } from '@/store/searchStore';
import useMapDataStore from '@/store/mapDataStore';
import { useKakaoLoader, useGeoLocation } from '@/hooks';

/** 24.05.15
 * Next.js 14 인포윈도우가 안보이는 이슈
 * 오픈소스 이슈에도 제기
 */

const Maps = () => {
    useKakaoLoader();
    const { keyword } = useSearchStore();
    const { setDatas } = useMapDataStore();
    const [info, setInfo] = useState<any>();
    const [markers, setMarkers] = useState<any>([]);
    const [map, setMap] = useState<any>();
    const { curLocation } = useGeoLocation();

    const [page, setPage] = useState<number>(1);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClickMarker = (e: any, marker: any) => {
        setInfo(marker);
        map.panTo(e.getPosition());
    };

    /** 검색 전에는 위치기반 지도 띄우기 */
    const searchPlace = keyword ? keyword : '야당역';

    useEffect(() => {
        if (!map) return;
        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(
            searchPlace,
            (data, status, pagintaion) => {
                console.log('data', data);
                console.log('pagintaion', pagintaion);

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

                    // data 전역 상태 관리를 위해 store 저장
                    setDatas(data);

                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정
                    map.setBounds(bounds);
                }
            },
            {
                // 카테고리로 검색 : 음식점
                category_group_code: 'FD6',
            }
        );
    }, [map, searchPlace, setDatas, curLocation]);

    return (
        <Map
            center={{
                lat: 37.566826,
                lng: 126.9786567,
            }}
            style={{
                width: '100%',
                height: '100%',
            }}
            level={5}
            onCreate={setMap}
        >
            {markers.map((marker: any) => (
                <MapMarker
                    key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                    position={marker.position}
                    onClick={(e) => handleClickMarker(e, marker)}
                ></MapMarker>
            ))}
        </Map>
    );
};

export default Maps;
