import ClientComponentContainer from '@/components/ClientComponentContainer';
import Providers from '@/context/Provider';
import type { Metadata } from 'next';

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
            <body>
                <Providers>
                    <ClientComponentContainer>{children}</ClientComponentContainer>
                </Providers>
            </body>
        </html>
    );
}
