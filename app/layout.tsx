import './global.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import StyledProvider from '@/shared/context/StyledProvider';
import MapProvider from '@/shared/context/MapProvider';
import ReactQueryProvider from '@/shared/context/ReactQueryProvider';
import SideBar from '@/components/layout/SideBar';
import Map from '@/components/layout/Map';

export const metadata: Metadata = {
    title: {
        template: '%s | omuk',
        default: 'omuk',
    },
    description: 'The best way to find a good restaurant',
};

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
                <link rel="shortcut icon" href="#" />
            </head>
            <body style={{ display: 'flex' }}>
                <ReactQueryProvider>
                    <StyledProvider>
                        <MapProvider>
                            <SideBar />
                            <Map />
                            {children}
                        </MapProvider>
                    </StyledProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
