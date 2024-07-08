'use client';

import './global.css';
import Script from 'next/script';
import StyledProvider from '@/shared/context/StyledProvider';
import MapProvider from '@/shared/context/MapProvider';
import ReactQueryProvider from '@/shared/context/ReactQueryProvider';
import AuthProvider from '@/shared/context/AuthProvider';
import SideBar from '@/components/layout/SideBar';
import Map from '@/components/layout/Map';
import { useEffect, useState } from 'react';
import MobilePage from '@/components/mobile/MobilePage';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
        const mobileDevice = /Mobi|Android/i.test(userAgent);

        if (mobileDevice) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, []);

    if (isMobile) {
        return (
            <html lang="ko">
                <head>
                    <title>omuk</title>
                    <meta name="description" content="오늘 뭐먹지? 고민될 떈" />
                    <Script
                        type="text/javascript"
                        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer,drawing&autoload=false`}
                    />
                    <link rel="shortcut icon" href="/" />
                </head>
                <body>
                    <ReactQueryProvider>
                        <StyledProvider>
                            <AuthProvider>
                                <MapProvider>
                                    <MobilePage>{children}</MobilePage>
                                    <div style={{ display: 'none' }}>
                                        <Map />
                                    </div>
                                    <div id="modal-root"></div>
                                </MapProvider>
                            </AuthProvider>
                        </StyledProvider>
                    </ReactQueryProvider>
                </body>
            </html>
        );
    }

    return (
        <html lang="ko">
            <head>
                <title>omuk</title>
                <meta name="description" content="오늘 뭐먹지? 고민될 떈" />
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

// 원본 보존

// import './global.css';
// import type { Metadata } from 'next';
// import Script from 'next/script';
// import StyledProvider from '@/shared/context/StyledProvider';
// import MapProvider from '@/shared/context/MapProvider';
// import ReactQueryProvider from '@/shared/context/ReactQueryProvider';
// import AuthProvider from '@/shared/context/AuthProvider';
// import SideBar from '@/components/layout/SideBar';
// import Map from '@/components/layout/Map';
// import Providers from '@/shared/context/QueryProvider';

// export const metadata: Metadata = {
//     title: {
//         template: '%s | omuk',
//         default: 'omuk',
//     },
//     description: 'The best way to find a good restaurant',
// };

// export default function RootLayout({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     return (
//         <html lang="ko">
//             <head>
//                 <Script
//                     type="text/javascript"
//                     src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer,drawing&autoload=false`}
//                 />
//                 <link rel="shortcut icon" href="/" />
//             </head>
//             <body style={{ display: 'flex' }}>
//                 <ReactQueryProvider>
//                     <StyledProvider>
//                         {/* <AuthProvider> */}
//                         <MapProvider>
//                             <SideBar />
//                             <Map />
//                             {children}
//                         </MapProvider>
//                         {/* </AuthProvider> */}
//                     </StyledProvider>
//                 </ReactQueryProvider>
//             </body>
//         </html>
//     );
// }
