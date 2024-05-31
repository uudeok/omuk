'use client';

import Search from '../Search';
import Card from '../Card';
import styles from '../../styles/sideBar.module.css';
import Controller from '../Controller';

const SideBar = () => {
    return (
        <div className={styles.continaer}>
            <div className={styles.layout}>
                <div className={styles.search}>
                    <div>YamYam</div>
                    <Search />
                    <Controller />
                </div>

                <Card />
            </div>
        </div>
    );
};

export default SideBar;
