'use client';

import { useCallback, useEffect, useState } from 'react';

type LocationType = {
    latitude: number;
    longitude: number;
};

export const useGeoLocation = () => {
    const [location, setLocation] = useState<LocationType>();
    const [errorMsg, setErrorMsg] = useState<string>('');

    // 위치 정보 제공 거부 시, 디폴트 위치 제공 : 광화문
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
            { enableHighAccuracy: false, maximumAge: Infinity, timeout: 10000 }
        );
    }, [showError]);

    return {
        curLocation: location,
        errorMsg,
    };
};

// enableHighAccuracy : 위치 정보를 보다 정확하게 가져올지 정할 수 있다. true > false  위치정보의 정확도는 떨어지지만 속도가 빠르다.
// maximumAge : 캐시된 위치 정보를 사용할 수 있는 시간.
// timeout : 위치 정보를 가져오는데 허용되는 최대 시간.
