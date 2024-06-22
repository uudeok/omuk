'use client';

import styles from '../styles/alarm.module.css';
import FillBell from '../assets/fillBell.svg';
import Bell from '../assets/bell.svg';
import Text from './common/Text';

const Alarm = ({ hasFollower }: any) => {
    return (
        <>
            {hasFollower ? (
                <div className={styles.shake}>
                    <FillBell width={20} />
                </div>
            ) : (
                <Bell width={20} />
            )}
        </>
    );
};

export default Alarm;
