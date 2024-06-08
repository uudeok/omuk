import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import ReviewForm from '@/components/ReviewForm';

const ReviewPage = async ({ params: { id } }: { params: Params }) => {
    return <ReviewForm res_id={id} />;
};

export default ReviewPage;
