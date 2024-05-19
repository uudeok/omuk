'use client';

import styled from 'styled-components';
import Search from '../Search';
import ButtonController from '../ButtonController';
import { useBoolean } from '@/hooks/useBoolean';
import Card from '../Card';
import Slide from './Slide';
import Detail from '../Detail';

const SideBar = () => {
    const { value, setTrue, setFalse } = useBoolean();

    return (
        <Self>
            <Layout>
                <SearchBox>
                    <Search />
                    <ButtonController />
                </SearchBox>

                <Card setTrue={setTrue} />
            </Layout>

            {value && (
                <Slide setFalse={setFalse} styles={{ minWidth: '350px', right: '-99%' }}>
                    <Detail />
                </Slide>
            )}
        </Self>
    );
};

export default SideBar;

const Self = styled.div`
    display: flex;
    position: relative;
`;

const Layout = styled.div`
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    background-color: white;
    border: 1px solid lightgrey;
    width: 15%;
    min-width: 350px;
    overflow-y: auto;
    scrollbar-width: thin;
    z-index: 100;

    &::-webkit-scrollbar {
        width: 8px;
    }
`;

const SearchBox = styled.div`
    height: 200px;
    padding: 20px 10px;
    background-color: ${(props) => props.theme.colors.mainColor};
`;
