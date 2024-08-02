'use client';

import styles from '../styles/components/reviewCard.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import List, { ListRow } from './common/List';
import Text from './common/Text';
import Avatar from './common/Avatar';
import Icons from './common/Icons';
import { useRouter } from 'next/navigation';
import { addReviewLike, removeReviewLike } from '@/services/reviewLikeService';
import { CommunityReviewType } from '@/services/reviewService';
import Image from 'next/image';
import Slider from 'react-slick';
import { AuthContext } from '@/shared/context/AuthProvider';

type Props = {
    list: CommunityReviewType;
};

const ReviewCard = ({ list }: Props) => {
    const router = useRouter();
    const session = useContext(AuthContext);

    const [likedByUser, setLikedByUser] = useState<boolean>(list.likedByUser!);
    const [likeCount, setLikeCount] = useState<number>(list.review_likes?.length || 0);

    const flattenedImages = list.review_images?.map((imageObj) => imageObj.images_url).flat();
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
        if (!session) return alert('로그인이 필요한 서비스 입니다.');

        setLikedByUser((prev) => !prev);
        setLikeCount((prev) => (likedByUser ? prev - 1 : prev + 1));

        try {
            if (likedByUser) {
                await removeReviewLike(review_id);
            } else {
                await addReviewLike(review_id);
            }
        } catch (error) {
            setLikedByUser((prev) => !prev);
            setLikeCount((prev) => (likedByUser ? prev + 1 : prev - 1));
            alert('일시적 오류로 잠시 후 다시 시도해주세요.');
            console.error('좋아요 처리 실패:', error);
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
            <div>
                {hasImage ? (
                    <Slider {...settings}>
                        {flattenedImages.map((img, idx) => (
                            <div key={img} className={styles.slide}>
                                <Image src={img} alt={`img_${idx}`} width={350} height={280} />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className={styles.nonImageWrapper}>
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
                                    {likedByUser ? <Icons.FillHeart width={22} /> : <Icons.Heart width={22} />}
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

// 'use client';

// import styles from '../styles/components/reviewCard.module.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import dayjs from 'dayjs';
// import { useState } from 'react';
// import List, { ListRow } from './common/List';
// import Text from './common/Text';
// import Avatar from './common/Avatar';
// import Icons from './common/Icons';
// import { useRouter } from 'next/navigation';
// import { addReviewLike, removeReviewLike } from '@/services/reviewLikeService';
// import { CommunityReviewType } from '@/services/reviewService';
// import Image from 'next/image';
// import Slider from 'react-slick';

// type Props = {
//     list: CommunityReviewType;
// };

// const ReviewCard = ({ list }: Props) => {
//     const [likedByUser, setLikedByUser] = useState<boolean>(list.likedByUser!);
//     const [likeCount, setLikeCount] = useState<number>(list.review_likes?.length || 0);

//     const router = useRouter();
//     const flattenedImages = list.review_images?.map((imageObj) => imageObj.images_url).flat();
//     const hasImage = list.review_images && list.review_images.length > 0;

//     const visitedDate = dayjs(list.visitDate).format('YYYY-MM-DD');

//     const settings = {
//         dots: true,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//     };

//     const handleReviewLike = async (review_id: number) => {
//         if (likedByUser) {
//             await removeReviewLike(review_id);
//             setLikedByUser(false);
//             setLikeCount((prevCount) => prevCount - 1);
//         } else {
//             await addReviewLike(review_id);
//             setLikedByUser(true);
//             setLikeCount((prevCount) => prevCount + 1);
//         }
//     };

//     return (
//         <div className={styles.layout}>
//             <div className={styles.header}>
//                 <Avatar profile={list.profiles!} />
//                 <Text typography="st3" color="grey">
//                     {visitedDate}
//                 </Text>
//             </div>
//             <div>
//                 {hasImage ? (
//                     <Slider {...settings}>
//                         {flattenedImages.map((img, idx) => (
//                             <div key={img} className={styles.slide}>
//                                 <Image src={img} alt={`img_${idx}`} width={350} height={280} />
//                             </div>
//                         ))}
//                     </Slider>
//                 ) : (
//                     <div className={styles.nonImageWrapper}>
//                         <Text typography="st5">등록된 이미지가 없습니다.</Text>
//                     </div>
//                 )}
//             </div>
//             <div className={styles.content}>
//                 <List>
//                     <ListRow
//                         left={
//                             <div className={styles.like}>
//                                 <div onClick={() => handleReviewLike(list.id)}>
//                                     {likedByUser ? <Icons.FillHeart width={22} /> : <Icons.Heart width={22} />}
//                                 </div>
//                                 <Text typography="st3">좋아요 {likeCount}개</Text>
//                             </div>
//                         }
//                         right={''}
//                     />
//                     <ListRow
//                         onClick={() => router.push(`/${list.res_id}`)}
//                         left={<Text typography="t5">{list.placeName}</Text>}
//                         right={''}
//                     />
//                     <ListRow
//                         left={
//                             <div>
//                                 <Text typography="st3">{list.profiles?.username} / </Text>
//                                 <Text typography="st3">{list.content}</Text>
//                             </div>
//                         }
//                         right={''}
//                     />
//                 </List>
//             </div>
//         </div>
//     );
// };

// export default ReviewCard;
