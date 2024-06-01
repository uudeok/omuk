import { ReactNode } from 'react';
import Slide from '@/components/Slide';

const LoginLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Slide styles={{ width: '352px', left: '352px', backgroundColor: '#f9fafb' }}>
            <main>{children}</main>
        </Slide>
    );
};

export default LoginLayout;
