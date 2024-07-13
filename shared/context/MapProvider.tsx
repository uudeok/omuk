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
    isLoading: boolean;
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
    isLoading: false,
});

const MapProvider = ({ children }: { children: ReactNode }) => {
    const mapEl = useRef<HTMLDivElement>(null);
    const { curLocation } = useGeoLocation();
    const [markers, setMarkers] = useState<IMarker[]>([]);
    const [pagination, setPagination] = useState<PaginationType | null>(null);
    const [map, setMap] = useState<kakao.maps.Map>();
    const [resData, setResData] = useState<ResponseType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const { kakao } = window;
        if (!kakao) return;
        setIsLoading(true);

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
            setIsLoading(false);
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
                isLoading,
            }}
        >
            {children}
        </MapContext.Provider>
    );
};

export default MapProvider;
export const useMap = (): MapType => useContext(MapContext);
