'use client';

import styled from 'styled-components';
import Search from '../Search';
import Button from '../common/Button';

// 메뉴바 있는 버전 레이아웃

const SideBar = () => {
    return (
        <Layout>
            <SearchBox>
                <Search />
                <ButtonBox>
                    <Button size="lg" role="round">
                        맛집
                    </Button>
                    <Button size="lg" role="round">
                        MY
                    </Button>
                </ButtonBox>
            </SearchBox>
        </Layout>
    );
};

export default SideBar;

const Layout = styled.nav`
    border: 1px solid black;
    width: 15%;
    min-width: 350px;
`;

const SearchBox = styled.div`
    height: 200px;
    padding: 20px 10px;
    background-color: ${(props) => props.theme.colors.mainColor};
`;

const ButtonBox = styled.div`
    display: flex;
    gap: 20px;

    margin-top: 30px;
`;
