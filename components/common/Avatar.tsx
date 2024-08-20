import styles from '../../styles/common/avatar.module.css';
import { ProfileType } from '@/services/userService';
import Text from './Text';

type Props = {
    profile: ProfileType;
    showDetail?: boolean;
};

const Avatar = ({ profile, showDetail }: Props) => {
    const avatar_url = profile.avatar_url ? profile.avatar_url : '/user.svg';

    return (
        <div className={styles.avatar}>
            <img src={avatar_url} width="45px" height="45px" alt="img" />
            <div>
                <Text typography="t3">{profile?.username}</Text>
                {showDetail && (
                    <div className={styles.detailInfo}>
                        <Text typography="st5">평균 별점 3.3</Text>
                        <Text typography="st5">평가 N</Text>
                        <Text typography="st5">팔로워 N</Text>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Avatar;
