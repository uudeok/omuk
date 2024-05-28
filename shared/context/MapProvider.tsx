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

type MarkerType = { position: { lat: string; lng: string }; content: string };

type MapType = {
    mapEl: RefObject<HTMLDivElement> | null;

    markers: IMarker[];
    setMarkers: Dispatch<SetStateAction<IMarker[]>>;

    // markers: kakao.maps.Marker | null;
    // setMarkers: Dispatch<SetStateAction<kakao.maps.Marker | null>>;

    // markers: MarkerType[] | null;
    // setMarkers: Dispatch<SetStateAction<MarkerType[] | null>>;
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
    // markers: null,
    // setMarkers: () => [],
    pagination: null,
    setPagination: () => null,
    map: undefined,
    setMap: () => [],
    resData: [],
    setResData: () => [],
});

const MapProvider = ({ children }: { children: ReactNode }) => {
    const mapEl = useRef<HTMLDivElement>(null);
    const { curLocation } = useGeoLocation();
    const [markers, setMarkers] = useState<IMarker[]>([]);
    // const [markers, setMarkers] = useState<kakao.maps.Marker | null>(null);
    const [pagination, setPagination] = useState<PaginationType | null>(null);
    const [map, setMap] = useState<kakao.maps.Map>();
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
