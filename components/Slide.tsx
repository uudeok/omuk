'use client';

import { ReactNode } from 'react';
import Button from './common/Button';
import module from '../styles/Slide.module.css';

type SlideProps = {
    children: ReactNode;
    styles?: React.CSSProperties;
    onClickButton?: () => void;
};

const Slide = ({ children, styles, onClickButton }: SlideProps) => {
    return (
        <div className={module.container} style={{ ...styles }}>
            <div className={module.closeButton}>
                <Button size="lg" onClick={() => onClickButton && onClickButton()}>
                    x
                </Button>
            </div>
            <main className={module.content}>{children}</main>
        </div>
    );
};

export default Slide;
