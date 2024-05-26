import { useCallback } from 'react';

export const useKakao = () => {
    const kakaoLoader = useCallback(() => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer,drawing&autoload=false`;
        document.head.appendChild(script);
        return script;
    }, []);

    return { kakaoLoader };
};
