'use client';

import { useGeoLocation } from '@/hooks/useGeoLocation';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import { useEffect, useState, useRef, createContext, useContext, ReactNode, RefObject } from 'react';

type MapType = {
    mapEl: RefObject<HTMLDivElement> | null | any;
    mapData: any;
};

const MapContext = createContext<MapType>({
    mapEl: null,
    mapData: undefined,
});

const MapProvider = ({ children }: { children: ReactNode }) => {
    const mapEl = useRef<HTMLDivElement>(null);
    useKakaoLoader();
    const { curLocation } = useGeoLocation();
    const [mapData, setMapData] = useState<any>();

    useEffect(() => {
        const { kakao } = window;
        if (!curLocation || !mapEl.current || !kakao) return;

        const { latitude, longitude } = curLocation;

        kakao.maps.load(() => {
            const options = {
                center: new kakao.maps.LatLng(latitude, longitude),
                level: 3,
            };

            const map = new kakao.maps.Map(mapEl.current!, options);
            setMapData(map);
        });
    }, [mapEl, curLocation]);

    return (
        <MapContext.Provider
            value={{
                mapEl,
                mapData,
            }}
        >
            {children}
        </MapContext.Provider>
    );
};

export default MapProvider;
export const useMap = () => useContext(MapContext);
