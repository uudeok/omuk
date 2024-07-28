import { useMap } from '@/shared/context/MapProvider';
import { useCallback } from 'react';

export const useRemove = () => {
    const { setMarkers, markers } = useMap();

    // const removeMarker = () => {
    //     console.log('useRemove 22222');
    //     markers?.forEach((marker) => marker.setMap(null));
    //     setMarkers([]);
    // };

    const removeMarker = useCallback(() => {
        markers?.forEach((marker) => marker.setMap(null));
        setMarkers([]);
    }, [markers, setMarkers]);

    return { removeMarker };
};
