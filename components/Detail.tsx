import styles from '../styles/Detail.module.css';
import { getDetail } from '@/app/(detail)/[id]/page';
import Text from './common/Text';
import List, { ListRow } from './common/List';
import Badge from './common/Badge';
import { makeAdress, calculateScore } from '@/shared/utils/detailUtil';
import Hastag from '../assets/hashtag.svg';
import Clock from '../assets/clock.svg';
import Phone from '../assets/phone.svg';
import Position from '../assets/position.svg';
import Menu from '../assets/menu.svg';
import ArrowRight from '../assets/right-arrow.svg';

const Detail = async ({ id }: { id: string }) => {
    const restaurantData = await getDetail(id);
    const { basicInfo, blogReview, menuInfo } = restaurantData;
    const { address, openHour, facilityInfo, tags, feedback } = basicInfo;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Text typography="t5">{basicInfo.placenamefull}</Text>
                <List>
                    <ListRow
                        left={<Text typography="st4">리뷰수</Text>}
                        right={<Text typography="st4">{feedback.comntcnt}</Text>}
                    />
                    <ListRow
                        left={<Text typography="st4">별점</Text>}
                        right={<Text typography="st4">{calculateScore(feedback)}/5.0</Text>}
                    />
                </List>
            </div>

            <img src={basicInfo.mainphotourl} alt={basicInfo.placenamefull} width="100%" />

            <div className={styles.openHour}>
                <List>
                    <ListRow
                        left={
                            <div>
                                <Clock width={15} />
                                <Text typography="st3">영업시간</Text>
                            </div>
                        }
                        right={<p>{openHour?.realtime?.open === 'N' ? '영업마감' : '영업중'}</p>}
                    />
                    {openHour?.periodList &&
                        openHour.periodList[0].timeList.map((per: any, idx: number) => (
                            <ListRow
                                key={idx}
                                left={<div>{per.timeName}</div>}
                                middle={<div>{per.dayOfWeek}</div>}
                                right={<div>{per.timeSE}</div>}
                            />
                        ))}
                    <ListRow
                        left=""
                        right={
                            <div className={styles.display}>
                                <Text color="orangered" typography="st4">
                                    {openHour?.openhourDisplayText}
                                </Text>
                            </div>
                        }
                    />
                </List>
            </div>
            {/* 
            <div className={styles.phone}>
                <List>
                    <ListRow
                        left={
                            <div>
                                <Phone width={15} />
                                <Text typography="st3">전화번호</Text>
                            </div>
                        }
                        right={basicInfo.phonenum}
                    />
                </List>
            </div> */}

            <div className={styles.position}>
                <List>
                    <ListRow
                        left={
                            <div>
                                <Position width={15} />
                                <Text typography="st3">위치</Text>
                            </div>
                        }
                        right={<div>{makeAdress(address)}</div>}
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
                        {tags?.map((tag: string) => (
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
                            <div>
                                <ArrowRight width={9} />
                                <Text typography="st4">메뉴 상세보기</Text>
                            </div>
                        }
                    />

                    {menuInfo?.menuList?.map((item: any) => (
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
        </div>
    );
};

export default Detail;
