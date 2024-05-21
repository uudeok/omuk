'use client';

import Search from '../Search';
import ButtonController from '../ButtonController';
import Card from '../Card';
import styles from '../../styles/SideBar.module.css';

const SideBar = () => {
    return (
        <div className={styles.continaer}>
            <div className={styles.layout}>
                <div className={styles.search}>
                    <Search />
                    <ButtonController />
                </div>

                <Card />
            </div>
        </div>
    );
};

export default SideBar;
