'use client';

import Slide from '@/components/Slide';
import { useRouter } from 'next/navigation';

export default function SlideLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const onClickButton = () => {
        router.push('/');
    };

    return (
        <Slide styles={{ width: '350px', left: '352px' }} onClickButton={onClickButton}>
            {children}
        </Slide>
    );
}
