'use client';

import { useMap } from '@/shared/context/MapProvider';

const Map = () => {
    const { mapEl } = useMap();

    return <div ref={mapEl} style={{ width: '100%', height: '100%' }}></div>;
};

export default Map;