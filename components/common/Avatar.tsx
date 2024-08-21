'use client';

import styles from '../../styles/common/avatar.module.css';
import { ProfileType } from '@/services/userService';
import Text from './Text';

type Props = {
    profile: ProfileType;
    showDetail?: boolean;
};

const Avatar = ({ profile, showDetail = false }: Props) => {
    const avatar_url = profile.avatar_url ? profile.avatar_url : '/user.svg';

    // const { data: reviewCount } = useQuery({
    //     queryKey: ['reviewTotalRows', profile.id],
    //     queryFn: () => getUserReviewCount(profile.id),
    //     enabled: showDetail,
    // });

    // const { data: followerCount } = useQuery({
    //     queryKey: ['followerTotalRows', profile.id],
    //     queryFn: () => getFollowerTotalRows(),
    //     enabled: showDetail,
    // });

    // console.log(followerCount);

    return (
        <div className={styles.avatar}>
            <img src={avatar_url} width="45px" height="45px" alt="img" />
            <div>
                <Text typography="t3">{profile?.username}</Text>
                {showDetail && (
                    <div className={styles.detailInfo}>
                        <Text typography="st5">평균 별점 3.3</Text>
                        <Text typography="st5">평가 </Text>
                        <Text typography="st5">팔로워 </Text>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Avatar;
