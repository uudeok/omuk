'use client';

import { ReactNode } from 'react';
import Button from './common/Button';
import module from '../styles/Slide.module.css';
import { useRouter } from 'next/navigation';

type SlideProps = {
    children: ReactNode;
    styles?: React.CSSProperties;
    // onClickButton?: () => void;
};

const Slide = ({ children, styles }: SlideProps) => {
    const router = useRouter();

    /** onCloseButton
     *  props 로 받을 시, 재사용이 가능하다는 장점이 있다.
     *  그러나 SlideLayout 에서 API 요청을 위해 (서버에서만 호출 가능)
     *  여기서 마우스 이벤트 핸들러 등록으로 변경
     */

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
