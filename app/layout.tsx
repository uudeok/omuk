import type { Metadata } from 'next';
import StyledComponent from '@/components/StyledComponent';
import ReactQueryProvider from '@/shared/context/ReactQueryProvider';
import Maps from '@/components/layout/Maps';
import SideBar from '@/components/layout/SideBar';
import './global.css';

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
            <body style={{ display: 'flex' }}>
                <ReactQueryProvider>
                    <StyledComponent>
                        {children}
                        <SideBar />
                        <Maps />
                    </StyledComponent>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
