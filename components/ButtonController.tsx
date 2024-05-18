'use client';

import Button from './common/Button';
import styled from 'styled-components';
import { useBoolean } from '@/hooks/useBoolean';
import { useState } from 'react';

const ButtonController = () => {
    const { value, setValue, setTrue, setFalse, toggle } = useBoolean();
    const [isVisited, setIsVisited] = useState(true);

    const handleVisitToggle = () => {
        setIsVisited((prev) => !prev);
    };

    return (
        <>
            <ControllerBox>
                <Button size="lg" role="round" onClick={() => setTrue()}>
                    맛집
                </Button>
                <Button size="lg" role="round" onClick={() => setFalse()}>
                    MY
                </Button>
            </ControllerBox>
            {value ? (
                <ObserverBox>
                    <Button size="sm" role="round">
                        전체보기
                    </Button>
                    <Button size="sm" role="round" onClick={handleVisitToggle}>
                        {isVisited ? '가봤어용😋' : '안가봤어요😙'}
                    </Button>
                    <Button size="sm" role="round">
                        즐겨찾기⭐️
                    </Button>
                </ObserverBox>
            ) : (
                <ObserverBox>
                    <Button size="sm" role="round">
                        타임라인🕒
                    </Button>
                    <Button size="sm" role="round">
                        리뷰👀
                    </Button>
                </ObserverBox>
            )}
        </>
    );
};

export default ButtonController;

const ControllerBox = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 30px;
`;

const ObserverBox = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 30px;
`;
