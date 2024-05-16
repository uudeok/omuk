'use client';

import styled from 'styled-components';
import Search from '../Search';
import ButtonController from '../ButtonController';

const SideBar = () => {
    return (
        <Layout>
            <SearchBox>
                <Search />
                <ButtonController />
            </SearchBox>
        </Layout>
    );
};

export default SideBar;

const Layout = styled.nav`
    border: 1px solid lightgrey;
    width: 15%;
    min-width: 350px;
`;

const SearchBox = styled.div`
    height: 200px;
    padding: 20px 10px;
    background-color: ${(props) => props.theme.colors.mainColor};
`;
