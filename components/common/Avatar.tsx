import styles from '../../styles/common/avatar.module.css';
import { ProfileType } from '@/services/userService';
import Text from './Text';

const Avatar = ({ profile }: { profile: ProfileType }) => {
    const avatar_url = profile.avatar_url ? profile.avatar_url : '/user.svg';

    return (
        <div className={styles.avatar}>
            <img src={avatar_url} width="45px" height="45px" alt="img" />
            <Text typography="t3">{profile?.username}</Text>
        </div>
    );
};

export default Avatar;
