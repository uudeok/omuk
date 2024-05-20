'use client';

import Button from './common/Button';
import { useBoolean } from '@/hooks/useBoolean';
import { useState } from 'react';
import styles from '../styles/ButtonController.module.css';

const ButtonController = () => {
    const { value, setValue, setTrue, setFalse, toggle } = useBoolean();
    const [isVisited, setIsVisited] = useState(true);

    const handleVisitToggle = () => {
        setIsVisited((prev) => !prev);
    };

    return (
        <>
            <div className={styles.controller}>
                <Button size="lg" role="round" onClick={() => setTrue()}>
                    맛집
                </Button>
                <Button size="lg" role="round" onClick={() => setFalse()}>
                    MY
                </Button>
            </div>
            {value ? (
                <div className={styles.observer}>
                    <Button size="sm" role="round">
                        전체보기
                    </Button>
                    <Button size="sm" role="round" onClick={handleVisitToggle}>
                        {isVisited ? '가봤어용😋' : '안가봤어요😙'}
                    </Button>
                    <Button size="sm" role="round">
                        즐겨찾기⭐️
                    </Button>
                </div>
            ) : (
                <div className={styles.observer}>
                    <Button size="sm" role="round">
                        타임라인🕒
                    </Button>
                    <Button size="sm" role="round">
                        리뷰👀
                    </Button>
                </div>
            )}
        </>
    );
};

export default ButtonController;
