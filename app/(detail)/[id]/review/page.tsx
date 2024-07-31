import { ParamType } from '@/shared/types';
import { getDetail } from '../page';
import dynamic from 'next/dynamic';

const ReviewForm = dynamic(() => import('@/components/ReviewForm'), { ssr: false });

const ReviewPage = async ({ params: { id } }: ParamType) => {
    const resData = await getDetail(id);
    const resName = resData.basicInfo.placenamefull;

    return <ReviewForm res_id={id} resName={resName} />;
};

export default ReviewPage;
