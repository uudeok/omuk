import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Review from '@/components/Review';

const ReviewPage = async ({ params: { id } }: { params: Params }) => {
    return <Review />;
};

export default ReviewPage;
