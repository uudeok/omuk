'use client';

import Search from '../Search';
import Card from '../Card';
import styles from '../../styles/sideBar.module.css';

const SideBar = () => {
    return (
        <div className={styles.continaer}>
            <div className={styles.layout}>
                <div className={styles.search}>
                    <Search />
                    {/* <ButtonController /> */}
                </div>

                <Card />
            </div>
        </div>
    );
};

export default SideBar;
