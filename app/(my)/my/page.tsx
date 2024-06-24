'use client';

import styles from '../../../styles/mypage.module.css';
import { useRouter } from 'next/navigation';
import List, { ListRow } from '@/components/common/List';
import Text from '@/components/common/Text';
import FillStar from '../../../assets/fillStar.svg';
import Pencil from '../../../assets/pencil.svg';
import { getBookmarkPageInfo } from '@/services/bookmarkService';
import { useQueries } from '@tanstack/react-query';
import { getReviewPageInfo } from '@/services/reviewService';
import LoadingBar from '@/components/common/LoadingBar';
import MyCalendar from '@/components/MyCalendar';
import Follow from '@/components/Follow';

/** follow, myreview & mybookmark, calendar 3단락 */

const MyPage = () => {
    const router = useRouter();

    const fetchData = [
        { queryKey: 'bookmarkPagination', queryFn: getBookmarkPageInfo },
        { queryKey: 'reviewPagination', queryFn: getReviewPageInfo },
    ];

    const combinedQueries = useQueries({
        queries: fetchData.map((data) => ({
            queryKey: [data.queryKey],
            queryFn: () => data.queryFn(),
        })),
        combine: (results) => {
            return {
                data: results.map((result) => result.data),
                pending: results.some((result) => result.isPending),
            };
        },
    });

    if (combinedQueries.pending) return <LoadingBar />;

    const [bookmarkPagination, reviewPagination] = combinedQueries.data;

    return (
        <div>
            <Follow />

            <div className={styles.mypage}>
                <List>
                    <ListRow
                        onClick={() => router.push('/my/bookmark')}
                        left={
                            <div>
                                <FillStar width={20} />
                                <Text typography="st3">즐겨찾기</Text>
                            </div>
                        }
                        right={bookmarkPagination ? `${bookmarkPagination}개` : '아직 없어용'}
                    />
                    <ListRow
                        onClick={() => router.push('/my/review')}
                        left={
                            <div>
                                <Pencil width={20} />
                                <Text typography="st3">나의 리뷰</Text>
                            </div>
                        }
                        right={reviewPagination ? `${reviewPagination}개` : '아직 없어용'}
                    />
                </List>
            </div>

            <MyCalendar />
        </div>
    );
};

export default MyPage;
