import { SetStateAction, Dispatch } from 'react';
import styles from '../../styles/rate.module.css';
import FillStar from '../../assets/fillStar.svg';
import GreyStar from '../../assets/greyStar.svg';

type RatingType = {
    ratingIndex: number;
    setRatingIndex: Dispatch<SetStateAction<number>>;
};

const Rating = ({ ratingIndex, setRatingIndex }: RatingType) => {
    const ArrayIndexes = [1, 2, 3, 4, 5];
    return (
        <div className={styles.rate}>
            {ArrayIndexes.map((arrayindex, index) =>
                arrayindex <= ratingIndex ? (
                    <FillStar
                        width={25}
                        key={`rating_${index}`}
                        className={styles.fillStar}
                        onClick={() => setRatingIndex(arrayindex)}
                    />
                ) : (
                    <GreyStar
                        width={25}
                        key={`rating_${index}`}
                        className={styles.star}
                        onClick={() => setRatingIndex(arrayindex)}
                    />
                )
            )}
            <p>
                {/* {ratingIndex === 5
                    ? '아주 좋아요'
                    : ratingIndex === 4
                    ? '맘에 들어요'
                    : ratingIndex === 3
                    ? '보통이에요'
                    : ratingIndex === 2
                    ? '그냥 그래요'
                    : '별로에요'} */}
            </p>
        </div>
    );
};

export default Rating;
