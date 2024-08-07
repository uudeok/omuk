'use client';

import styles from '../styles/components/alarm.module.css';
import Icons from './common/Icons';
import { useQuery } from '@tanstack/react-query';
import { getFollowerTotalRows } from '@/services/followService';
import { useRouter } from 'next/navigation';

const Alarm = () => {
    const router = useRouter();

    // 팔로워 요청 데이터 조회
    const { data: hasFollower } = useQuery({
        queryKey: ['followerTotalRows', 'pending'],
        queryFn: () => getFollowerTotalRows('pending'),
        staleTime: 1000 * 600,
    });

    return (
        <div className={styles.alarm} onClick={() => router.push('/my/follower')}>
            {hasFollower > 0 ? (
                <div className={styles.shake}>
                    <div className={styles.tooltip}>팔로워 요청</div>
                    <Icons.FillBell width={20} />
                </div>
            ) : (
                <Icons.Bell width={20} />
            )}
        </div>
    );
};

export default Alarm;
