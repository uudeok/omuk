'use client';

import styles from '../styles/card.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ReviewType } from '@/services/reviewService';
import NonImage from '../assets/image.svg';
import _ from 'lodash';
import List, { ListRow } from './common/List';
import Text from './common/Text';
import Slider from 'react-slick';
import Avatar from './common/Avatar';
import Heart from '../assets/heart.svg';
import FillHeart from '../assets/fillHeart.svg';

type Props = {
    list: ReviewType;
};

const Card = ({ list }: Props) => {
    const flattenedImages = _.flatten(list.review_images?.map((imageObj) => imageObj.images_url));
    const hasImage = list.review_images && list.review_images.length > 0;

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <Avatar profile={list.profiles!} />
            </div>

            <div>
                {hasImage ? (
                    <Slider {...settings}>
                        {flattenedImages.map((img) => (
                            <div key={img} className={styles.image}>
                                <img src={img} alt={`img_${img}`} width="100%" height="100%" />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className={styles.nonImageWrapper}>
                        <NonImage width="100%" height="280px" />
                    </div>
                )}
            </div>

            <div className={styles.content}>
                <List>
                    <ListRow
                        left={
                            <div className={styles.like}>
                                <Heart width={22} />
                                <Text typography="st3">좋아요 5개</Text>
                            </div>
                        }
                        right={''}
                    />
                    <ListRow left={<Text typography="t5">{list.placeName}</Text>} right={''} />
                    <ListRow
                        left={
                            <div>
                                <Text typography="st3">{list.profiles?.username} / </Text>
                                <Text typography="st3">{list.comment}</Text>
                            </div>
                        }
                        right={''}
                    />
                </List>
            </div>
        </div>
    );
};

export default Card;
