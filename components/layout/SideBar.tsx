import Search from '../Search';
import Card from '../Card';
import styles from '../../styles/sideBar.module.css';
import Controller from '../Controller';
import Header from './Header';
import { createClient } from '@/shared/lib/supabase/server-client';

const SideBar = async () => {
    // const {
    //     data: { session },
    //     error,
    // } = await createClient().auth.getSession();

    return (
        <div className={styles.layout}>
            <div className={styles.search}>
                <Header />
                {/* <Header session={session} /> */}
                <Search />
                <Controller />
            </div>
            <Card />
        </div>
    );
};

export default SideBar;
