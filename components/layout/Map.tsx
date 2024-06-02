'use client';

import { useMap } from '@/shared/context/MapProvider';

const Map = () => {
    const { mapEl, isLoading } = useMap();

    return (
        <>
            {isLoading && <span>Loading...</span>}
            <div ref={mapEl} style={{ width: '100%', height: '100%' }}></div>
        </>
    );
};

export default Map;
