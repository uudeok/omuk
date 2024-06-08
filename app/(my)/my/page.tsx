'use client';

import List, { ListRow } from '@/components/common/List';
import styles from '../../../styles/mypage.module.css';
import Text from '@/components/common/Text';
import FillStar from '../../../assets/fillStar.svg';
import Pencil from '../../../assets/pencil.svg';
import { getBookmarkList } from '@/services/bookmarkService';
import { useQueries } from '@tanstack/react-query';
import { getReviewList } from '@/services/reviewService';

const MyPage = () => {
    const fetchData = [
        { queryKey: 'bookmarkList', queryFn: getBookmarkList },
        { queryKey: 'reviewList', queryFn: getReviewList },
    ];

    const combinedQueries = useQueries({
        queries: fetchData.map((data) => ({
            queryKey: ['getData', data.queryKey],
            queryFn: () => data.queryFn(),
        })),
        combine: (results) => {
            return {
                data: results.map((result) => result.data),
                pending: results.some((result) => result.isPending),
            };
        },
    });

    if (combinedQueries.pending) return <span>Loading....</span>;

    const [bookmarkList, reviewList] = combinedQueries.data;

    return (
        <div>
            <div className={styles.follow}>
                <List>
                    <ListRow left={<Text typography="st3">팔로워</Text>} right="5명" />
                    <ListRow left={<Text typography="st3">팔로잉</Text>} right="5명" />
                </List>
            </div>

            <div className={styles.mypage}>
                <List>
                    <ListRow
                        left={
                            <div>
                                <FillStar width={20} />
                                <Text typography="st3">찜한 곳</Text>
                            </div>
                        }
                        right={bookmarkList ? `${bookmarkList.length}개` : '아직 없어용'}
                    />
                    <ListRow
                        left={
                            <div>
                                <Pencil width={20} />
                                <Text typography="st3">나의 리뷰</Text>
                            </div>
                        }
                        right={reviewList ? `${reviewList.length}개` : '아직 없어용'}
                    />
                </List>
            </div>

            <div></div>
        </div>
    );
};

export default MyPage;

{
    /* <ListRow
left={
    <div>
        <FillHeart width={20} />
        <Text typography="st3">방문한 음식점</Text>
    </div>
}
right="5명"
/> */
}
