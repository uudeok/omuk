'use client';

import { useEffect, useState } from 'react';

type LocationType = {
    latitude: number;
    longitude: number;
};

export const useGeoLocation = () => {
    const [location, setLocation] = useState<LocationType>();

    useEffect(() => {
        const { geolocation } = navigator;

        if (!geolocation) return;

        geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({
                    latitude,
                    longitude,
                });
            },
            (err) => console.error(err),
            { enableHighAccuracy: true }
        );
    }, []);

    return {
        curLocation: location,
    };
};
