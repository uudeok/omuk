'use client';

import List, { ListBox } from './common/List';
import Text from './common/Text';
import useMapDataStore from '@/store/mapDataStore';
import styles from '../styles/Card.module.css';

type CardProps = {
    setTrue: () => void;
};

const Card = ({ setTrue }: CardProps) => {
    const { datas: restaurants, setDetail } = useMapDataStore();

    const handleSetRestaurant = (id: string) => {
        setTrue();
        const restaurant = restaurants.find((res) => res.id === id);
        setDetail(restaurant!);
    };

    console.log(restaurants);

    return (
        <List>
            {restaurants.map((res) => (
                <ListBox
                    onClick={() => {
                        handleSetRestaurant(res.id);
                    }}
                    key={res.id}
                    top={
                        <div className={styles.title}>
                            <Text typography="t4">{res.place_name}</Text>
                            <Text typography="st3">{res.road_address_name}</Text>
                        </div>
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
