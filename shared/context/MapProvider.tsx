'use client';

import { RefObject, Dispatch, SetStateAction, useState, useRef, useContext, createContext, ReactNode } from 'react';
import { PaginationType, ResponseType, IMarker } from '../types';

type MapType = {
    mapEl: RefObject<HTMLDivElement> | null;
    markers: IMarker[];
    setMarkers: Dispatch<SetStateAction<IMarker[]>>;
    pagination: PaginationType | null;
    setPagination: Dispatch<SetStateAction<PaginationType | null>>;
    map: kakao.maps.Map | undefined;
    setMap: Dispatch<SetStateAction<kakao.maps.Map | undefined>>;
    resData: ResponseType[];
    setResData: Dispatch<SetStateAction<ResponseType[]>>;
};

const MapContext = createContext<MapType>({
    mapEl: null,
    markers: [],
    setMarkers: () => [],
    pagination: null,
    setPagination: () => null,
    map: undefined,
    setMap: () => [],
    resData: [],
    setResData: () => [],
});

const MapProvider = ({ children }: { children: ReactNode }) => {
    const mapEl = useRef<HTMLDivElement>(null);
    const [markers, setMarkers] = useState<IMarker[]>([]);
    const [pagination, setPagination] = useState<PaginationType | null>(null);
    const [map, setMap] = useState<kakao.maps.Map>();
    const [resData, setResData] = useState<ResponseType[]>([]);

    return (
        <MapContext.Provider
            value={{
                mapEl,
                setMarkers,
                markers,
                pagination,
                setPagination,
                setMap,
                map,
                resData,
                setResData,
            }}
        >
            {children}
        </MapContext.Provider>
    );
};

export default MapProvider;
export const useMap = (): MapType => useContext(MapContext);
