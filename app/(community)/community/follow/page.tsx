import { Suspense } from 'react';
import Community from '@/components/Community';
import { generateSkeletonCards } from '@/shared/utils';

const FollowCommunityPage = async () => {
    return (
        <Suspense fallback={generateSkeletonCards(5)}>
            <Community />
        </Suspense>
    );
};

export default FollowCommunityPage;
