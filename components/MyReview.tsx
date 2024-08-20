'use client';

import styles from '../styles/components/myReview.module.css';
import List, { ListRow } from './common/List';
import Icons from './common/Icons';
import Text from './common/Text';
import LoadingBar from './common/LoadingBar';
import Button from './common/Button';
import EmptyState from './common/EmptyState';
import { useQuery } from '@tanstack/react-query';
import { getReviewData } from '@/services/reviewService';
import { useContext } from 'react';
import { AuthContext } from '@/shared/context/AuthProvider';
import { useRouter } from 'next/navigation';
import useResStore from '@/shared/lib/store/useResStore';

type Props = {
    resData: any;
    res_id: string;
};

const MyReview = ({ resData, res_id }: Props) => {
    const session = useContext(AuthContext);
    const router = useRouter();
    const { setResData } = useResStore();

    const { data: reviewData, isLoading } = useQuery({
        queryKey: ['review', res_id],
        queryFn: () => getReviewData(res_id),
        enabled: !!session,
    });

    const redirectPage = async () => {
        // 로그인 여부 확인 후 페이지 이동
        if (session) {
            router.push(`/${res_id}/review`);
            setResData(resData); // ReviewForm 에서 받아서 사용
        } else {
            router.push('/login');
        }
    };

    return (
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
                        <Button size="sm" role="none" onClick={redirectPage}>
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
    );
};

export default MyReview;
