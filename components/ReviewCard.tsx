'use client';

import styles from '../styles/components/reviewCard.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useState } from 'react';
import List, { ListRow } from './common/List';
import Text from './common/Text';
import Slider from 'react-slick';
import Avatar from './common/Avatar';
import Heart from '../assets/heart.svg';
import FillHeart from '../assets/fillHeart.svg';
import { useRouter } from 'next/navigation';
import { addReviewLike, removeReviewLike } from '@/services/reviewLikeService';
import { CommunityReviewType } from '@/services/reviewService';

type Props = {
    list: CommunityReviewType;
};

const ReviewCard = ({ list }: Props) => {
    const [likedByUser, setLikedByUser] = useState<boolean>(list.likedByUser!);
    const [likeCount, setLikeCount] = useState<number>(list.review_likes?.length || 0);

    const router = useRouter();
    const flattenedImages = _.flatten(list.review_images?.map((imageObj) => imageObj.images_url));
    const hasImage = list.review_images && list.review_images.length > 0;

    const visitedDate = dayjs(list.visitDate).format('YYYY-MM-DD');

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleReviewLike = async (review_id: number) => {
        if (likedByUser) {
            await removeReviewLike(review_id);
            setLikedByUser(false);
            setLikeCount((prevCount) => prevCount - 1);
        } else {
            await addReviewLike(review_id);
            setLikedByUser(true);
            setLikeCount((prevCount) => prevCount + 1);
        }
    };

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <Avatar profile={list.profiles!} />
                <Text typography="st3" color="grey">
                    {visitedDate}
                </Text>
            </div>
            <div onClick={() => router.push(`/${list.res_id}`)}>
                {hasImage ? (
                    <Slider {...settings}>
                        {flattenedImages.map((img) => (
                            <div key={img} className={styles.slide}>
                                <img src={img} alt={`img_${img}`} width="100%" height="100%" />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className={styles.nonImageWrapper}>
                        <img src="/noimage.png" width="55px" />
                        <Text typography="st5">등록된 이미지가 없습니다.</Text>
                    </div>
                )}
            </div>
            <div className={styles.content}>
                <List>
                    <ListRow
                        left={
                            <div className={styles.like}>
                                <div onClick={() => handleReviewLike(list.id)}>
                                    {likedByUser ? <FillHeart width={22} /> : <Heart width={22} />}
                                </div>
                                <Text typography="st3">좋아요 {likeCount}개</Text>
                            </div>
                        }
                        right={''}
                    />
                    <ListRow
                        onClick={() => router.push(`/${list.res_id}`)}
                        left={<Text typography="t5">{list.placeName}</Text>}
                        right={''}
                    />
                    <ListRow
                        left={
                            <div>
                                <Text typography="st3">{list.profiles?.username} / </Text>
                                <Text typography="st3">{list.content}</Text>
                            </div>
                        }
                        right={''}
                    />
                </List>
            </div>
        </div>
    );
};

export default ReviewCard;
