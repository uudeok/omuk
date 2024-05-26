import './global.css';
import type { Metadata } from 'next';
import Script from 'next/script';

import StyledComponent from '@/components/StyledComponent';
import ReactQueryProvider from '@/shared/context/ReactQueryProvider';
import SideBar from '@/components/layout/SideBar';
import Map from '@/components/layout/Map';
import MapProvider from '@/shared/context/MapProvider';

export const metadata: Metadata = {
    title: {
        template: '%s | omuk',
        default: 'omuk',
    },
    description: 'The best way to find a good restaurant',
};

declare global {
    interface Window {
        Kakao: any;
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <head>
                <Script
                    type="text/javascript"
                    src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer,drawing&autoload=false`}
                />
            </head>
            <body style={{ display: 'flex' }}>
                <ReactQueryProvider>
                    <StyledComponent>
                        <MapProvider>
                            <SideBar />
                            <Map />
                            {children}
                        </MapProvider>
                    </StyledComponent>
                </ReactQueryProvider>
            </body>
        </html>
    );
}

{
    /* <Script
type="text/javascript"
src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer,drawing&autoload=false`}
strategy="afterInteractive"

  strategy="beforeInteractive"
/> */
}
