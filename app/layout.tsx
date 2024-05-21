import type { Metadata } from 'next';
import ClientComponentContainer from '@/components/ClientComponentContainer';
import ReactQueryProvider from '@/context/ReactQueryProvider';
import Maps from '@/components/Maps';
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
                    <ClientComponentContainer>
                        {children}
                        <SideBar />
                        <Maps />
                    </ClientComponentContainer>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
