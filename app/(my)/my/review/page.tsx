'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getReviewList } from '@/services/reviewService';
import Button from '@/components/common/Button';
import List, { ListBox, ListRow } from '@/components/common/List';
import Text from '@/components/common/Text';

const MyReviewList = () => {
    const router = useRouter();

    const { data: reviewList } = useQuery({
        queryKey: ['reviewList'],
        queryFn: () => getReviewList(),
    });

    console.log(reviewList);

    return (
        <div>
            <Button size="sm" role="none" onClick={() => router.back()}>
                뒤로가기
            </Button>
            <div>review list</div>
        </div>
    );
};

export default MyReviewList;
