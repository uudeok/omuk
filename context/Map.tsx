/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { createContext, useContext, useEffect, useRef, useState, Dispatch, SetStateAction, RefObject } from 'react';

import { useGeoLocation } from '@/hooks/useGeoLocation';
import { DataResponse, MarkerType, PaginationType } from '@/types';

type MapType = {
    mapEl: RefObject<HTMLDivElement> | null;
    mapData: { [key: string]: any } | undefined;
    RestaurantData: { current: DataResponse[] };
    markers: MarkerType[];
    setMarkers: Dispatch<SetStateAction<MarkerType[]>>;
    pagination: PaginationType | undefined;
    setPagination: Dispatch<SetStateAction<PaginationType | undefined>>;
};

interface IMapProvider {
    children: JSX.Element | JSX.Element[];
}

const MapContext = createContext<MapType>({
    mapEl: null,
    mapData: undefined,

    RestaurantData: { current: [] },
    markers: [],
    setMarkers: () => [],
    pagination: undefined,
    setPagination: () => null,
});

const MapProvider = ({ children }: IMapProvider) => {
    const mapEl = useRef<HTMLDivElement>(null);
    const RestaurantData = useRef<DataResponse[]>([]);
    const { curLocation } = useGeoLocation();

    const [mapData, setMapData] = useState<{ [key: string]: any } | undefined>();
    const [markers, setMarkers] = useState<MarkerType[]>([]);
    const [pagination, setPagination] = useState<PaginationType>();

    useEffect(() => {
        const { kakao } = window;
        if (!mapEl.current || !kakao || !curLocation) return;
        const { latitude, longitude } = curLocation;

        kakao.maps.load(() => {
            const options = {
                center: new kakao.maps.LatLng(latitude, longitude),
                level: 5,
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
                RestaurantData,
                markers,
                setMarkers,
                pagination,
                setPagination,
            }}
        >
            {children}
        </MapContext.Provider>
    );
};

export default MapProvider;
export const useMap = () => useContext(MapContext);
