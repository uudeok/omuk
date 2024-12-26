'use client';

import styles from '../styles/components/restaurantDetail.module.css';
import { useBoolean } from '@/hooks';
import List, { ListRow } from './common/List';
import Text from './common/Text';
import { makeAdress } from '@/shared/utils';
import Icons from './common/Icons';
import Badge from './common/Badge';
import Bookmark from './common/Bookmark';
import MyReview from './MyReview';
import ReviewList from './ReviewList';

type Props = {
    resData: any;
    res_id: string;
};

const RestaurantDetail = ({ resData, res_id }: Props) => {
    const { basicInfo, menuInfo } = resData;
    const { value: isShowMenu, toggle: setMenu } = useBoolean();

    // bookmark props
    const placeName = basicInfo?.placenamefull;
    const category = basicInfo?.category.catename;
    const address = makeAdress(basicInfo?.address);

    const url = basicInfo?.mainphotourl;
    const secureUrl = url.replace('http://', 'https://');

    return (
        <div className={styles.container}>
            <img
                loading="lazy"
                src={secureUrl}
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

            <MyReview resData={resData} res_id={res_id} />
            <ReviewList res_id={res_id} />
        </div>
    );
};

export default RestaurantDetail;

// 'use client';

// import styles from '../styles/components/restaurantDetail.module.css';
// import { useBoolean } from '@/hooks';
// import List, { ListRow } from './common/List';
// import Text from './common/Text';
// import { makeAdress } from '@/shared/utils';
// import Icons from './common/Icons';
// import Badge from './common/Badge';
// import Bookmark from './common/Bookmark';
// import MyReview from './MyReview';
// import ReviewList from './ReviewList';

// type Props = {
//     resData: any;
//     res_id: string;
// };

// const RestaurantDetail = ({ resData, res_id }: Props) => {
//     const { basicInfo, menuInfo } = resData;
//     const { value: isShowMenu, toggle: setMenu } = useBoolean();

//     // bookmark props
//     const placeName = basicInfo?.placenamefull;
//     const category = basicInfo?.category.catename;
//     const address = makeAdress(basicInfo?.address);

//     return (
//         <div className={styles.container}>
//             <img
//                 loading="lazy"
//                 src={basicInfo?.mainphotourl}
//                 alt={basicInfo?.placenamefull}
//                 width="100%"
//                 className={styles.mainImg}
//             />

//             <div className={styles.bookmark}>
//                 <List>
//                     <ListRow
//                         left={
//                             <div>
//                                 <Icons.Star width={15} />
//                                 <Text typography="st3">즐겨찾기</Text>
//                             </div>
//                         }
//                         right={<Bookmark res_id={res_id} placeName={placeName} category={category} address={address} />}
//                     />
//                 </List>
//             </div>

//             <div className={styles.openHour}>
//                 <List>
//                     <ListRow
//                         left={
//                             <div>
//                                 <Icons.Clock width={15} />
//                                 <Text typography="st3">영업시간</Text>
//                             </div>
//                         }
//                         right=""
//                     />

//                     {basicInfo?.openHour?.periodList &&
//                         basicInfo?.openHour.periodList[0].timeList.map((per: any, idx: number) => (
//                             <ListRow
//                                 key={idx}
//                                 left={<div className={styles.left}>{per.timeName}</div>}
//                                 middle={<div className={styles.middle}>{per.dayOfWeek}</div>}
//                                 right={<div className={styles.right}>{per.timeSE}</div>}
//                             />
//                         ))}

//                     <ListRow
//                         left=""
//                         right={
//                             <div className={styles.notice}>
//                                 <Text color="orangered" typography="st4">
//                                     {basicInfo?.openHour?.openhourDisplayText}
//                                 </Text>
//                             </div>
//                         }
//                     />
//                 </List>
//             </div>

//             <div className={styles.position}>
//                 <List>
//                     <ListRow
//                         left={
//                             <div>
//                                 <Icons.Position width={15} />
//                                 <Text typography="st3">위치</Text>
//                             </div>
//                         }
//                         right={<div>{makeAdress(basicInfo?.address)}</div>}
//                     />
//                 </List>
//             </div>

//             <div className={styles.tag}>
//                 <List>
//                     <ListRow
//                         left={
//                             <div>
//                                 <Icons.Hastag width={15} />
//                                 <Text typography="st3">태그</Text>
//                             </div>
//                         }
//                         right=""
//                     />
//                     <div className={styles.taglist}>
//                         {basicInfo?.tags?.map((tag: string) => (
//                             <Badge key={tag}>{tag}</Badge>
//                         ))}
//                     </div>
//                 </List>
//             </div>

//             <div className={styles.menu}>
//                 <List>
//                     <ListRow
//                         left={
//                             <div>
//                                 <Icons.Menu width={15} />
//                                 <Text typography="st3">메뉴보기</Text>
//                             </div>
//                         }
//                         right={
//                             <div onClick={() => setMenu()} className={styles.menuBtn}>
//                                 <Icons.ArrowRight width={9} />
//                                 <Text typography="st4">메뉴 상세보기</Text>
//                             </div>
//                         }
//                     />

//                     {isShowMenu &&
//                         menuInfo?.menuList?.map((item: any) => (
//                             <div key={item.menu} className={styles.menuList}>
//                                 {item.img && <img src={item.img} alt={item.menu} width="100%" />}
//                                 {item.recommend && <Badge>추천</Badge>}
//                                 <ListRow
//                                     left={<Text typography="st3">{item.menu}</Text>}
//                                     right={<Text typography="st3">{item.price}</Text>}
//                                 />

//                                 <Text typography="st4" color="var(--grey700)">
//                                     {item.desc}
//                                 </Text>
//                             </div>
//                         ))}
//                 </List>
//             </div>

//             <MyReview resData={resData} res_id={res_id} />
//             <ReviewList res_id={res_id} />
//         </div>
//     );
// };

// export default RestaurantDetail;
