import styles from '../../styles/common/emptyState.module.css';
import Text from './Text';

type Props = {
    label: string;
};

const EmptyState = ({ label }: Props) => {
    return (
        <div className={styles.emptyState}>
            <Text typography="st3">{label}</Text>
        </div>
    );
};

export default EmptyState;
