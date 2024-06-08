import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import ReviewForm from '@/components/ReviewForm';
import { getDetail } from '../page';

const ReviewPage = async ({ params: { id } }: { params: Params }) => {
    const resData = await getDetail(id);
    const resName = resData.basicInfo.placenamefull;

    return <ReviewForm res_id={id} resName={resName} />;
};

export default ReviewPage;
