'use client';

import styles from '../styles/components/restaurantDetail.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useBoolean } from '@/hooks';
import List, { ListRow } from './common/List';
import Text from './common/Text';
import Button from './common/Button';
import { makeAdress, maskUsername } from '@/shared/utils';
import { getPreviewReviewData, getReviewData } from '@/services/reviewService';
import Icons from './common/Icons';
import Badge from './common/Badge';
import Bookmark from './common/Bookmark';
import LoadingBar from './common/LoadingBar';
import { useContext, useState } from 'react';
import { AuthContext } from '@/shared/context/AuthProvider';
import EmptyState from './common/EmptyState';
import Rating from './common/Rating';
import dayjs from 'dayjs';
import Image from 'next/image';
import Slider from 'react-slick';

type Props = {
    resData: any;
    res_id: string;
};

const RestaurantDetail = ({ resData, res_id }: Props) => {
    const [rate, setRate] = useState<number>(0);
    const session = useContext(AuthContext);
    const router = useRouter();
    const { basicInfo, menuInfo } = resData;
    const { value: isShowMenu, toggle: setMenu } = useBoolean();

    // bookmark props
    const placeName = basicInfo?.placenamefull;
    const category = basicInfo?.category.catename;
    const address = makeAdress(basicInfo?.address);

    const { data: reviewData, isLoading } = useQuery({
        queryKey: ['review', res_id],
        queryFn: () => getReviewData(res_id),
        enabled: !!session,
    });

    const { data: reviewPreview } = useQuery({
        queryKey: ['previewReview', res_id],
        queryFn: () => getPreviewReviewData(res_id),
    });

    const redirectPage = async () => {
        // 로그인 여부 확인 후 페이지 이동
        if (session) {
            router.push(`/${res_id}/review`);
        } else {
            router.push('/login');
        }
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    return (
        <div className={styles.container}>
            <img
                loading="lazy"
                src={basicInfo?.mainphotourl}
                alt={basicInfo?.placenamefull}
                width="100%"
                className={styles.mainImg}
            />

            <div className={styles.bookmark}>
                <List>
                    <ListRow
                        left={
                            <div>
                                <Icons.Star width={15} />
                                <Text typography="st3">즐겨찾기</Text>
                            </div>
                        }
                        right={<Bookmark res_id={res_id} placeName={placeName} category={category} address={address} />}
                    />
                </List>
            </div>

            <div className={styles.openHour}>
                <List>
                    <ListRow
                        left={
                            <div>
                                <Icons.Clock width={15} />
                                <Text typography="st3">영업시간</Text>
                            </div>
                        }
                        right=""
                    />

                    {basicInfo?.openHour?.periodList &&
                        basicInfo?.openHour.periodList[0].timeList.map((per: any, idx: number) => (
                            <ListRow
                                key={idx}
                                left={<div className={styles.left}>{per.timeName}</div>}
                                middle={<div className={styles.middle}>{per.dayOfWeek}</div>}
                                right={<div className={styles.right}>{per.timeSE}</div>}
                            />
                        ))}

                    <ListRow
                        left=""
                        right={
                            <div className={styles.notice}>
                                <Text color="orangered" typography="st4">
                                    {basicInfo?.openHour?.openhourDisplayText}
                                </Text>
                            </div>
                        }
                    />
                </List>
            </div>

            <div className={styles.position}>
                <List>
                    <ListRow
                        left={
                            <div>
                                <Icons.Position width={15} />
                                <Text typography="st3">위치</Text>
                            </div>
                        }
                        right={<div>{makeAdress(basicInfo?.address)}</div>}
                    />
                </List>
            </div>

            <div className={styles.tag}>
                <List>
                    <ListRow
                        left={
                            <div>
                                <Icons.Hastag width={15} />
                                <Text typography="st3">태그</Text>
                            </div>
                        }
                        right=""
                    />
                    <div className={styles.taglist}>
                        {basicInfo?.tags?.map((tag: string) => (
                            <Badge key={tag}>{tag}</Badge>
                        ))}
                    </div>
                </List>
            </div>

            <div className={styles.menu}>
                <List>
                    <ListRow
                        left={
                            <div>
                                <Icons.Menu width={15} />
                                <Text typography="st3">메뉴보기</Text>
                            </div>
                        }
                        right={
                            <div onClick={() => setMenu()} className={styles.menuBtn}>
                                <Icons.ArrowRight width={9} />
                                <Text typography="st4">메뉴 상세보기</Text>
                            </div>
                        }
                    />

                    {isShowMenu &&
                        menuInfo?.menuList?.map((item: any) => (
                            <div key={item.menu} className={styles.menuList}>
                                {item.img && <img src={item.img} alt={item.menu} width="100%" />}
                                {item.recommend && <Badge>추천</Badge>}
                                <ListRow
                                    left={<Text typography="st3">{item.menu}</Text>}
                                    right={<Text typography="st3">{item.price}</Text>}
                                />

                                <Text typography="st4" color="var(--grey700)">
                                    {item.desc}
                                </Text>
                            </div>
                        ))}
                </List>
            </div>

            <div className={styles.review}>
                <List>
                    <ListRow
                        left={
                            <div>
                                <Icons.Comment width={15} />
                                <Text typography="st3">나의 후기</Text>
                            </div>
                        }
                        right=""
                    />
                    {reviewData ? (
                        <div className={styles.myreview}>
                            <Text typography="st3">{reviewData.content}</Text>
                            <Button size="sm" role="none" onClick={() => router.push(`/${res_id}/review`)}>
                                자세히 보기
                            </Button>
                        </div>
                    ) : isLoading ? (
                        <LoadingBar status="리뷰 찾는 중" />
                    ) : (
                        <div className={styles.emptyReview}>
                            <EmptyState label="등록된 후기가 없습니다." />
                            <Button size="sm" role="round" onClick={redirectPage}>
                                후기 작성하기
                            </Button>
                        </div>
                    )}
                </List>
            </div>
            <div className={styles.otherReview}>
                <List>
                    <ListRow
                        left={
                            <div>
                                <Icons.Search width={15} />
                                <Text typography="st3">후기 보기</Text>
                            </div>
                        }
                        right={''}
                    />

                    {reviewPreview && reviewPreview.length > 0 ? (
                        reviewPreview?.map((preview) => (
                            <div key={preview.id} className={styles.reviewCard}>
                                <div className={styles.cardContent}>
                                    <div className={styles.cardHeader}>
                                        <Text typography="st3">{preview.content}</Text>
                                        <Text typography="st5">{dayjs(preview.visitDate).format('YYYY-MM-DD')}</Text>
                                    </div>

                                    <Text typography="st4">
                                        {maskUsername(preview.profiles.username)} 님의 리뷰입니다.
                                    </Text>
                                    <Rating ratingIndex={preview.rate} setRatingIndex={setRate} />
                                </div>
                                <div className={styles.previewImg}>
                                    <Slider {...settings}>
                                        {preview.images_url?.map((url, idx) => (
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
                            </div>
                        ))
                    ) : (
                        <EmptyState label="리뷰가 없습니다." />
                    )}
                </List>
            </div>
        </div>
    );
};

export default RestaurantDetail;
