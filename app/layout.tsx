import './global.css';
import Script from 'next/script';
import MapProvider from '@/shared/context/MapProvider';
import ReactQueryProvider from '@/shared/context/ReactQueryProvider';
import AuthProvider from '@/shared/context/AuthProvider';
import SideBar from '@/components/layout/SideBar';
import Map from '@/components/layout/Map';
import { getMetadata } from '@/shared/utils';

export const generateMetadata = () => {
    return getMetadata();
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ko">
            <head>
                <Script
                    type="text/javascript"
                    src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`}
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="shortcut icon" href="/icon.png" />
            </head>
            <body style={{ display: 'flex' }}>
                <ReactQueryProvider>
                    <AuthProvider>
                        <MapProvider>
                            <SideBar />
                            <Map />
                            {children}
                            <div id="modal-root"></div>
                        </MapProvider>
                    </AuthProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
