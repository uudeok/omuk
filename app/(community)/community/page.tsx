import { Suspense } from 'react';
import { generateSkeletonCards, getMetadata } from '@/shared/utils';
import Community from '@/components/Community';

export const generateMetadata = async () => {
    return getMetadata();
};

const CommunityPage = async () => {
    return (
        <Suspense fallback={generateSkeletonCards(5)}>
            <Community />
        </Suspense>
    );
};

export default CommunityPage;
