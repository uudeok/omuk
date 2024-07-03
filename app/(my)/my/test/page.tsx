'use client';

import { getFollowingList } from '@/services/followService';
import { fetchFollowerReviewsWithImages } from '@/services/reviewService';
import { useQuery } from '@tanstack/react-query';

const TestPage = () => {
    const { data } = useQuery({
        queryKey: ['test'],
        queryFn: () => fetchFollowerReviewsWithImages(0, 14),
    });

    console.log(data);

    return (
        <div>
            <div></div>
        </div>
    );
};

export default TestPage;
