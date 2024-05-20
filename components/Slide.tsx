'use client';

import { ReactNode } from 'react';
import Button from './common/Button';
import module from '../styles/Slide.module.css';

type AnimationSideProps = {
    children: ReactNode;
    setFalse: () => void;
    styles?: React.CSSProperties;
};

const Slide = ({ children, setFalse, styles }: AnimationSideProps) => {
    return (
        <div className={module.container} style={{ ...styles }}>
            <main>{children}</main>
            <div className={module.closeButton}>
                <Button size="lg" onClick={() => setFalse()}>
                    x
                </Button>
            </div>
        </div>
    );
};

export default Slide;
