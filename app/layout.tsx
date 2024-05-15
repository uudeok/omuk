import ClientComponentContainer from '@/components/ClientComponentContainer';
import SideBar from '@/components/layout/SideBar';
import ReactQueryProvider from '@/context/ReactQueryProvider';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    title: {
        template: '%s | omuk',
        default: 'omuk',
    },
    description: 'The best way to find a good restaurant',
};

// declare global {
//     interface Window {
//         Kakao: any;
//     }
// }

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body style={{ display: 'flex' }}>
                <ReactQueryProvider>
                    <ClientComponentContainer>
                        <SideBar />
                        {/* <Script
                            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`}
                            strategy="beforeInteractive"
                        /> */}
                        {children}
                    </ClientComponentContainer>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
