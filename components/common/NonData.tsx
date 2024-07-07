import styles from '../../styles/nonData.module.css';
import Text from './Text';

type Props = {
    label: string;
};

const NonData = ({ label }: Props) => {
    return (
        <div className={styles.nonReview}>
            <Text typography="st3">{label}🥲</Text>
        </div>
    );
};

export default NonData;
