'use client';

import {
    RefObject,
    Dispatch,
    SetStateAction,
    useMemo,
    useState,
    useRef,
    useContext,
    createContext,
    ReactNode,
} from 'react';
import { PaginationType, ResponseType, IMarker } from '../types';

type MapType = {
    mapEl: RefObject<HTMLDivElement> | null;
    markers: kakao.maps.Marker[];
    setMarkers: Dispatch<SetStateAction<kakao.maps.Marker[]>>;
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
    const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
    const [pagination, setPagination] = useState<PaginationType | null>(null);
    const [map, setMap] = useState<kakao.maps.Map>();
    const [resData, setResData] = useState<ResponseType[]>([]);

    const value = useMemo(
        () => ({
            mapEl,
            markers,
            setMarkers,
            pagination,
            setPagination,
            map,
            setMap,
            resData,
            setResData,
        }),
        [markers, pagination, map, resData]
    );

    return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export default MapProvider;
export const useMap = (): MapType => useContext(MapContext);
