import styles from '../../styles/common/rate.module.css';
import { SetStateAction, Dispatch } from 'react';
import Icons from './Icons';

type RatingType = {
    ratingIndex: number;
    setRatingIndex: Dispatch<SetStateAction<number>>;
};

const Rating = ({ ratingIndex, setRatingIndex }: RatingType) => {
    const rateArray = [1, 2, 3, 4, 5];

    return (
        <div className={styles.rate}>
            {rateArray.map((rate, index) =>
                rate <= ratingIndex ? (
                    <Icons.FillStar
                        width={25}
                        key={`rating_${index}`}
                        className={styles.fillStar}
                        onClick={() => setRatingIndex(rate)}
                    />
                ) : (
                    <Icons.GreyStar
                        width={25}
                        key={`rating_${index}`}
                        className={styles.star}
                        onClick={() => setRatingIndex(rate)}
                    />
                )
            )}

            <p className={styles.evalue}>
                {ratingIndex === 5
                    ? '아주 좋아요'
                    : ratingIndex === 4
                    ? '맘에 들어요'
                    : ratingIndex === 3
                    ? '보통이에요'
                    : ratingIndex === 2
                    ? '그냥 그래요'
                    : ratingIndex === 1
                    ? '별로예요'
                    : '나의 별점'}
            </p>
        </div>
    );
};

export default Rating;
