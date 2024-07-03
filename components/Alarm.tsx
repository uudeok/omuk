'use client';

import styles from '../styles/alarm.module.css';
import FillBell from '../assets/fillBell.svg';
import Bell from '../assets/bell.svg';
import { useQuery } from '@tanstack/react-query';
import { getFollowerInfo } from '@/services/followService';
import { useRouter } from 'next/navigation';

const Alarm = () => {
    const router = useRouter();

    const { data: hasFollower } = useQuery({
        queryKey: ['followerInfo', 'pending'],
        queryFn: () => getFollowerInfo('pending'),
    });

    return (
        <div className={styles.alarm} onClick={() => router.push('/my/follower')}>
            {hasFollower > 0 ? (
                <div className={styles.shake}>
                    <div className={styles.tooltip}>팔로워 요청</div>
                    <FillBell width={20} />
                </div>
            ) : (
                <Bell width={20} />
            )}
        </div>
    );
};

export default Alarm;
