'use client';

import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useSearchStore } from '@/store/SearchResult';

const Maps = () => {
    useKakaoLoader();
    const { keyword } = useSearchStore();
    const [info, setInfo] = useState<any>();
    const [markers, setMarkers] = useState<any>([]);
    const [map, setMap] = useState<any>();

    const handleClickMarker = (e: any) => {
        console.log('asdadadasd');
        console.log(e);
        // map.panTo(e.getPosition());
    };

    console.log('입력한 값 : ', keyword);

    /** 검색 전에는 위치기반 지도 띄우기 */
    const searchPlace = keyword ? keyword : '야당역 맛집';

    useEffect(() => {
        if (!map) return;
        const ps = new kakao.maps.services.Places();
        // const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

        ps.keywordSearch(
            searchPlace,
            (data, status, pagintaion) => {
                console.log('data', data);
                console.log('status', status);
                console.log('pagintaion', pagintaion);

                if (status === kakao.maps.services.Status.OK) {
                    const bounds = new kakao.maps.LatLngBounds();
                    setInfo(data);

                    let markers = [];

                    for (var i = 0; i < data.length; i++) {
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

                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                    map.setBounds(bounds);
                }
            },
            {
                useMapBounds: true,
                category_group_code: 'FD6',
            }
        );
    }, [map, searchPlace]);

    // console.log('info', info);
    // markers.map((marker: any) => console.log(marker.content));

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
                    onClick={(e) => handleClickMarker(e)}
                ></MapMarker>
            ))}
        </Map>
    );
};

export default Maps;
