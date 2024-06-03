'use client';

import { useCallback, useEffect, useState } from 'react';

type LocationType = {
    latitude: number;
    longitude: number;
};

export const useGeoLocation = () => {
    const [location, setLocation] = useState<LocationType>();
    const [errorMsg, setErrorMsg] = useState<string>('');

    const setDefaultLocation = () => {
        const defaultLatitude = 37.579293849225756;
        const defaultLongitude = 126.97798076343491;
        setLocation({
            latitude: defaultLatitude,
            longitude: defaultLongitude,
        });
    };

    const showError = useCallback((error: GeolocationPositionError) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.log('사용자가 위치 정보를 제공허는 것을 거부했습니다. ');
                setDefaultLocation();
                break;
            case error.POSITION_UNAVAILABLE:
                setErrorMsg('위치 정보를 사용할 수 없습니다.');
                break;
            case error.TIMEOUT:
                setErrorMsg('위치 정보를 가져오는 요청이 시간 초과되었습니다.');
                break;
            default:
                setErrorMsg('알 수 없는 오류가 발생했습니다.');
                break;
        }
    }, []);

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
            (err) => showError(err),
            { enableHighAccuracy: true, maximumAge: 0 }
        );
    }, [showError]);

    return {
        curLocation: location,

        errorMsg,
    };
};
