import { ReactNode } from 'react';
import Slide from '@/components/Slide';

const MypageLayout = ({ children }: { children: ReactNode }) => {
    return <Slide styles={{ width: '352px', left: '352px' }}>{children}</Slide>;
};

export default MypageLayout;
