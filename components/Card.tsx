'use client';

import List, { ListBox } from './common/List';
import Text from './common/Text';
import styled from 'styled-components';
import useMapDataStore from '@/store/mapDataStore';

type CardProps = {
    setTrue: () => void;
};

const Card = ({ setTrue }: CardProps) => {
    const { data } = useMapDataStore();

    const handleSetRestaurant = (id: string) => {
        setTrue();
        console.log(id);
    };

    return (
        <List>
            {data.map((item) => (
                <ListBox
                    onClick={() => setTrue()}
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
    );
};

export default Card;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 1.5;
`;
