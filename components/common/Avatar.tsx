import styles from '../../styles/avatar.module.css';
import { ProfileType } from '@/services/userService';
import Text from './Text';

const Avatar = ({ profile }: { profile: ProfileType }) => {
    return (
        <div className={styles.avatar}>
            <img src={profile?.avatar_url} width="45px" alt="img" />
            <Text typography="t3">{profile?.username}</Text>
        </div>
    );
};

export default Avatar;
