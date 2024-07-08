'use client';

import { useEffect, useState } from 'react';

const useDeviceType = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
        const mobileDevice = /Mobi|Android/i.test(userAgent);
        setIsMobile(mobileDevice);
    }, []);

    return isMobile;
};

export default useDeviceType;
