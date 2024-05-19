'use client';

import styled, { keyframes } from 'styled-components';
import { ReactNode } from 'react';
import Button from '../common/Button';

type AnimationSideProps = {
    children: ReactNode;
    setFalse: () => void;
    styles?: React.CSSProperties;
};

const Slide = ({ children, setFalse, styles }: AnimationSideProps) => {
    return (
        <Self style={{ ...styles }}>
            <main>{children}</main>
            <CloseButton>
                <Button size="lg" onClick={() => setFalse()}>
                    x
                </Button>
            </CloseButton>
        </Self>
    );
};

export default Slide;

const slideIn = keyframes`
    0% {
        transform: translateX(-50%);
    }
    100% {
        transform: translateX(0);
    }
`;

const Self = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    background-color: white;
    z-index: 99;
    animation: ${slideIn} 0.3s forwards;
`;

const CloseButton = styled.div`
    position: relative;
    right: -100%;
    width: 45px;
`;
