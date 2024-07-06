import styles from '../../styles/sideBar.module.css';
import Search from '../Search';
import RestaurantList from '../RestaurantList';
import Controller from '../Controller';
import Header from './Header';

const SideBar = () => {
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
