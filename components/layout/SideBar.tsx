import styles from '../../styles/layouts/sideBar.module.css';
import React from 'react';
import Search from '../Search';
import RestaurantList from '../RestaurantList';
import Controller from '../Controller';
import Header from './Header';

const SideBar = () => {
    console.log('sidebar 렌더링!!!!');
    return (
        <div className={styles.layout}>
            <div className={styles.search}>
                <Header />
                <Search />
                <Controller />
            </div>
            <RestaurantList />
        </div>
    );
};

export default SideBar;
