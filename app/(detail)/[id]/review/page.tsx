import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import ReviewForm from '@/components/ReviewForm';

const getDetail = async (id: string) => {
    const response = await fetch(`https://place.map.kakao.com/m/main/v/${id}/`);

    if (!response.ok) {
        throw new Error('데이터 가져오기 실패');
    }
    return response.json();
};

const ReviewPage = async ({ params: { id } }: { params: Params }) => {
    const resData = await getDetail(id);
    const resName = resData.basicInfo.placenamefull;

    return <ReviewForm res_id={id} resName={resName} />;
};

export default ReviewPage;
