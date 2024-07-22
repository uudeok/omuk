import { Suspense } from 'react';
import { generateSkeletonCards } from '@/shared/utils';
import Community from '@/components/Community';

const CommunityPage = async () => {
    return (
        <Suspense fallback={generateSkeletonCards(5)}>
            <Community />
        </Suspense>
    );
};

export default CommunityPage;
