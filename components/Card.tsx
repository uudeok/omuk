import List, { ListBox } from './common/List';
import Text from './common/Text';
import styled from 'styled-components';
import useMapDataStore from '@/store/mapDataStore';

type CardProps = {
    setTrue: () => void;
};

const Card = ({ setTrue }: CardProps) => {
    const { datas: restaurants, setDetail } = useMapDataStore();

    const handleSetRestaurant = (id: string) => {
        setTrue();

        const restaurant = restaurants.find((res) => res.id === id);
        if (restaurant) {
            setDetail(restaurant);
        }
    };

    return (
        <List>
            {restaurants.map((res) => (
                <ListBox
                    onClick={() => {
                        handleSetRestaurant(res.id);
                    }}
                    key={res.id}
                    top={
                        <Title>
                            <Text typography="t5">{res.place_name}</Text>
                            <Text typography="st3">{res.road_address_name}</Text>
                        </Title>
                    }
                    bottom={
                        <div>
                            <Text typography="st3">{res.phone}</Text>
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
