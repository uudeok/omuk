'use client';

import module from '../../styles/slide.module.css';
import { ReactNode } from 'react';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';

type SlideProps = {
    children: ReactNode;
    styles?: React.CSSProperties;
};

const Slide = ({ children, styles }: SlideProps) => {
    const router = useRouter();

    const onCloseButton = () => {
        router.push('/');
    };

    return (
        <div className={module.container} style={{ ...styles }}>
            <div className={module.closeButton}>
                <Button size="lg" onClick={() => onCloseButton()}>
                    x
                </Button>
            </div>
            <main className={module.content}>{children}</main>
        </div>
    );
};

export default Slide;
