'use client';

import styles from '../styles/components/detailReview.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CommunityReviewType } from '@/services/reviewService';
import Text from './common/Text';
import Image from 'next/image';
import Rating from './common/Rating';
import Slider from 'react-slick';
import { useState } from 'react';
import dayjs from 'dayjs';
import Avatar from './common/Avatar';
import Badge from './common/Badge';
import { positiveLabel } from '@/constants';

type Props = {
    reviewDetail: CommunityReviewType;
};

const DetailReview = ({ reviewDetail }: Props) => {
    const [rate, setRate] = useState<number>(0);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    return (
        <div className={styles.reviewCard}>
            <Avatar profile={reviewDetail.profiles} showDetail={true} />
            <Rating setRatingIndex={setRate} ratingIndex={reviewDetail.rate} />
            <div className={styles.cardContent}>
                <Text typography="st3">{reviewDetail.content}</Text>
            </div>

            <div className={styles.previewImg}>
                <Slider {...settings}>
                    {reviewDetail.images_url?.map((url, idx) => (
                        <div key={url} className={styles.sliderItem}>
                            <Image
                                src={url}
                                alt={`review image_${idx}`}
                                className={styles.reviewImage}
                                width={140}
                                height={150}
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            <div className={styles.positiveBadge}>
                {reviewDetail.positive.map((pos) => (
                    <Badge key={pos}>{positiveLabel[pos]}</Badge>
                ))}
            </div>

            <div className={styles.visitDate}>
                <Text typography="st5">{dayjs(reviewDetail.visitDate).format('YYYY-MM-DD')}</Text>
            </div>
        </div>
    );
};

export default DetailReview;
