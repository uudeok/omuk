'use client';

// import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/hooks/useKakaoLoader';

const TestPage = () => {
    useKakaoLoader();

    return (
        <Map
            id="map"
            center={{
                lat: 33.450701,
                lng: 126.570667,
            }}
            style={{
                width: '100%',
                height: '100%',
                border: '1px solid black',
            }}
            level={3}
        />
    );
};

export default TestPage;
