import { ReviewType } from '@/services/reviewService';
import styles from '../styles/card.module.css';

type Props = {
    list: ReviewType;
};

const Card = ({ list }: Props) => {
    return (
        <div className={styles.layout}>
            <div></div>
        </div>
    );
};

export default Card;
