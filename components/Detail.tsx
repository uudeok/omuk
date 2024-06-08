'use client';

import styles from '../styles/detail.module.css';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useBoolean } from '@/hooks';
import List, { ListRow } from './common/List';
import Text from './common/Text';
import Button from './common/Button';
import { useContext } from 'react';
import { AuthContext } from '@/shared/context/AuthProvider';
import { makeAdress } from '@/shared/utils/detailUtil';
import { getReviewData } from '@/services/reviewService';
import Hastag from '../assets/hashtag.svg';
import Clock from '../assets/clock.svg';
import Position from '../assets/position.svg';
import Menu from '../assets/menu.svg';
import ArrowRight from '../assets/right-arrow.svg';
import Badge from './common/Badge';
import Comment from '../assets/comment.svg';
import Bookmark from './common/Bookmark';
import Star from '../assets/star.svg';

type Props = {
    resData: any;
    res_id: string;
};

const Detail = ({ resData, res_id }: Props) => {
    const session = useContext(AuthContext);
    const router = useRouter();
    const { basicInfo, menuInfo } = resData;
    const { value: isShowMenu, toggle: setMenu } = useBoolean();

    const { data: reviewData } = useQuery({
        queryKey: ['review', res_id],
        queryFn: () => getReviewData(res_id),
        enabled: !!session,
    });

    const redirectPage = async () => {
        // 로그인 여부 확인 후 페이지 이동
        if (session) {
            router.push(`/${res_id}/review`);
        } else {
            router.push('/login');
        }
    };

    return (
        <div className={styles.container}>
            <img src={basicInfo?.mainphotourl} alt={basicInfo?.placenamefull} width="100%" className={styles.mainImg} />

            <div className={styles.bookmark}>
                <List>
                    <ListRow
                        left={
                            <div>
                                <Star width={15} />
                                <Text typography="st3">즐겨찾기</Text>
                            </div>
                        }
                        right={<Bookmark res_id={res_id} />}
                    />
                </List>
            </div>

            <div className={styles.openHour}>
                <List>
                    <ListRow
                        left={
                            <div>
                                <Clock width={15} />
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
                                <Position width={15} />
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
                                <Hastag width={15} />
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
                                <Menu width={15} />
                                <Text typography="st3">메뉴보기</Text>
                            </div>
                        }
                        right={
                            <div onClick={() => setMenu()} className={styles.menuBtn}>
                                <ArrowRight width={9} />
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
                                <Comment width={15} />
                                <Text typography="st3">나의 후기</Text>
                            </div>
                        }
                        right=""
                    />
                    {reviewData ? (
                        <div className={styles.myreview}>
                            <Text typography="st3">{reviewData.comment}</Text>
                            <Button size="sm" role="none" onClick={() => router.push(`/${res_id}/review`)}>
                                자세히 보기
                            </Button>
                        </div>
                    ) : (
                        <div className={styles.emptyReview}>
                            <Text typography="st3">등록된 후기가 없습니다.</Text>
                            <Button size="sm" role="round" onClick={redirectPage}>
                                후기 작성하기
                            </Button>
                        </div>
                    )}
                </List>
            </div>
        </div>
    );
};

export default Detail;
