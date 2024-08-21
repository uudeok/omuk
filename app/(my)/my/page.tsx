'use client';

import styles from '../../../styles/pages/mypage.module.css';
import { useRouter } from 'next/navigation';
import List, { ListRow } from '@/components/common/List';
import Text from '@/components/common/Text';
import Icons from '@/components/common/Icons';
import { useQuery } from '@tanstack/react-query';
import LoadingBar from '@/components/common/LoadingBar';
import dynamic from 'next/dynamic';
import Follow from '@/components/Follow';
import { getUserDetailData } from '@/services/userDetailService';

/** follow, myreview & mybookmark, calendar, setting 4단락으로 구분 */

const MyCalendar = dynamic(() => import('@/components/MyCalendar'), {
    loading: () => <LoadingBar />,
});
const PrivacySetting = dynamic(() => import('@/components/PrivacySetting'));

const MyPage = () => {
    const router = useRouter();

    const { data: userData, isFetching } = useQuery({
        queryKey: ['userData'],
        queryFn: getUserDetailData,
    });

    if (isFetching) return <LoadingBar />;

    return (
        <div>
            <Follow />

            <div className={styles.mypage}>
                <List>
                    <ListRow
                        onClick={() => router.push('/my/bookmark')}
                        left={
                            <div>
                                <Icons.FillStar width={20} />
                                <Text typography="st3">즐겨찾기</Text>
                            </div>
                        }
                        right={userData?.bookmark_count! > 0 ? `${userData?.bookmark_count}개` : '아직 없어용'}
                    />
                    <ListRow
                        onClick={() => router.push('/my/review')}
                        left={
                            <div>
                                <Icons.Pencil width={20} />
                                <Text typography="st3">나의 리뷰</Text>
                            </div>
                        }
                        right={userData?.review_count! > 0 ? `${userData?.review_count}개` : '아직 없어용'}
                    />
                </List>
            </div>

            <MyCalendar />

            <PrivacySetting />
        </div>
    );
};

export default MyPage;
