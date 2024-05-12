'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';

// 메뉴바 있는 버전 레이아웃

const SideBar = () => {
    return (
        <Wrapper>
            <div>menubar 들어갈자리</div>
        </Wrapper>
    );
};

export default SideBar;

const Wrapper = styled.aside`
    display: flex;
    justify-content: space-between;
    border: 1px solid black;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 40%;
`;
