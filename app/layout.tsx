import './global.css';
import Script from 'next/script';
import StyledProvider from '@/shared/context/StyledProvider';
import MapProvider from '@/shared/context/MapProvider';
import ReactQueryProvider from '@/shared/context/ReactQueryProvider';
import AuthProvider from '@/shared/context/AuthProvider';
import SideBar from '@/components/layout/SideBar';
import Map from '@/components/layout/Map';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        template: '%s | omuk',
        default: 'omuk',
    },
    description: '매일 다른 음식과 사람들을 기록하는 일상',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ko">
            <head>
                <Script
                    type="text/javascript"
                    src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer,drawing&autoload=false`}
                />
                <link rel="shortcut icon" href="/" />
            </head>
            <body style={{ display: 'flex' }}>
                <ReactQueryProvider>
                    <StyledProvider>
                        <AuthProvider>
                            <MapProvider>
                                <SideBar />
                                <Map />
                                {children}
                                <div id="modal-root"></div>
                            </MapProvider>
                        </AuthProvider>
                    </StyledProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
