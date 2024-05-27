'use client';

import {
    RefObject,
    Dispatch,
    SetStateAction,
    useState,
    useRef,
    useEffect,
    useContext,
    createContext,
    ReactNode,
} from 'react';
import { useGeoLocation } from '@/hooks';
import { PaginationType, ResponseType } from '../types';

type MarkerType = { position: { lat: string; lng: string }; content: string };

type MapType = {
    mapEl: RefObject<HTMLDivElement> | null;
    markers: MarkerType[];
    setMarkers: Dispatch<SetStateAction<MarkerType[]>>;
    pagination: PaginationType | undefined;
    setPagination: Dispatch<SetStateAction<PaginationType | undefined>>;
    map: kakao.maps.Map | undefined;
    setMap: Dispatch<SetStateAction<kakao.maps.Map | undefined>>;
    resData: ResponseType[];
    setResData: Dispatch<SetStateAction<ResponseType[]>>;
    // resData: { current: ResponseType[] };
};

const MapContext = createContext<MapType>({
    mapEl: null,
    markers: [],
    setMarkers: () => [],
    pagination: undefined,
    setPagination: () => null,
    map: undefined,
    setMap: () => [],
    // resData: { current: [] },
    resData: [], // 변경된 부분
    setResData: () => [], // 추가된 부분
});

const MapProvider = ({ children }: { children: ReactNode }) => {
    const mapEl = useRef<HTMLDivElement>(null);
    const { curLocation } = useGeoLocation();
    const [markers, setMarkers] = useState<MarkerType[]>([]);
    const [pagination, setPagination] = useState<PaginationType>();
    const [map, setMap] = useState<kakao.maps.Map>();
    // const resData = useRef<ResponseType[]>([]);
    const [resData, setResData] = useState<ResponseType[]>([]);

    useEffect(() => {
        const { kakao } = window;
        if (!kakao) return;

        kakao.maps.load(() => {
            if (!mapEl.current || !curLocation) return;
            const { latitude, longitude } = curLocation;

            const center = new kakao.maps.LatLng(latitude, longitude);
            const options = {
                center,
                level: 3,
            };
            const map = new kakao.maps.Map(mapEl.current!, options);
            setMap(map);
        });
    }, [curLocation]);

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
export const useMap = () => useContext(MapContext);
