'use client';

import styled from 'styled-components';
import Search from '../Search';
import ButtonController from '../ButtonController';
import useMapDataStore from '@/store/mapDataStore';
import List, { ListRow, ListBox } from '../common/List';
import Text from '../common/Text';
import Button from '../common/Button';

const SideBar = () => {
    const { data } = useMapDataStore();

    console.log('Data : ', data);
    return (
        <Layout>
            <SearchBox>
                <Search />
                <ButtonController />
            </SearchBox>

            <List>
                {data.map((item) => (
                    <ListBox
                        key={item.id}
                        top={
                            <Title>
                                <Text typography="t5">{item.place_name}</Text>
                                <Text typography="st3">{item.road_address_name}</Text>
                            </Title>
                        }
                        bottom={
                            <div>
                                <Text typography="st3">{item.phone}</Text>
                            </div>
                        }
                    />
                ))}
            </List>
        </Layout>
    );
};

export default SideBar;

const Layout = styled.nav`
    border: 1px solid lightgrey;
    width: 15%;
    min-width: 350px;
    overflow-y: auto;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
        width: 8px; /* 스크롤바 너비 */
    }
`;

const SearchBox = styled.div`
    height: 200px;
    padding: 20px 10px;
    background-color: ${(props) => props.theme.colors.mainColor};
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 1.5;
`;
