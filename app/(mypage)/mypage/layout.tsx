import { ReactNode } from 'react';
import Slide from '@/components/Slide';

const MypageLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Slide styles={{ width: '352px', left: '352px' }}>
            <main>{children}</main>
        </Slide>
    );
};

export default MypageLayout;
