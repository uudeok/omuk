'use client';

import styles from '../../styles/common/avatar.module.css';
import { ProfileType } from '@/services/userService';
import Text from './Text';
import { useQuery } from '@tanstack/react-query';
import { getUsersDetailData } from '@/services/userDetailService';

type Props = {
    profile: ProfileType;
    showDetail?: boolean;
};

const Avatar = ({ profile, showDetail = false }: Props) => {
    const avatar_url = profile.avatar_url ? profile.avatar_url : '/user.svg';

    const { data: userData } = useQuery({
        queryKey: ['userData', profile.id],
        queryFn: () => getUsersDetailData(profile.id),
        enabled: showDetail,
    });

    const makeRateAverage = () => {
        if (userData) {
            const rating_avg =
                userData.review_count > 0 ? (userData.rating_total / userData.review_count).toFixed(1) : '0.0';

            return rating_avg;
        }
    };

    return (
        <div className={styles.avatar}>
            <img src={avatar_url} width="45px" height="45px" alt="img" />
            <div>
                <Text typography="t3">{profile?.username}</Text>
                {showDetail && (
                    <div className={styles.detailInfo}>
                        <Text typography="st5">평균 별점 {makeRateAverage()}</Text>
                        <Text typography="st5">평가 {userData?.review_count}</Text>
                        <Text typography="st5">팔로워 {userData?.follower_count}</Text>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Avatar;
