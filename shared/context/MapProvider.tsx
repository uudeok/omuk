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
    MutableRefObject,
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
    resData: { current: ResponseType[] };
};

const MapContext = createContext<MapType>({
    mapEl: null,
    markers: [],
    setMarkers: () => [],
    pagination: undefined,
    setPagination: () => null,
    map: undefined,
    setMap: () => [],
    resData: { current: [] },
});

const MapProvider = ({ children }: { children: ReactNode }) => {
    const mapEl = useRef<HTMLDivElement>(null);
    const { curLocation } = useGeoLocation();
    const [restaurantData, setRestaurantData] = useState<ResponseType[]>();
    const [markers, setMarkers] = useState<MarkerType[]>([]);
    const [pagination, setPagination] = useState<PaginationType>();
    const [map, setMap] = useState<kakao.maps.Map>();
    const resData = useRef<ResponseType[]>([]);

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

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.async = false;
    //     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer,drawing&autoload=false`;
    //     document.head.appendChild(script);

    //     script.onload = () => {
    //         kakao.maps.load(() => {
    //             if (!mapEl.current || !curLocation) return;
    //             const { latitude, longitude } = curLocation;

    //             const center = new kakao.maps.LatLng(latitude, longitude);
    //             const options = {
    //                 center,
    //                 level: 3,
    //             };
    //             const map = new kakao.maps.Map(mapEl.current!, options);
    //             setTest(map);
    //         });
    //     };
    // }, [curLocation]);

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.async = false;
    //     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer,drawing&autoload=false`;
    //     document.head.appendChild(script);

    //     const onLoadKakapApi = () => {
    //         window.kakao.maps.load(() => {
    //             if (!mapEl.current || !curLocation) return;
    //             const { latitude, longitude } = curLocation;

    //             const center = new kakao.maps.LatLng(latitude, longitude);
    //             const options = {
    //                 center,
    //                 level: 3,
    //             };
    //             const map = new kakao.maps.Map(mapEl.current!, options);
    //             setTest(map);
    //         });
    //     };

    //     script.addEventListener('load', onLoadKakapApi);
    // }, [curLocation]);

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
            }}
        >
            {children}
        </MapContext.Provider>
    );
};

export default MapProvider;
export const useMap = () => useContext(MapContext);
