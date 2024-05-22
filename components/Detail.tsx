import { getDetail } from '@/app/(detail)/[id]/page';
import Text from './common/Text';
import styles from '../styles/Detail.module.css';
import List, { ListRow } from './common/List';
import Badge from './common/Badge';
import { makeAdress, calculateScore } from '@/utils/detailUtil';
import hashtag from '../assets/hashtag.svg';

const Detail = async ({ id }: { id: string }) => {
    const restaurantData = await getDetail(id);
    console.log('======================start============================');
    const { basicInfo, blogReview, menuInfo } = restaurantData;
    const { address, openHour, facilityInfo, tags, feedback } = basicInfo;

    console.log(feedback);

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

            <List>
                <ListRow
                    left={<div> 🕒영업시간</div>}
                    right={<p>{basicInfo?.openHour?.realtime?.open === 'N' ? '영업마감' : '영업중'}</p>}
                />
                {openHour?.periodList[0]?.timeList.map((per: any, idx: number) => (
                    <ListRow
                        key={idx}
                        left={<div>{per.timeName}</div>}
                        middle={<div>{per.dayOfWeek}</div>}
                        right={<div>{per.timeSE}</div>}
                    />
                ))}
            </List>

            <List>
                <ListRow left={<div>📞전화번호</div>} right={basicInfo.phonenum} />
            </List>

            <List>
                <ListRow left={<div>📍위치</div>} right={<div>{makeAdress(address)}</div>} />
            </List>

            <List>
                <ListRow
                    left={
                        <div>
                            <img src={hashtag} alt="해시태그" />
                            <Text typography="st3">태그</Text>{' '}
                        </div>
                    }
                    right={tags.map((tag: string) => (
                        <Badge key={tag}>{tag}</Badge>
                    ))}
                />
            </List>

            <List>
                <ListRow
                    left={<div>메뉴보기</div>}
                    right={menuInfo.menuList.map((item: any) => (
                        <div key={item.menu}>
                            {item.img && <img src={item.img} alt={item.menu} width="100%" />}
                            {item.recommend && <Badge>추천</Badge>}
                            <Text typography="st3">{item.menu}</Text>
                            <Text typography="st3">{item.price}</Text>
                            <Text typography="st5">{item.desc}</Text>
                        </div>
                    ))}
                />
            </List>
        </div>
    );
};

export default Detail;
