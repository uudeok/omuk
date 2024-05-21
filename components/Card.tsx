'use client';

import List, { ListBox } from './common/List';
import Text from './common/Text';
import useMapDataStore from '@/store/mapDataStore';
import styles from '../styles/Card.module.css';
import { useRouter } from 'next/navigation';

const Card = () => {
    const { datas: restaurants } = useMapDataStore();
    const router = useRouter();

    return (
        <List>
            {restaurants.map((res) => (
                <ListBox
                    onClick={() => {
                        router.push(`/${res.id}`);
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
