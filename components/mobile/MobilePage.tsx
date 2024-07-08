import styles from '../../styles/mobile/mobile.module.css';
import { ReactNode } from 'react';
import Header from '../layout/Header';
import Search from '../Search';
import Controller from '../Controller';

const MobilePage = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.layout}>
            <div className={styles.search}>
                <Header />
                <Search />
                <Controller />
            </div>
            {children}
        </div>
    );
};

export default MobilePage;
