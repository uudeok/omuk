import { useMap } from '@/shared/context/MapProvider';

export const useRemove = () => {
    const { setMarkers, markers } = useMap();

    const removeMarker = () => {
        markers?.forEach((marker) => marker.setMap(null));
        setMarkers([]);
    };

    return { removeMarker };
};
