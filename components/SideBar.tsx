'use client';

import Search from './Search';
import ButtonController from './ButtonController';
import { useBoolean } from '@/hooks/useBoolean';
import Card from './Card';
import Slide from './Slide';
import Detail from './Detail';
import useMapDataStore from '@/store/mapDataStore';
import styles from '../styles/SideBar.module.css';

const SideBar = () => {
    const { value, setTrue, setFalse } = useBoolean();
    const { detail } = useMapDataStore();

    return (
        <div className={styles.continaer}>
            <div className={styles.layout}>
                <div className={styles.search}>
                    <Search />
                    <ButtonController />
                </div>

                <Card setTrue={setTrue} />
            </div>

            {value && (
                <Slide setFalse={setFalse} styles={{ minWidth: '350px', left: '352px' }}>
                    <Detail />
                </Slide>
            )}
        </div>
    );
};

export default SideBar;
