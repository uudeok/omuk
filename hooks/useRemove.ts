import { useMap } from '@/shared/context/MapProvider';
import { useCallback } from 'react';

export const useRemove = () => {
    const { setMarkers, markers } = useMap();

    const removeMarker = useCallback(() => {
        console.log('markers', markers);
        markers?.forEach((marker) => marker.setMap(null));
        setMarkers([]);
    }, [markers, setMarkers]);

    return { removeMarker };
};
